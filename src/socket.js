import { Server } from 'socket.io';

let io;

let messages = [];

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    console.log(`Se conecto un cliente (${socketClient.id})`);

    socketClient.emit('notification', { messages });

    socketClient.broadcast.emit('new-client');

    socketClient.on('new-message', (data) => {
      const { username, text } = data;
      messages.push({ username, text });
      io.emit('notification', { messages });
    })
  });

  console.log('Socket iniciado');
};

export const emitFromApi = (event, data) => io.emit(event, data);