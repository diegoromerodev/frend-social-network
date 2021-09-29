const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatroomSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Chatroom", ChatroomSchema);
