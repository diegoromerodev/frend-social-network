const { Server } = require('socket.io');
const app = require('../../app');
const { importChatroomsIO } = require('../../controllers/chatroom');

const server = app.listen(3000, () => console.log('3000'));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

io.on('create-room', () => {
  console.log('connected');
});

importChatroomsIO(io);
