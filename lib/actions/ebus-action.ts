import db from '@/db/drizzle'
import { ebus } from '@/db/schema'
import { sql } from 'drizzle-orm'

export async function fetchebus() {
  try {
    const data = await db
      .select({
        id: ebus.id,
        license: ebus.license,
        route: ebus.route,  // Add the route field
        total_passengers: ebus.total_passengers,  // Add the total_passengers field
        current_passengers: ebus.current_passengers,  // Add current_passengers field
        discrepancy: ebus.discrepancy,  // Add discrepancy field
        status: ebus.status,  // Add the status field
        dateRegistered: ebus.dateRegistered,  // Optionally include the dateRegistered field
      })
      .from(ebus)
      .orderBy(ebus.dateRegistered)  // Sort by the latest dateRegistered
      .limit(10)  // Optional: limit the results if needed
    return data
  } catch (err) {
    if (err instanceof Error) {
        console.error('Database Error:', err.message);
        console.error('Stack Trace:', err.stack);
      } else {
        console.error('Unknown Error:', err);
      }
      throw new Error('Failed to fetch all ebus records.');
    }
}
