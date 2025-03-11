import { sensorData, devices, ebus, BLData } from '@/db/schema';  
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { generateBLID, generateDeviceID, generateSensorID} from '@/lib/actions/modern-jeep-list-actions';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {

    // Generate new sensorID
    const latestSensorID = await generateSensorID()

    // Generate new deviceID
    const latestDeviceID = await generateDeviceID()    

    // Generate new deviceID
    const latestBLID = await generateBLID()

    const body = await request.json(); 

    if (!body.Devices || !Array.isArray(body.Devices)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing Devices array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    } 

    //Generate new Data timestamp
    const ts = new Date();

    await db.transaction(async (tx) => {
      for (const device of body.Devices) {
        const { ebus_id, main, bluetoothData } = device;

        //check if empty
        if (!ebus_id || !main || !bluetoothData) {
          console.warn(`Skipping device due to missing ebus_id or data. EBUS ID: ${JSON.stringify(device.ebus_id)}`);
          continue;
        }

        // Check if body of json is empty
        const { longitude, latitude, speed, passenger, status } = main;      

        const {BL_entrance, BL_exit, BL_status} = bluetoothData;

        if (
          latitude === undefined ||
          longitude === undefined ||
          speed === undefined ||
          passenger === undefined
        ) {
          console.warn(`Skipping device ${ebus_id} due to missing required sensor data`);
          continue;
        }

        if (
          BL_entrance === undefined ||
          BL_exit === undefined ||
          BL_status === undefined
        ) {
          console.warn(`Skipping device ${ebus_id} due to missing required bluetooth data`);
          continue;
        }


        // Ensure correct data types
        const formattedData = {
          ebus_id: ebus_id.trim(),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          speed: parseFloat(speed),
          passenger_count: parseInt(passenger, 10),
          status: status || "unknown",
          latestDeviceID: latestDeviceID.trim(),
          latestSensorID: latestSensorID.trim(),
          latestBLID: latestBLID.trim(),
          BL_entrance: parseInt(BL_entrance, 10),
          BL_exit: parseInt(BL_exit, 10), 
          BL_status: BL_status || "unknown",
        };

        const actual_count = passenger - (BL_entrance + BL_exit)

        // Ensure the ebus exists; sensor can only be created a new record if existing ebus with the ebusID in the query was mentioned
        const existingEbus = await tx.select().from(ebus).where(eq(ebus.id, formattedData.ebus_id)).limit(1).execute();
        if (existingEbus.length === 0) {
          throw new Error(`Ebus ID ${formattedData.ebus_id} doesn't exist`);
        }

        // Ensure the device exists;if not insert new record
        const existingDevice = await tx.select().from(devices).where(eq(devices.ebus_id, formattedData.ebus_id)).limit(1).execute();
        if (existingDevice.length === 0) {
          await tx.insert(devices).values({
            id: formattedData.latestDeviceID,
            ebus_id: formattedData.ebus_id,
            registered_at: ts,
          });

          await tx.insert(sensorData).values({
            id: formattedData.latestSensorID,
            latitude: formattedData.latitude,
            longitude: formattedData.longitude,
            passenger_count: actual_count,
            speed: formattedData.speed,
            status: formattedData.status,
            device_id: formattedData.latestDeviceID,
            timestamp: ts,
          });
          
          await tx.insert(BLData).values({
            id: formattedData.latestBLID,
            BL_entrance: formattedData.BL_entrance,
            BL_exit: formattedData.BL_exit,
            BL_status: formattedData.BL_status,
            device_id: formattedData.latestDeviceID,
            timestamp: ts,
          });
          
          console.log("New device inserted:", formattedData.ebus_id);
        }

        // Update the sensordata
        await tx.update(sensorData).set({
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
          ));

          await tx.update(BLData)
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
          ));
        

        // Update ebus passenger count
        await tx.update(ebus).set({ current_passengers: actual_count }).where(eq(ebus.id, formattedData.ebus_id));
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
