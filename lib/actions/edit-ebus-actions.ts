import db from '@/db/drizzle'
import { ebus } from '@/db/schema'
import { eq } from 'drizzle-orm'

//For edit function
export async function editfetchebus(id : string) {
  try {
    const data = await db
      .select({
        id: ebus.id,
        license: ebus.license,
        route: ebus.route,  
        total_passengers: ebus.total_passengers,  
        status: ebus.status,  
        dateRegistered: ebus.dateRegistered,  
      })
      .from(ebus)
      .where(eq(ebus.id, id))
      .limit(1)

      
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


//For add function
export async function fetchebus() {
  try {
    const data = await db
      .select({
        id: ebus.id,
        license: ebus.license,
        route: ebus.route,  
        total_passengers: ebus.total_passengers,  
        status: ebus.status,  
        dateRegistered: ebus.dateRegistered,  
      })
      .from(ebus)
      .limit(10)
      
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
