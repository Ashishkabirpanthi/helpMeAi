import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { Server } from "socket.io"

import app from "./app.js";
const port = process.env.PORT || 3000;


const server = http.createServer(app);

const io = new Server(server);
io.on('connection', socket  => {
  console.log('user Connected')
});

server.listen(port, function(){
    console.log(`Server is running on port ${port}`); 
});