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
    id: varchar('id', { length: 50 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (table) => {
    return {
      users_email_key: unique('users_email_key').on(table.email),
    };
  }
);

// export const drivers = pgTable('drivers', {
//   id: varchar('id', { length: 50 }).primaryKey().notNull(),
//   name: varchar('name', { length: 255 }).notNull(),
//   license_number: varchar('license_number', { length: 255 }).notNull(),
// });

// export const conductors = pgTable('conductors', {
//   id: varchar('id', { length: 50 }).primaryKey().notNull(),
//   name: varchar('name', { length: 255 }).notNull(),
// });

export const coops = pgTable('coops', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 50 }).notNull(),
});

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
  id: varchar('id', { length: 10 }).primaryKey().notNull(), //auto generated na lng
  ebus_id: varchar('ebus_id', { length: 10 })
    .references(() => ebus.id, { onDelete: 'cascade' }), 
  registered_at: timestamp('registered_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const sensorData = pgTable('sensorData', {
  id: varchar('id', { length: 10 }).primaryKey().notNull(), //auto generated
  device_id: varchar('device_id', { length: 10 }) 
    .references(() => devices.id, { onDelete: 'cascade' }),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  speed: doublePrecision('speed').notNull(),
  passenger_count: integer('passenger_count').notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});


export const revenue = pgTable('revenue', {
  month: varchar('Month').notNull(),
  revenue: integer('Amount').notNull(),
});
