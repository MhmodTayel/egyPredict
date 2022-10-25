const express = require('express');
const router = express.Router();

const { predict } = require('../controllers/predict');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/predict', (req, res, next) => {
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  const prediction = {
    ...req.body,
    'user-agent': req.headers['user-agent'],
    ipAddress,
  };
  predict(prediction)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;
