import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';

import app from "./app.js";
const port = process.env.PORT || 3000;


const server = http.createServer(app);

const io = new Server(server,
  {
    cors:{
      origin:"http://localhost:5177"
    }
  }
);
io.on('connection', socket  => {
  console.log('user Connected')
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
    if(!token){
      return next(new Error('Authorization error'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if(!decoded){
      return next(new Error('Authorization error'))
    }

    socket.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
})

server.listen(port, function(){
    console.log(`Server is running on port ${port}`); 
});