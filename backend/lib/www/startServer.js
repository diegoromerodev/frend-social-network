const { Server } = require("socket.io");
const app = require("../../app");

const server = app.listen(process.env.PORT || 3000, () => console.log("3000"));

/* REAL-TIME SERVER CONFIG */

const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
  },
});

io.on("connect", (client) => {
  client.on("enter", (roomID) => {
    console.log("entered", roomID);
    client.join(roomID);
  });
});

global.io = io;
