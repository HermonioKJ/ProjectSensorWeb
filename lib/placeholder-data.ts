import { hashSync } from 'bcryptjs'

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: hashSync('123456', 10),
  },
]

const coopData = {
  id: 'a1e56e2e-99d5-4a4b-91fa-944d1840521f',
  name: 'XYZ Coop',
  address: '123 Cooperative St, City, Country',
};

const driverData = {
  id: 'e4b56f3e-937f-4e3d-b0a4-0b9c22162bda',
  name: 'John Doe',
  license_number: 'D1234567',
};

const conductorData = {
  id: '6db7b490-91e7-4bfa-b07a-b7632a03e77b',
  name: 'Jane Smith',
};

const ebusData = [
  {
    id: 'fa34701b-997f-4a58-bfe3-d8390b732dcd',
    license: 'AB123CD',
    route: 'Route A',
    status: 'active',
    coop_id: coopData.id,
    driver_id: driverData.id,
    conductor_id: conductorData.id,
    total_passengers: 50,
    current_passengers: 30,
    discrepancy: 10,
    DateRegistered: new Date().toISOString
  },
];

const sensorData = [
  {
    id: 'f9384712-b2e9-4d8e-b61f-c6343b8ae12d',
    ebus_id: ebusData[0].id,
    latitude: 123456,
    longitude: 654321,
    passenger_count: 30,
    timestamp: new Date(),
  },
];

const revenue = [
  {
    month: 'January',
    revenue: 1000
  },
  {
    month: 'Febuary',
    revenue: 2000
  },
  {
    month: 'March',
    revenue: 3000
  },
  {
    month: 'April',
    revenue: 4500
  },
  {
    month: 'May',
    revenue: 4500
  },
]

export { revenue, users, ebusData, sensorData, coopData, conductorData, driverData }
