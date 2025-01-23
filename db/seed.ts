import '@/db/env-config'
import { driverData, conductorData, coopData, ebusData, sensorData, revenue, users } from '@/lib/placeholder-data'
import db from './drizzle'
import * as schema from './schema'
import { exit } from 'process'

const main = async () => {
  try {
    await db.transaction(async (tx) => {
      // Delete existing entries in the relevant tables
      await tx.delete(schema.sensorData)
      await tx.delete(schema.ebus)
      await tx.delete(schema.coops)
      await tx.delete(schema.conductors)
      await tx.delete(schema.drivers)
      await tx.delete(schema.revenue)
      await tx.delete(schema.users)

      // Insert new placeholder data into the relevant tables
      await tx.insert(schema.drivers).values(driverData)
      await tx.insert(schema.conductors).values(conductorData)
      await tx.insert(schema.coops).values(coopData)
      await tx.insert(schema.ebus).values(ebusData)
      await tx.insert(schema.sensorData).values(sensorData)
      await tx.insert(schema.revenue).values(revenue)
      await tx.insert(schema.users).values(users)
    })

    console.log('Database seeded successfully')
    exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

main()
