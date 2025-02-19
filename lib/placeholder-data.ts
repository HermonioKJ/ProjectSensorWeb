import { hashSync } from 'bcryptjs';

const users = [
  {
    id: 'U001',
    name: 'User One',
<<<<<<< HEAD
    email: 'user@nextmail.com',
    password: hashSync('123456', 10),
  },
  {                                                                                                                                                                                                                                                                                                                                        
=======
    email: 'user1@nextmail.com',
    password: hashSync('123456', 10),
  },
  {
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    id: 'U002',
    name: 'User Two',
    email: 'user2@nextmail.com',
    password: hashSync('password', 10),
  },
];

<<<<<<< HEAD
// const coopData = [
//   {
//     id: 'C001',
//     name: 'XYZ Coop',
//     address: '123 Cooperative St, City, Country',
//   },
//   {
//     id: 'C002',
//     name: 'ABC Coop',
//     address: '456 Main Ave, Another City, Country',
//   },
// ];

// const driverData = [
//   {
//     id: 'D001',
//     name: 'John Doe',
//     license_number: 'D1234567',
//   },
//   {
//     id: 'D002',
//     name: 'Alice Johnson',
//     license_number: 'D7654321',
//   },
// ];

// const conductorData = [
//   {
//     id: 'CN001',
//     name: 'Jane Smith',
//   },
//   {
//     id: 'CN002',
//     name: 'Bob Williams',
//   },
// ];

const ebusData = [
  {
    id: 'EB00001',
=======
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
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    license: 'AB123CD',
    route: 'Route A',
    status: 'active',
    coop_id: 'C001',
    driver_id: 'D001',
    conductor_id: 'CN001',
    total_passengers: 50,
    current_passengers: 30,
<<<<<<< HEAD
    discrepancy: 20,
    dateRegistered: new Date(),
  },
  {
    id: 'EB00002',
=======
    discrepancy: 10,
    dateRegistered: new Date(),
  },
  {
    id: 'E002',
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    license: 'XY987ZT',
    route: 'Route B',
    status: 'inactive',
    coop_id: 'C002',
    driver_id: 'D002',
    conductor_id: 'CN002',
    total_passengers: 40,
    current_passengers: 25,
<<<<<<< HEAD
    discrepancy: 15,
    dateRegistered: new Date(),
  },
  {
    id: 'EB00003',
    license: 'AB123CE',
    route: 'Route C',
    status: 'active',
    coop_id: 'C001',
    driver_id: 'D001',
    conductor_id: 'CN001',
    total_passengers: 50,
    current_passengers: 30,
    discrepancy: 20,
=======
    discrepancy: 5,
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    dateRegistered: new Date(),
  },
];

const devices = [
  {
<<<<<<< HEAD
    id: 'D00001' ,
    ebus_id: 'EB00001',
    registered_at: new Date(),
  },
  {
    id: 'D00002' ,
    ebus_id: 'EB00002',
    registered_at: new Date(),
=======
    serial_number: 'S001',
    ebus_id: 'E001',
  },
  {
    serial_number: 'S002',
    ebus_id: 'E002',
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
  },
];

const sensorData = [
  {
<<<<<<< HEAD
    id: 'S00001',
    device_id: 'D00001',
=======
    id: 'S001',
    serial_number: 'S001', // Now using serial_number as primary key
    ebus_id: 'E001',
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
    latitude: 34.0522,
    longitude: -118.2437,
    speed: 55,
    passenger_count: 5,
    status: 'online',
    timestamp: new Date(),
  },
  {
<<<<<<< HEAD
    id: 'S00002',
    device_id: 'D00002',
=======
    id: 'S002',
    serial_number: 'S002',
    ebus_id: 'E002',
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
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

<<<<<<< HEAD
export { revenue, users, ebusData, sensorData, devices };
=======
export { revenue, users, ebusData, sensorData, coopData, conductorData, driverData, devices };
>>>>>>> 0e0658b0c517596a83865279e5c47d398a116a5f
