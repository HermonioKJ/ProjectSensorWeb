import { sensorData, devices, ebus } from '@/db/schema';  
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, desc } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
    const body = await request.json(); 

    if (!body.Devices || !Array.isArray(body.Devices)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing Devices array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ts = new Date();

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
        await tx.update(ebus).set({ current_passengers: formattedData.passenger_count }).where(eq(ebus.id, formattedData.ebus_id));
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
