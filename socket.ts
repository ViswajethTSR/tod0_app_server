import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let index=0;
wss.on('connection',function connection(ws){

    console.log(`A new Client ${index++} connected`);
    ws.send('Hey there welcome to this socket')
    ws.on('message',function incoming(message){
        console.log(`Received message is ${message}`);
        ws.send(`Got your message which is : ${message}`);
    });
})

setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server: Data sent every 2 seconds`);
      }
    });
  }, 2000);


app.get('/', (req, res) => res.send('Hello World!'));

const PORT = 1800;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
