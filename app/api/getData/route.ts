// app/api/getData/route.ts

import { sensorData } from '@/db/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const db = drizzle(pool);

export async function POST(request: Request) {
  try {
    // Parse query parameters from request URL
    const { searchParams } = new URL(request.url);

    const ebus_id = searchParams.get('ebus_id');
    const latitude = parseFloat(searchParams.get('latitude') || '');
    const longitude = parseFloat(searchParams.get('longitude') || '');
    const passenger_count = parseInt(searchParams.get('passenger_count') || '', 10);
    const timestamp = searchParams.get('timestamp');

    // Validate required parameters
    if (!ebus_id || isNaN(latitude) || isNaN(longitude) || isNaN(passenger_count) || !timestamp) {
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

    // Insert into database
    await db.insert(sensorData).values({
      ebus_id,
      latitude,
      longitude,
      passenger_count,
      timestamp: ts,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Data saved successfully' }),
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
