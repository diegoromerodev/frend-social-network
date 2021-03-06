require("./lib/auth/passport.js");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users").router;
const postsRouter = require("./routes/posts");
const { validate_token } = require("./controllers/auth");
const path = require("path");
const { search_get } = require("./controllers/search.js");

require("dotenv").config();

const app = express();
mongoose.connect(process.env.database);

const database = mongoose.connection;
database.on("error", console.error);

app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/users", validate_token, usersRouter);
app.use("/posts", validate_token, postsRouter);
app.get("/search/:searchParam", validate_token, search_get);

app.use((req, res, next) => {
  next(new Error(404));
});

app.use((err, req, res, next) => {
  res
    .status(err.message || 400)
    .json("PLEASE REFER BACK TO API DOCUMENTATION, ERROR OR BAD REQUEST");
});

module.exports = app;
