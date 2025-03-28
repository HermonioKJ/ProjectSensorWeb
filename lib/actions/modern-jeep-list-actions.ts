'use server'

import db from '@/db/drizzle'
import { BLData, devices, ebus, sensorData } from '@/db/schema'
import { count, desc, eq, ilike, sql, or, inArray } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { ITEMS_PER_PAGE } from '../constant'
import { z } from 'zod'
import { redirect } from 'next/navigation'

//Calculates the number of max pages
export async function fetcEbusPages(query: string) {
  try {
    const data = await db
      .select({
        count: count(),
      })
      .from(ebus)
      .where(
        or(
          ilike(ebus.route, sql`${`%${query}%`}`), 
          ilike(ebus.status, sql`${`%${query}%`}`)
        )
      );

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of e-bus pages.');
  }
}


//Ebus based on search filter and page
export async function fetchFilteredEbus(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try {
    const data = await db
      .select({
        id: ebus.id,
        license: ebus.license,
        route: ebus.route,
        IsActive: ebus.status,
        TotalPass: ebus.total_passengers,
        CurrentPass: ebus.current_passengers,
        Disc: ebus.discrepancy,
        timeRegistered: ebus.dateRegistered
      })
      .from(ebus)
      .where(
        or(
          ilike(ebus.license, sql`${`%${query}%`}`),
          ilike(ebus.route, sql`${`%${query}%`}`),
          ilike(ebus.status, sql`${`%${query}%`}`),
        )
      )
      .orderBy(desc(sql`CAST(SUBSTRING(${ebus.id}, 3) AS INTEGER)`))
      .limit(ITEMS_PER_PAGE)
      .offset(offset)

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch filtered ebus data.')
  }
}

//Form for creating/updating ebus entry
const FormSchema = z.object({
  id: z.string(),  
  license: z.string().min(1, { message: 'License number is required.' }),
  route: z.string().min(1, { message: 'Route is required.' }),
  total_passengers: z.coerce
    .number()
    .gte(0, { message: 'Total passengers must be greater than or equal to 0.' }),
  status: z.enum(['active', 'inactive'], {
    invalid_type_error: 'Please select the bus status.',
  }),
  date: z.string(),
  // coop_id: z.string().min(1, 'Coop ID is required'),
  // driver_id: z.string().min(1, 'Driver ID is required'),
  // conductor_id: z.string().min(1, 'Conductor ID is required'), 
})

//Type validation for inputs
export type State = {
  errors?: {
    license?: string[]
    route?: string[]
    total_passengers?: string[]
    status?: string[]
    // coop_id?: string[]
    // driver_id?: string[]
    // conductor_id?: string[]
  }
  message?: string | null
}


//Omits id and date for validation
const CreateEbus = FormSchema.omit({ id: true, date: true })

