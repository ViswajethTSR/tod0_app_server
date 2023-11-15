//This is the websocket that send the lat and lng of random location
//This is opened in a seperate port in the server
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let index = 0;

wss.on('connection', (ws) =>{
    // Reset index to 0 when a new client connects
    index = 0;
    console.log(`A new Client connected`);
    ws.send('Hey there! Welcome to this socket');

    // Send initial location data
    const initialLocation = {
        latitude: 21.1458, 
        longitude: 79.0882,
        
    };
    ws.send(JSON.stringify(initialLocation));

    ws.on('message', (message) =>{
        console.log(`Received message is ${message}`);
        ws.send(`Got your message which is: ${message}`);
    });
    ws.on('close',()=>{
        ws.send('Your connection is closed');
        console.log('connection closed')
    })
});

setInterval(() => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            // Simulate changing location data
            const newLocation = {
                latitude:  21.1458 + Math.random() * 0.1,
                longitude: 79.0882 + Math.random() * 0.1,
            };
            client.send(JSON.stringify(newLocation));
            console.log(newLocation);
        }
    });
}, 3000);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = 1800;  
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
