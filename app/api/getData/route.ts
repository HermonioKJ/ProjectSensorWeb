import { sensorData, devices, ebus, BLData } from '@/db/schema';  
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, sql } from 'drizzle-orm';
import { generateBLID, generateDeviceID, generateSensorID} from '@/lib/actions/modern-jeep-list-actions';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);


export async function POST(request: Request) {
  try {
    const body = await request.json(); 

    //checks for JSON body
    if (!body.Devices || !Array.isArray(body.Devices)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing Devices array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    } 

    await db.transaction(async (tx) => {
      for (const device of body.Devices) {
        const { ebus_id, main, bluetoothData } = device;

        if (!main || !bluetoothData) {
          console.warn(`Missing ebus_id or data. EBUS ID: ${JSON.stringify(device.ebus_id)}`);
          continue;
        }

        const { longitude, latitude, speed, passenger, status } = main;      
        const {BL_entrance, BL_exit, BL_status} = bluetoothData;

        const formattedData = {
          ebus_id: ebus_id.trim(),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          speed: parseFloat(speed),
          passenger_count: parseInt(passenger, 10),
          status: status || "unknown",
          BL_entrance: parseInt(BL_entrance, 10),
          BL_exit: parseInt(BL_exit, 10), 
          BL_status: BL_status || "unknown",
        };

        // Ensure the ebus exists; sensor can only be created a new record if existing ebus with the ebusID in the query was mentioned
        const existingEbusStmt = db.select().from(ebus).where(eq(ebus.id, sql.placeholder("ebus_id"))).limit(1).prepare("existingEbusStmt");
        const existingDeviceStmt = db.select().from(devices).where(eq(devices.ebus_id, sql.placeholder("ebus_id"))).limit(1).prepare("existingDeviceStmt");

        const existingEbus = await existingEbusStmt.execute({ ebus_id: formattedData.ebus_id })
        if (existingEbus.length === 0) {
          throw new Error(`Ebus ID ${formattedData.ebus_id} doesn't exist`);
        }

        // Ensure the device exists;if not insert new record
        const existingDevice = await existingDeviceStmt.execute({ebus_id: formattedData.ebus_id})

        if (existingDevice.length === 0) {
          const latestSensorID = await generateSensorID()
          const latestDeviceID = await generateDeviceID()
          const latestBLID = await generateBLID()
          const actual_count = passenger - (BL_entrance + BL_exit)
          const ts = new Date();    

          await tx.insert(devices).values({
            id: latestDeviceID,
            ebus_id: formattedData.ebus_id,
            registered_at: ts,
          });
          
          //requires piplining
          await Promise.all([
            tx.insert(sensorData).values({
              id: latestSensorID,
              latitude: formattedData.latitude,
              longitude: formattedData.longitude,
              passenger_count: actual_count,
              speed: formattedData.speed,
              status: formattedData.status,
              device_id: latestDeviceID,
              timestamp: ts,
            }),
            tx.insert(BLData).values({
              id: latestBLID,
              BL_entrance: formattedData.BL_entrance,
              BL_exit: formattedData.BL_exit,
              BL_status: formattedData.BL_status,
              device_id: latestDeviceID,
              timestamp: ts,
            })
          ])
      
          revalidatePath('/dashboard')
          console.log("New device inserted:", formattedData.ebus_id);
        }



        // Update the sensordata
        const ts = new Date();
        const actual_count = passenger - (BL_entrance + BL_exit)
        //need pipelining
        await Promise.all([
          tx.update(sensorData).set({
            latitude: formattedData.latitude,
            longitude: formattedData.longitude,
            speed: formattedData.speed,
            passenger_count: formattedData.passenger_count,
            status: formattedData.status,
            timestamp: ts,
          })
          .where(
            eq(sensorData.device_id, 
               tx.select({ id: devices.id })
                 .from(devices)
                 .where(eq(devices.ebus_id, formattedData.ebus_id))
                 .limit(1) 
            )),
            tx.update(BLData)
          .set({
            BL_entrance: formattedData.BL_entrance,
            BL_exit: formattedData.BL_exit,
            BL_status: formattedData.BL_status,
            timestamp: ts,
          })
          .where(eq(BLData.device_id, 
            (await tx.select({ id: devices.id })
             .from(devices)
             .where(eq(devices.ebus_id, formattedData.ebus_id))
             .limit(1)
            )[0]?.id 
          )),
        tx.update(ebus).set({ current_passengers: actual_count }).where(eq(ebus.id, formattedData.ebus_id))
        ])
        revalidatePath('/dashboard')     
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: "Sensor data processed successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Insert error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error || "Error saving data",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

//refresh data
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}