export async function createEbus(prevState: State, formData: FormData) {
  // Validated the inserted formData from the Form
  const validatedFields = CreateEbus.safeParse({
    license: formData.get('license'),
    route: formData.get('route'),
    total_passengers: formData.get('total_passengers'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create entry.',
    }
  }

  //Passes clean data into the database
  const {license, route, total_passengers, status} = validatedFields.data

  try {
    //Generate string ID
    const latestEntry = await db
    .select({ id: ebus.id })
    .from(ebus)
    .orderBy(desc(ebus.id))
    .limit(1);

    let latest_id = "EB0001";

    if (latestEntry.length > 0) {
      const latestId = latestEntry[0].id;
      
      // Ensure the ID is in the expected format before processing
      if (latestId.startsWith("EB") && latestId.length > 2) {
        const numericPart = parseInt(latestId.substring(3), 10); // Extracts the number part correctly
        if (!isNaN(numericPart)) { // Check if it's a valid number
          const nextId = numericPart + 1; 
          latest_id = `EB${nextId.toString().padStart(4, "0")}`; 
        }
      }
    }
    
    const disc =  0 - (total_passengers || 0);


    // Insert the new ebus data into the database
    const result = await db.insert(ebus).values({
      id: latest_id,
      license,
      route,
      current_passengers: 0,
      total_passengers,
      discrepancy: disc,
      status 
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Ebus.', error
    }
  }

  revalidatePath('/dashboard/modern-jeeps')
  revalidatePath('/dashboard')
  redirect('/dashboard/modern-jeeps')
}


//For updating ebus function
const UpdateEbus = FormSchema.omit({ id: true, date: true })

export async function updateEbus(
  id: string,
  prevState: State,
  formData: FormData
) {
  // Validate the incoming form data using the UpdateEbus schema
  const validatedFields = UpdateEbus.safeParse({
    license: formData.get('license'),
    route: formData.get('route'),
    total_passengers: formData.get('total_passengers'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Ebus.',
    }
  }

  const { license, route, total_passengers, status } = validatedFields.data

  const totalPassengers = Number(total_passengers)
  const discrepancy = 0 - Number(total_passengers)

  try {
    await db
      .update(ebus)
      .set({
        license,
        route,
        total_passengers: totalPassengers,
        status,
        discrepancy: discrepancy
      })
      .where(eq(ebus.id, id))
  } catch (error) {
    return { message: 'Database Error: Failed to Update Ebus.' }
  }
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/modern-jeeps')
  redirect('/dashboard/modern-jeeps')
}


//device data fetch based on passed on ebus_ID (must be linked)
export async function fetchSensorData(ebus_id:string){
  try {
    let deviceIDs = await db
      .select({ id: devices.id })
      .from(devices)
      .where(eq(devices.ebus_id, ebus_id))
      .limit(1)
    
    if(deviceIDs.length === 0){
      deviceIDs = []
    }

    const IDList = deviceIDs.map(device => device.id);

    console.log("Device IDs:", IDList);
  
    const Data = await db
      .select({
        id: sensorData.id,
        status: sensorData.status,
        latitude: sensorData.latitude,
        longitude: sensorData.longitude,
        passenger_count: sensorData.passenger_count,
        speed: sensorData.speed,
      })
      .from(sensorData)
      .where(inArray(sensorData.device_id, IDList))
      .limit(1);

    return Data;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Database Error:", err.message);
      console.error("Stack Trace:", err.stack);
    } else {
      console.error("Unknown Error:", err);
    }
    throw new Error("Failed to fetch all sensor data.");
  }  
  }
  
  
  export async function generateDeviceID() {
    const latestUser = await db
      .select({ id: devices.id })
      .from(devices)
      .orderBy(desc(devices.id)) 
      .limit(1)
      .execute();
  
    let Device_ID = 'D0001'; 
  
    if (latestUser.length > 0) {
      const lastId = latestUser[0].id;
  
      if (lastId.startsWith("D")) {
        const IDno = parseInt(lastId.substring(1), 10); 
  
        if (!Number.isNaN(IDno)) { 
          const newIDno = IDno + 1;
          Device_ID = `D${newIDno.toString().padStart(4, "0")}`; 
        }
      }
    }
    return Device_ID;
  }
  

  export async function generateSensorID() {
    
    const latestUser = await db
      .select({ id: sensorData.id })
      .from(sensorData)
      .orderBy(desc(sensorData.id)) 
      .limit(1)
      .execute();
  
    let Sensor_ID = 'S0001'; 
  
    if (latestUser.length > 0) {
      const lastId = latestUser[0].id;
  
      if (lastId.startsWith("S")) {
        const IDno = parseInt(lastId.substring(1), 10);
  
        if (!Number.isNaN(IDno)) {
          const newIDno = IDno + 1;
          Sensor_ID = `S${newIDno.toString().padStart(4, "0")}`;
        }
      }
    }
    return Sensor_ID;
  }
  
  export async function generateBLID() {
    const latestUser = await db
      .select({ id: BLData.id })
      .from(BLData)
      .orderBy(desc(BLData.id)) 
      .limit(1)
      .execute();
  
    let BL_ID = 'BL0001'; 
  
    if (latestUser.length > 0) {
      const lastId = latestUser[0].id;
  
      if (lastId.startsWith("BL")) {
        const IDno = parseInt(lastId.substring(2), 10); 
  
        if (!Number.isNaN(IDno)) { 
          const newIDno = IDno + 1;
          BL_ID = `BL${newIDno.toString().padStart(4, "0")}`; 
        }
      }
    }
    return BL_ID;
  }
  