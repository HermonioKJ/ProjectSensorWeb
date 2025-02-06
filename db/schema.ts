import {
  text,
  unique,
  pgTable,
  uuid,
  varchar,
  integer,
  doublePrecision,
  timestamp
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (table) => {
    return {
      users_email_key: unique('users_email_key').on(table.email),
    }
  }
)

export const drivers = pgTable('drivers', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  license_number: varchar('license_number', { length: 255 }).notNull(),
})

export const conductors = pgTable('conductors', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const coops = pgTable('coops', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 50 }).notNull(),
})

export const ebus = pgTable('ebus', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  route: varchar('route', { length: 255 }).notNull(),
  total_passengers: integer('total_passengers').notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  current_passengers: integer('current_passengers').notNull(),
  discrepancy: integer('discrepancy').notNull(),
  license: varchar('license', { length: 255 }).notNull(),
  coop_id: uuid('coop_id').notNull(),
  driver_id: uuid('driver_id').notNull(),  
  conductor_id: uuid('conductor_id').notNull(),
  dateRegistered: timestamp('dateRegistered').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const sensorData = pgTable('sensorData', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  ebus_id: uuid('ebus_id'),  
  latitude: doublePrecision('latitude'), 
  longitude: doublePrecision('longitude'),
  passenger_count: integer('passenger_count'),
  timestamp: timestamp('timestamp').notNull(),  
})

export const revenue = pgTable('revenue', {
  month: varchar('Month').notNull(),
  revenue: integer('Amount').notNull()
})