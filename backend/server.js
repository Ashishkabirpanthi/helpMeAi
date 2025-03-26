import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from '../backend/models/project.model.js';


import app from "./app.js";
const port = process.env.PORT || 3000;


const server = http.createServer(app);
import { generateResult } from '../backend/services/ai.service.js';

const io = new Server(server,
  {
    cors: {
      origin: "*"
    }
  }
);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
    const projectId = socket.handshake.query.projectId;
    if (!token) {
      return next(new Error('Authorization error'))
    }

    if (!projectId) {
      return next(new Error('Project id is not found'))
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error('invalid projectId'))
    }

    socket.project = await projectModel.findById(projectId);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!decoded) {
      return next(new Error('Authorization error'))
    }

    socket.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
})

io.on('connection', socket => {
  socket.roomId = socket.project._id.toString();
  console.log('user Connected')
  socket.join(socket.roomId);

  socket.on('project-message', async (data) => {
    const message = data.message;
    const aiIsPresentInMessage = message.includes('@ai');

    socket.broadcast.to(socket.roomId).emit('project-message', data)
    if (aiIsPresentInMessage) {
      const prompt = message.replace('@ai', '');
      const result = await generateResult(prompt);
      io.to(socket.roomId).emit('project-message', {
        message: result,
        sender: {
          _id: 'AI',
          email: 'AI'
        }
      })
    }
  })

  socket.on('disconnect', () => {
    console.log("User disconnected");
    socket.leave(socket.roomId);
  });
});

server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});