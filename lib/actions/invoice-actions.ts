'use server'

import db from '@/db/drizzle'
import { revenue, ebus, drivers, coops, conductors, sensorData } from '@/db/schema'
import { count, desc, eq, ilike, sql, or, sum } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { ITEMS_PER_PAGE } from '../constant'
import { z } from 'zod'
import { redirect } from 'next/navigation'

export async function fetchCardStat(){
  try{
    const EbusCountPromise = db.select({ count: count() }).from(ebus)
    const TotalDiscrepencyPromise = db.select({ sumDiscrepancy: sum(ebus.discrepancy) }).from(ebus);
    const TotalPassengersPromise = db.select({ sumTotalPassengers: sum(ebus.total_passengers)}).from(ebus);
    const CurrentPassengerPromise = db.select({ sumCurrentPassengers: sum(ebus.current_passengers)}).from(ebus);
    const data = await Promise.all([
      EbusCountPromise,
      TotalDiscrepencyPromise,
      TotalPassengersPromise,
      CurrentPassengerPromise
    ])
    const EbusCount = Number(data[0][0].count ?? '0'); 
    const TotalDiscrepency = Number(data[1][0].sumDiscrepancy ?? '0'); 
    const TotalPassengers = Number(data[2][0].sumTotalPassengers ?? '0'); 
    const CurrentPassengers = Number(data[3][0].sumCurrentPassengers ?? '0');

    return{
      EbusCount, TotalDiscrepency, TotalPassengers, CurrentPassengers
    }
  }
  catch (error) {
    console.error('Error fetching card stats:', error);
    throw new Error('Failed to fetch card statistics');
  }
}

//for charts
export async function fetchRevenue() {
  try {
    const data = await db.select().from(revenue)
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the revenues.')
  }
}

