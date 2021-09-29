let io;

exports.importChatroomsIO = (receiveIO) => {
  io = receiveIO;
};

exports.chatroom_message_post = (req, res, next) => {
  const message = 'IS THIS FINALLY MY FIRST MESSAGE?';
  io.to('USERIDTOBEADDED').emit('message', message);
  res.json(message);
};
