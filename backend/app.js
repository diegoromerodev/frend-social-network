const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const { Server } = require('socket.io');
const http = require('http');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

require('./lib/auth/passport');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.database);

const database = mongoose.connection;
database.on('error', console.error);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(new Error(404));
});

app.use((err, req, res, next) => {
  res.status(err.message || 400).json('PLEASE REFER BACK TO API DOCUMENTATION, ERROR OR BAD REQUEST');
});

module.exports = app;
