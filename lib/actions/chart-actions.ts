import db from "@/db/drizzle"
import { revenue } from "@/db/schema"

//for charts
export async function fetchRevenue() {
    try {
      const data = await db.select().from(revenue)
      return data
    } catch (error) {
      console.error('Database Error:', error)
      throw new Error('Failed to fetch the revenues.')
    }
  }