//updated data
export async function fetchLatestEbus() {
  try {
      const data = await db
      .select({
        license: ebus.license,
        route: ebus.route,
        total_passengers: ebus.total_passengers,
        current_passengers: ebus.current_passengers,
        id: ebus.id,
        discrepancy: ebus.discrepancy
      })
      .from(ebus)
      .orderBy(desc(ebus.id)) 
    .limit(5)
      const latestEbus = data.map((bus) => ({
        ...bus, //for formatting here
        total_passengers: bus.total_passengers,
        current_passengers: bus.current_passengers,
      }))
  
    return latestEbus
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

//delete
export async function deleteEbus(id: string) {
  try {
    await db.delete(ebus).where(eq(ebus.id, id))
    revalidatePath('/dashboard/modern-jeeps')
    return { message: 'Deleted Modern Jeep Entry' }
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' }
  }
}

//returns the data in that page
export async function fetchFilteredEbus(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const data = await db
      .select({
        id: ebus.id,
        license: ebus.license,
        route: ebus.route,
        IsActive: ebus.status,
        coop_name: coops.name,  
        driver_name: drivers.name, 
        conductor_name: conductors.name, 
        TotalPass: ebus.total_passengers,
        CurrentPass: ebus.current_passengers,
        Disc: ebus.discrepancy
      })
      .from(ebus)
      .leftJoin(sensorData, eq(sensorData.ebus_id, ebus.id))
      .leftJoin(coops, eq(coops.id, ebus.coop_id)) // Left join with coop to get the name
      .leftJoin(drivers, eq(drivers.id, ebus.driver_id)) // Left join with driver to get the name
      .leftJoin(conductors, eq(conductors.id, ebus.conductor_id)) // Left join with conductor to get the name
      .where(
        or(
          ilike(ebus.license, sql`${`%${query}%`}`),
          ilike(ebus.route, sql`${`%${query}%`}`),
          ilike(ebus.status, sql`${`%${query}%`}`),
          ilike(coops.name, sql`${`%${query}%`}`), // Search by coop name
          ilike(drivers.name, sql`${`%${query}%`}`), // Search by driver name
          ilike(conductors.name, sql`${`%${query}%`}`) // Search by conductor name
        )
      )
      .limit(ITEMS_PER_PAGE)
      .offset(offset)

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch filtered ebus data.')
  }
}


//counts the number of max pages

export async function fetcEbusPages(query: string) {
  try {
    const data = await db
      .select({
        count: count(),
      })
      .from(ebus)
      .where(
        or(
          ilike(ebus.route, sql`${`%${query}%`}`), // Apply filtering to route column
          ilike(ebus.status, sql`${`%${query}%`}`) // Apply filtering to status column
        )
      );

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of e-bus pages.');
  }
}

const FormSchema = z.object({
  id: z.string(),  
  license: z.string().min(1, { message: 'License number is required.' }),
  route: z.string().min(1, { message: 'Route is required.' }),
  total_passengers: z.coerce
    .number()
    .gte(0, { message: 'Total passengers must be greater than or equal to 0.' }),
  current_passengers: z.coerce
    .number()
    .gte(0, { message: 'Current passengers must be greater than or equal to 0.' }),
  discrepancy: z.coerce
    .number()
    .gte(0, { message: 'Discrepancy must be greater than or equal to 0.' }),
  status: z.enum(['active', 'inactive'], {
    invalid_type_error: 'Please select the bus status.',
  }),
  date: z.string(),
  coop_id: z.string().min(1, 'Coop ID is required'),
  driver_id: z.string().min(1, 'Driver ID is required'),
  conductor_id: z.string().min(1, 'Conductor ID is required'), 
})

const CreateEbus = FormSchema.omit({ id: true, date: true })
const UpdateEbus = FormSchema.omit({ id: true, date: true })
export type State = {
  errors?: {
    license?: string[]
    route?: string[]
    total_passengers?: string[]
    current_passengers?: string[]
    discrepancy?: string[]
    status?: string[]
    coop_id?: string[]
    driver_id?: string[]
    conductor_id?: string[]
  }
  message?: string | null
}
export async function createEbus(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateEbus.safeParse({
    license: formData.get('license'),
    route: formData.get('route'),
    total_passengers: formData.get('total_passengers'),
    current_passengers: formData.get('current_passengers'),
    discrepancy: formData.get('discrepancy'),
    status: formData.get('status'),
    coop_id: formData.get('coop_id'),  // Assuming coop_id is part of the form
    driver_id: formData.get('driver_id'),  // Assuming driver_id is part of the form
    conductor_id: formData.get('conductor_id'),  // Assuming conductor_id is part of the form
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Ebus.',
    }
  }

  const {
    license,
    route,
    total_passengers,
    current_passengers,
    discrepancy,
    status,
    coop_id,
    driver_id,
    conductor_id,
  } = validatedFields.data

  try {
    // Insert the new ebus data into the database
    const result = await db.insert(ebus).values({
      license,
      route,
      total_passengers,
      current_passengers,
      discrepancy,
      status,
      coop_id,  
      driver_id,  
      conductor_id,  
    })

    // // // If needed, insert the sensor data as well
    // // // (Example: You can handle this part if there's a sensor entry associated with the ebus)
    // // const sensorData = {
    // //   ebus_id: result[0].id,  // The id of the created ebus
    // //   latitude: 123456,  // Example value, replace with real sensor data
    // //   longitude: 654321,  // Example value, replace with real sensor data
    // //   passenger_count: current_passengers,  // Example value, replace with real sensor data
    // //   timestamp: new Date().toISOString(),  // Current timestamp
    // // }

    // await db.insert(SensorData).values(sensorData)

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Ebus.',
    }
  }

  // Revalidate the cache for the modern jeeps page and redirect the user
  revalidatePath('/dashboard/modern-jeeps')
  redirect('/dashboard/modern-jeeps')
}

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
    current_passengers: formData.get('current_passengers'),
    discrepancy: formData.get('discrepancy'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Ebus.',
    }
  }

  const { license, route, total_passengers, current_passengers, discrepancy, status } = validatedFields.data

  const totalPassengers = Number(total_passengers)
  const currentPassengers = Number(current_passengers)
  const discrepancyCount = Number(discrepancy)

  try {
    await db
      .update(ebus)
      .set({
        license,
        route,
        total_passengers: totalPassengers,
        current_passengers: currentPassengers,
        discrepancy: discrepancyCount,
        status,
      })
      .where(eq(ebus.id, id))
  } catch (error) {
    return { message: 'Database Error: Failed to Update Ebus.' }
  }

  revalidatePath('/dashboard/modern-jeeps')
  redirect('/dashboard/modern-jeeps')
}


// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await db
//       .select({
//         id: invoices.id,
//         customer_id: invoices.customer_id,
//         amount: invoices.amount,
//         status: invoices.status,
//         date: invoices.date,
//       })
//       .from(invoices)
//       .where(eq(invoices.id, id))
//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       status: invoice.status === 'paid' ? 'paid' : 'pending',
//       amount: invoice.amount / 100,
//     }))
//     return invoice[0] as InvoiceForm
//   } catch (error) {
//     console.error('Database Error:', error)
//     throw new Error('Failed to fetch invoice.')
//   }
// }