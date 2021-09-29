const { Server } = require('socket.io');
const server = require('../lib/www/serverSetup');

exports.chatroom_message_post = (req, res, next) => {
  const io = new Server(server);
  console.log(io);
};
