const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('ALL SET');
});

app.use((req, res, next) => {
  next(new Error(404));
});

app.use((err, req, res, next) => {
  res.json('PLEASE REFER BACK TO API DOCUMENTATION, ERROR OR BAD REQUEST');
});

app.listen(3000);
