const mongoose = require("mongoose");
const async = require("async");
const faker = require("faker");

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

require("dotenv").config();

const users = [];
const posts = [];
const comments = [];

mongoose.connect(process.env.database);
const db = mongoose.connection;
db.on("error", console.error);

function createUser(callback) {
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const profile_photo = faker.image.avatar();
  const birthday = faker.date.past();
  const facebook_id = faker.datatype.number();
  const email = faker.internet.email();
  const newUser = new User({
    first_name,
    last_name,
    profile_photo,
    birthday,
    facebook_id,
    email,
  });

  users.push(newUser);
  newUser.save(callback);
}

function createPost(callback) {
  const text = faker.commerce.productDescription();
  const created_at = faker.date.recent();
  const image = Math.round(Math.random()) ? "" : faker.image.imageUrl();
  const heading = Math.round(Math.random()) ? "" : faker.hacker.adjective();
  const author = users[Math.floor(Math.random() * users.length)];

  const likes = [];

  for (let i = 0; i < Math.floor(Math.random() * users.length); i++) {
    likes.push(users[Math.floor(Math.floor(Math.random() * users.length))]);
  }

  const newPost = new Post({
    text,
    created_at,
    image,
    heading,
    author,
    likes,
  });

  posts.push(newPost);
  newPost.save(callback);
}

function createComment(callback) {
  const text = faker.commerce.productDescription();
  const created_at = faker.date.recent();
  const author = users[Math.floor(Math.random() * users.length)];
  const post = posts[Math.floor(Math.random() * posts.length)];
  const likes = [];

  for (let i = 0; i < Math.floor(Math.random() * users.length); i++) {
    likes.push(users[Math.floor(Math.floor(Math.random() * users.length))]);
  }

  const newComment = new Comment({
    text,
    created_at,
    author,
    likes,
    post,
  });

  post.comments.push(newComment);
  comments.push(newComment);
  newComment.save((err, doc) => {
    if (err) callback(err, doc);
    post.save(callback);
  });
}

function addFriends(callback) {
  const randUser = users[Math.floor(Math.random() * users.length)];
  const friendsToAdd = new Set();
  for (let i = 0; i < users.length; i++) {
    const currUser = users[i];
    if (currUser !== randUser) friendsToAdd.add(currUser);
  }
  randUser.friends = Array.from(friendsToAdd);
  randUser.save(callback);
}

function findOneUser(callback) {
  User.findById("61591d9335e01d54a8289d8c").exec((err, doc) => {
    users.push(doc);
    callback(err, doc);
  });
}

function loopCreation(creatorFn, upperCallback) {
  let count = 0;
  const repetitions = Math.round(Math.random() * (100 - 2) + 4);
  async.whilst(
    (testCb) => testCb(null, count <= repetitions),
    (callback) => {
      count += 1;
      creatorFn(callback);
    },
    upperCallback
  );
}

function runAll() {
  async.series(
    [
      // (finished) => loopCreation(createUser, finished),
      (finished) => loopCreation(findOneUser, finished),
      (finished) => loopCreation(createPost, finished),
      (finished) => loopCreation(createComment, finished),
      (finished) => loopCreation(addFriends, finished),
    ],
    (err, res) => {
      if (err) console.error(err);
      mongoose.disconnect();
    }
  );
}

runAll();
