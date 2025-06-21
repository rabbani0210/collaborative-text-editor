
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let sharedText = '';

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('load-text', sharedText);

  socket.on('text-change', (data) => {
    sharedText = data;
    socket.broadcast.emit('receive-text', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
