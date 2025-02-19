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

<<<<<<< HEAD
// export const drivers = pgTable('drivers', {
//   id: varchar('id', { length: 50 }).primaryKey().notNull(),
//   name: varchar('name', { length: 255 }).notNull(),
//   license_number: varchar('license_number', { length: 255 }).notNull(),
// });

// export const conductors = pgTable('conductors', {
//   id: varchar('id', { length: 50 }).primaryKey().notNull(),
//   name: varchar('name', { length: 255 }).notNull(),
// });
=======
export const drivers = pgTable('drivers', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  license_number: varchar('license_number', { length: 255 }).notNull(),
});

export const conductors = pgTable('conductors', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f

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
<<<<<<< HEAD
=======
  coop_id: varchar('coop_id', { length: 10 }).notNull(),
  driver_id: varchar('driver_id', { length: 10 }).notNull(),
  conductor_id: varchar('conductor_id', { length: 10 }).notNull(),
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
  dateRegistered: timestamp('dateRegistered').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const devices = pgTable('devices', {
<<<<<<< HEAD
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
=======
  serial_number: varchar('serial_number').primaryKey(),
  ebus_id: varchar('ebus_id').references(() => ebus.id) // Allow NULL values
});

export const sensorData = pgTable('sensorData', {
  id: varchar('id', { length: 10 }).primaryKey().notNull(),
  serial_number: varchar('serial_number', { length: 10 }).notNull()
    .references(() => devices.serial_number, { onDelete: 'cascade' }), 
  ebus_id: varchar('ebus_id', { length: 10 })
    .references(() => ebus.id, { onDelete: 'cascade' }),
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  speed: doublePrecision('speed').notNull(),
  passenger_count: integer('passenger_count').notNull(),
  status: varchar('status', { length: 100 }).notNull(),
  timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
<<<<<<< HEAD

=======
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f

export const revenue = pgTable('revenue', {
  month: varchar('Month').notNull(),
  revenue: integer('Amount').notNull(),
});
