const mongoose = require("mongoose");
const async = require("async");
const faker = require("faker");

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Chatroom = require("./models/chatroom");
const Message = require("./models/message");
const Notification = require("./models/notification");

require("dotenv").config();

mongoose.connect(process.env.database);
const db = mongoose.connection;
db.on("error", console.error);

(async () => {
  await User.collection.drop();
  await Post.collection.drop();
  await Comment.collection.drop();
  mongoose.disconnect();
})();
