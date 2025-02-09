import { hashSync } from 'bcryptjs';

const users = [
  {
    id: 'U001',
    name: 'User One',
    email: 'user1@nextmail.com',
    password: hashSync('123456', 10),
  },
  {
    id: 'U002',
    name: 'User Two',
    email: 'user2@nextmail.com',
    password: hashSync('password', 10),
  },
];

const coopData = [
  {
    id: 'C001',
    name: 'XYZ Coop',
    address: '123 Cooperative St, City, Country',
  },
  {
    id: 'C002',
    name: 'ABC Coop',
    address: '456 Main Ave, Another City, Country',
  },
];

const driverData = [
  {
    id: 'D001',
    name: 'John Doe',
    license_number: 'D1234567',
  },
  {
    id: 'D002',
    name: 'Alice Johnson',
    license_number: 'D7654321',
  },
];

const conductorData = [
  {
    id: 'CN001',
    name: 'Jane Smith',
  },
  {
    id: 'CN002',
    name: 'Bob Williams',
  },
];

const ebusData = [
  {
    id: 'E001',
    license: 'AB123CD',
    route: 'Route A',
    status: 'active',
    coop_id: 'C001',
    driver_id: 'D001',
    conductor_id: 'CN001',
    total_passengers: 50,
    current_passengers: 30,
    discrepancy: 10,
    dateRegistered: new Date(),
  },
  {
    id: 'E002',
    license: 'XY987ZT',
    route: 'Route B',
    status: 'inactive',
    coop_id: 'C002',
    driver_id: 'D002',
    conductor_id: 'CN002',
    total_passengers: 40,
    current_passengers: 25,
    discrepancy: 5,
    dateRegistered: new Date(),
  },
];

const devices = [
  {
    serial_number: 'S001',
    ebus_id: 'E001',
  },
  {
    serial_number: 'S002',
    ebus_id: 'E002',
  },
];

const sensorData = [
  {
    id: 'S001',
    serial_number: 'S001', // Now using serial_number as primary key
    ebus_id: 'E001',
    latitude: 34.0522,
    longitude: -118.2437,
    speed: 55,
    passenger_count: 5,
    status: 'online',
    timestamp: new Date(),
  },
  {
    id: 'S002',
    serial_number: 'S002',
    ebus_id: 'E002',
    latitude: 35.6895,
    longitude: 139.6917,
    speed: 60,
    passenger_count: 10,
    status: 'offline',
    timestamp: new Date(),
  },
];

const revenue = [
  {
    month: 'January',
    revenue: 1000,
  },
  {
    month: 'February',
    revenue: 2000,
  },
  {
    month: 'March',
    revenue: 3000,
  },
  {
    month: 'April',
    revenue: 4500,
  },
  {
    month: 'May',
    revenue: 5000,
  },
];

export { revenue, users, ebusData, sensorData, coopData, conductorData, driverData, devices };
