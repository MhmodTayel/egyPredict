const Prediction = require('../models/prediction');

const predict = (prediction) => Prediction.create(prediction);

module.exports = { predict };
