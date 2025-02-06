// import { NextApiRequest, NextApiResponse } from 'next';

// let clients: NextApiResponse[] = []; // Store connected clients

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   global.push(res); // Add new client

//   req.on('close', () => {
//     clients = clients.filter(client => client !== res); // Remove closed connection
//     res.end();
//   });
// }

// // Function to send updates to all connected clients
// export function sendSensorUpdate(data: any) {
//   clients.forEach(client => {
//     client.write(`data: ${JSON.stringify(data)}\n\n`);
//   });
// }
