import {
  text,
  unique,
  pgTable,
  varchar,
  integer,
  doublePrecision,
  timestamp
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 10 }).primaryKey().notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (table) => {
    return {
      users_email_key: unique('users_email_key').on(table.email),
    };
  }
);

export const usersInfo = pgTable(
  'User_info', {
    id: varchar('id', {length:10}).primaryKey().notNull(),
    email: varchar('email', {length:50}).notNull().
    references(() => users.email),
    firstName: varchar('firstName', {length:50}).notNull(),
    lastName: varchar('lastName', {length:50}).notNull(),
    phoneNo: varchar('phoneNo', {length:20}).notNull(),
    region: varchar('region', {length:15}).notNull(),
    province: varchar('province', {length:15}).notNull(),
    city: varchar('city', {length:20}).notNull(),
    barangay: varchar('barangay', {length:20}).notNull()
  }
)

export const ebus = pgTable('ebus', {
  id: varchar('id', { length: 10 }).primaryKey().notNull(),
  route: varchar('route', { length: 255 }).notNull(),
  total_passengers: integer('total_passengers').notNull(),
  status: varchar('status', { length: 10 }).notNull(),
  current_passengers: integer('current_passengers').notNull(),
  discrepancy: integer('discrepancy').notNull(),
  license: varchar('license', { length: 20 }).notNull(),
  dateRegistered: timestamp('dateRegistered').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const devices = pgTable('devices', {
  id: varchar('id', { length: 10 }).primaryKey().notNull(),
  ebus_id: varchar('ebus_id', { length: 10 })
    .references(() => ebus.id, { onDelete: 'cascade' }), 
  registered_at: timestamp('registered_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const sensorData = pgTable('sensorData', {
  id: varchar('id', { length: 10 }).primaryKey().notNull(),
  device_id: varchar('device_id', { length: 10 }) 
    .references(() => devices.id, { onDelete: 'cascade' }),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  speed: doublePrecision('speed').notNull(),
  passenger_count: integer('passenger_count').notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const BLData = pgTable('BLData',{
  id: varchar('id', {length:10}).primaryKey().notNull(),
  BL_entrance: integer('BL_entrance').notNull(),
  BL_exit: integer('BL_exit').notNull(),
  BL_status: varchar('BL_status', {length:10}).notNull(),
  device_id: varchar('device_id', {length:10}).notNull()
  .references(() => devices.id, {onDelete: "cascade"}),
  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const revenue = pgTable('revenue', {
  month: varchar('Month').notNull(),
  revenue: integer('Amount').notNull(),
});
