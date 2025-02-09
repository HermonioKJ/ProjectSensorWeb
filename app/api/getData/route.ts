import { sensorData, ebus, devices } from '@/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate if "Devices" array exists
    if (!body.Devices || !Array.isArray(body.Devices) || body.Devices.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid or missing "Devices" array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Loop through each device in the Devices array
    for (const device of body.Devices) {
      const serial_number = device.serial_number || null;
      const main = device.main || {};

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
    );

  } catch (error) {
    console.error('Insert error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error saving data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
