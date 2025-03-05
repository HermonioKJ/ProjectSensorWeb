import { hashSync } from 'bcryptjs';

const users = [
  {
    id: 'U0001',
    email: 'user@nextmail.com',
    password: hashSync('123456', 10),
  },
  {                                                                                                                                                                                                                                                                                                                                        
    id: 'U0002',
    email: 'user2@nextmail.com',
    password: hashSync('password', 10),
  },
];

const usersInfo = [
  {
    id: 'U0001',
    email: 'user@nextmail.com',
    firstName: 'Juan',
    lastName: 'de la Cruz',
    phoneNo: '09936504930',
    region: 'Region 6',
    province: 'Iloilo',
    city: 'Iloilo City',
    barangay: 'Jaro'
  },
  {
    id: 'U0002',
    email: 'user2@nextmail.com',
    firstName: 'Maria',
    lastName: 'Clara',
    phoneNo: '09088830610',
    region: 'Region 6',
    province: 'Iloilo',
    city: 'Iloilo City',
    barangay: 'Jaro'
  }
]

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
    id: 'EB0001',
    license: 'AB123CD',
    route: 'Route A',
    status: 'active',
    coop_id: 'C001',
    driver_id: 'D001',
    conductor_id: 'CN001',
    total_passengers: 50,
    current_passengers: 30,
    discrepancy: 20,
    dateRegistered: new Date(),
  },
  {
    id: 'EB0002',
    license: 'XY987ZT',
    route: 'Route B',
    status: 'inactive',
    coop_id: 'C002',
    driver_id: 'D002',
    conductor_id: 'CN002',
    total_passengers: 40,
    current_passengers: 25,
    discrepancy: 15,
    dateRegistered: new Date(),
  },
  {
    id: 'EB0003',
    license: 'AB123CE',
    route: 'Route C',
    status: 'active',
    coop_id: 'C001',
    driver_id: 'D001',
    conductor_id: 'CN001',
    total_passengers: 50,
    current_passengers: 30,
    discrepancy: 20,
    dateRegistered: new Date(),
  },
];

const devices = [
  {
    id: 'D00001' ,
    ebus_id: 'EB00001',
    registered_at: new Date(),
  },
  {
    id: 'D00002' ,
    ebus_id: 'EB00002',
    registered_at: new Date(),
  },
];

const sensorData = [
  {
    id: 'S00001',
    device_id: 'D00002',
    latitude: 34.0522,
    longitude: -118.2437,
    speed: 55,
    passenger_count: 5,
    status: 'online',
    timestamp: new Date(),
  },
  {
    id: 'S00002',
    device_id: 'D00002',
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

export { revenue, users, ebusData, sensorData, devices, usersInfo };
