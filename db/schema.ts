import {
  pgTable,
  uuid,
  varchar,
  unique,
  integer,
  text,
  date,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const customers = pgTable('customers', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  image_url: varchar('image_url', { length: 255 }).notNull(),
})

export const revenue = pgTable(
  'revenue',
  {
    month: varchar('month', { length: 4 }).notNull(),
    revenue: integer('revenue').notNull(),
  },
  (table) => [
    unique('revenue_month_key').on(table.month),
  ]
)

export const users = pgTable('users',  {
    id: uuid('id')
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (table) => [ 
      unique('users_email_key').on(table.email),
    ]
)

export const invoices = pgTable('invoices', {
  id: uuid('id')
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  customer_id: uuid('customer_id').notNull(),
  amount: integer('amount').notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  date: date('date').notNull(),
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
  latitude: integer('latitude'), 
  longitude: integer('longitude'),
})