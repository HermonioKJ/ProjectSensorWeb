<<<<<<< HEAD
import { sensorData, devices, ebus } from '@/db/schema';  
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, desc } from 'drizzle-orm';
=======
import { sensorData, ebus, devices } from '@/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
<<<<<<< HEAD
    const body = await request.json(); 

    if (!body.Devices || !Array.isArray(body.Devices)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing Devices array' }),
=======
    const body = await request.json();

    // Validate if "Devices" array exists
    if (!body.Devices || !Array.isArray(body.Devices) || body.Devices.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing "Devices" array' }),
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Loop through each device in the Devices array
    for (const device of body.Devices) {
      const serial_number = device.serial_number || null;
      const main = device.main || {};

<<<<<<< HEAD
    await db.transaction(async (tx) => {
      for (const device of body.Devices) {
        const { ebus_id, main } = device;

        //check if empty
        if (!ebus_id || !main) {
          console.warn(`Skipping device due to missing ebus_id or main: ${JSON.stringify(device)}`);
          continue;
        }

        // Check if body of json is empty
        const { longitude, latitude, speed, passenger, status } = main;

        // Generate new sensorID
        const latestSensor = await db
        .select({ id: sensorData.id })
        .from(sensorData)
        .orderBy(desc(sensorData.id)) 
        .limit(1)
        .execute();

        let newSensorId = 'S1'; 

        if (latestSensor.length > 0) {
          const lastId = latestSensor[0].id;
          const lastNum = parseInt(lastId.replace('S', ''), 10); 
          newSensorId = `S${lastNum + 1}`; 
        }

        // Generate new deviceID
        const latestDevice = await db
        .select({ id: devices.id })
        .from(devices)
        .orderBy(desc(devices.id)) 
        .limit(1)
        .execute();

        let newDeviceID = 'D1'; 

        if (latestDevice.length > 0) {
          const lastId = latestDevice[0].id;
          const lastNum = parseInt(lastId.replace('D', ''), 10); 
          newDeviceID = `D${lastNum + 1}`; 
        }
        

        if (
          latitude === undefined ||
          longitude === undefined ||
          speed === undefined ||
          passenger === undefined
        ) {
          console.warn(`Skipping device ${ebus_id} due to missing required data`);
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
        };


        // Ensure the ebus exists
        const existingEbus = await tx.select().from(ebus).where(eq(ebus.id, formattedData.ebus_id)).limit(1).execute();
        if (existingEbus.length === 0) {
          throw new Error(`Ebus ID ${formattedData.ebus_id} doesn't exist`);
        }

        // Ensure the device exists
        const existingDevice = await tx.select().from(devices).where(eq(devices.ebus_id, formattedData.ebus_id)).limit(1).execute();
        if (existingDevice.length === 0) {
          await tx.insert(devices).values({
            id: newDeviceID,
            ebus_id: formattedData.ebus_id,
            registered_at: ts,
          });
          await tx.insert(sensorData).values({
            id: newSensorId,
            latitude: formattedData.latitude,
            longitude: formattedData.longitude,
            passenger_count: formattedData.passenger_count,
            speed: formattedData.speed,
            status: formattedData.status,
            device_id:newDeviceID,
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

        // Update ebus passenger count
        await tx.update(ebus).set({ current_passengers: formattedData.passenger_count}).where(eq(ebus.id, formattedData.ebus_id));
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: "Sensor data processed successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
=======
      // Extract nested main properties
      const latitude = parseFloat(main.latitude);
      const longitude = parseFloat(main.longitude);
      const speed = parseFloat(main.speed);
      const passenger_count = parseInt(main.passenger || main.passenger_count, 10);
      const status = main.status || null;

      // Validate required fields
      if (!serial_number) {
        return new Response(JSON.stringify({ success: false, message: 'serial_number is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (isNaN(latitude) || isNaN(longitude) || isNaN(speed) || isNaN(passenger_count)) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid numeric values' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const uuidId = `${serial_number}`;
      const timestamp = new Date();

      // Check if the device exists
      const existingDevice = await db.select().from(devices).where(eq(devices.serial_number, serial_number)).limit(1).execute();
      if (existingDevice.length === 0) {
        await db.insert(devices).values({ serial_number });
      }

      // Insert or update sensorData
      const existingSensor = await db.select().from(sensorData).where(eq(sensorData.id, uuidId)).limit(1).execute();

      if (existingSensor.length === 0) {
        await db.insert(sensorData).values({
          id: uuidId,
          serial_number,
          latitude,
          longitude,
          speed,
          passenger_count,
          status,
          timestamp,
        });
      } else {
        await db.update(sensorData).set({
          latitude,
          longitude,
          speed,
          passenger_count,
          status,
          timestamp,
        }).where(eq(sensorData.id, uuidId));
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Sensor data processed successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    );

  } catch (error) {
    console.error("Transaction failed:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Error saving data",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
