import '@/db/env-config'
import { ebusData, sensorData, revenue, users, devices, usersInfo, BLData } from '@/lib/placeholder-data'
import db from './drizzle'
import * as schema from './schema'
import { exit } from 'process'

const main = async () => {
  try {
    await db.transaction(async (tx) => {

      await tx.delete(schema.devices)
      await tx.delete(schema.sensorData)
      await tx.delete(schema.ebus)
      await tx.delete(schema.revenue)
      await tx.delete(schema.usersInfo)
      await tx.delete(schema.users)
      await tx.delete(schema.BLData)

      await tx.insert(schema.ebus).values(ebusData)
      await tx.insert(schema.devices).values(devices)
      await tx.insert(schema.sensorData).values(sensorData)
      await tx.insert(schema.BLData).values(BLData)

      await tx.insert(schema.revenue).values(revenue)

      await tx.insert(schema.users).values(users)
      await tx.insert(schema.usersInfo).values(usersInfo)
    })

    console.log('Database seeded successfully')
    exit(0)
  } catch (error) {
    console.log('Error', error)
    throw new Error('Failed to seed database')
  }
}

main()
