const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const authRouter = require('./routes/auth');
require('./lib/auth/passport');

const app = express();
mongoose.connect(process.env.database);

const database = mongoose.connection;
database.on('error', console.error);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/auth', authRouter);

app.use((req, res, next) => {
  next(new Error(404));
});

app.use((err, req, res, next) => {
  res.json('PLEASE REFER BACK TO API DOCUMENTATION, ERROR OR BAD REQUEST');
});

app.listen(process.env.PORT || 3000);
