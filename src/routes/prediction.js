const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtect = csrf({ cookie: true });

router.use(cookieParser());

const { predict } = require('../controllers/predict');

router.get('/', csrfProtect, (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

router.post('/predict', csrfProtect, (req, res, next) => {
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;

  const prediction = {
    ...req.body,
    'user-agent': req.headers['user-agent'],
    ipAddress: req.ip || ipAddress,
  };
  predict(prediction)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

module.exports = router;
