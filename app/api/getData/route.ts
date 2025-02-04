import { sensorData, ebus } from '@/db/schema';  // Import the 'ebus' table schema
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
    // Parse query parameters from request URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ebus_id = searchParams.get('ebus_id');
    const latitude = parseFloat(searchParams.get('latitude') || '');
    const longitude = parseFloat(searchParams.get('longitude') || '');
    const passenger_count = parseInt(searchParams.get('passenger_count') || '', 10);
    const timestamp = searchParams.get('timestamp');

    // Validate required parameters
    if (!id || !ebus_id || isNaN(latitude) || isNaN(longitude) || isNaN(passenger_count) || !timestamp) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing or invalid parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ts = new Date(timestamp);
    if (isNaN(ts.getTime())) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid timestamp format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ensure the id is in the correct UUID format
    const uuidId = id ? id : uuidv4();  // Ensure the UUID is passed or a new one is generated.

    // Check if the ebus_id exists in the 'ebus' table
    let existingEbus = await db
      .select()
      .from(ebus)
      .where(eq(ebus.id, ebus_id))
      .limit(1)
      .execute();

    if (existingEbus.length === 0) {
      // If the ebus_id does not exist, insert a new entry into the 'ebus' table
      await db
        .insert(ebus)
        .values({
          id: ebus_id,
          route: 'None',  // Default value
          status: 'inactive',  // Default value
          license: 'None',  // Default value
          current_passengers: 0, 
          discrepancy: 0,

          total_passengers: 0,  // Ensure a value is provided for 'total_passengers'
        })
        .returning();  // Insert new ebus record
    }

    // Check if the sensor_id exists in the 'sensorData' table
    const existingSensor = await db
      .select()
      .from(sensorData)
      .where(eq(sensorData.id, uuidId))  // Ensure we are comparing UUID correctly
      .limit(1)
      .execute();

    if (existingSensor.length === 0) {
      // If no existing sensor found, create a new sensor entry
      const result = await db
        .insert(sensorData)
        .values({
          id: uuidId,  // Use the provided or generated UUID
          ebus_id,
          latitude,
          longitude,
          passenger_count,
          timestamp: ts,
        })
        .returning();  // Get the inserted record, including the generated UUID

      const newSensorId = result[0].id; // Assuming 'id' is the UUID column

      return new Response(
        JSON.stringify({ success: true, sensor_id: newSensorId, message: 'New sensor data saved successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If the sensor exists, update the existing record
    await db
      .update(sensorData)
      .set({
        latitude,
        longitude,
        passenger_count,
        timestamp: ts,
      })
      .where(eq(sensorData.id, uuidId));  // Update where sensor_id matches

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
