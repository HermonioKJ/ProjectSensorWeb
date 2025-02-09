import { sensorData, ebus } from '@/db/schema';  // Import the 'ebus' table schema
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
    const { id, ebus_id, latitude, longitude, passenger_count } = await request.json();

    // Validate required parameters
    if (!ebus_id || isNaN(latitude) || isNaN(longitude) || isNaN(passenger_count)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing or invalid parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ts = new Date();
    const uuidId = id || uuidv4(); // Use provided UUID or generate a new one

    // Check if the ebus_id exists in the 'ebus' table
    const existingEbus = await db
      .select()
      .from(ebus)
      .where(eq(ebus.id, ebus_id))
      .limit(1)
      .execute();

    if (existingEbus.length === 0) {
      // Insert new ebus record if not found
      await db.insert(ebus).values({
        id: ebus_id,
        route: 'None',
        status: 'inactive',
        license: 'None',
        current_passengers: passenger_count,
        discrepancy: 0,
        conductor_id: '123e4567-e89b-12d3-a456-426614174000',
        coop_id: '123e4567-e89b-12d3-a456-426614174000',
        driver_id: '123e4567-e89b-12d3-a456-426614174000',
        total_passengers: 0,
      });
    }

    // Check if the sensor_id exists in the 'sensorData' table
    const existingSensor = await db
      .select()
      .from(sensorData)
      .where(eq(sensorData.id, uuidId))
      .limit(1)
      .execute();

    if (existingSensor.length === 0) {
      // Insert new sensor data
      const result = await db.insert(sensorData).values({
        id: uuidId,
        ebus_id,
        latitude,
        longitude,
        passenger_count,
        timestamp: ts,
      }).returning();

      return new Response(
        JSON.stringify({ success: true, sensor_id: result[0].id, message: 'New sensor data saved successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update existing sensor data
    await db.update(sensorData).set({
      latitude,
      longitude,
      passenger_count,
      timestamp: ts,
    }).where(eq(sensorData.id, uuidId));

    // Update ebus current passengers
    await db.update(ebus).set({
      current_passengers: passenger_count,
    }).where(eq(ebus.id, ebus_id));

    return new Response(
      JSON.stringify({ success: true, message: 'Sensor data updated successfully' }),
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