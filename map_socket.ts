//This is the websocket that send the lat and lng of random location
//This is opened in a seperate port in the server
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let index = 0;

wss.on('connection', function connection(ws) {
   
    index = 0;
    console.log(`A new Client ${index++} connected`);
    ws.send('Hey there! Welcome to this socket');

    const initialLocation = {
        latitude: 21.1458, 
        longitude: 79.0882,
        
    };
    ws.send(JSON.stringify(initialLocation));

    ws.on('message', function incoming(message) {
        console.log(`Received message is ${message}`);
        ws.send(`Got your message which is: ${message}`);
    });
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
        }
    });
}, 3000);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = 8080;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
