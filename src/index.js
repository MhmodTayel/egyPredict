require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const { PORT = 3000, DB_URI } = process.env;
const predictionRoute = require('./routes/prediction');

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

mongoose.connect(DB_URI);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.once('error', (err) => {
  console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', predictionRoute);

app.use('*', (req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(403).json(err);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
