const mongoose = require('mongoose');

const predictionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: 6,
      max: 50,
      validate: {
        validator: function (v) {
          return /^[\u0621-\u064A ]+$/.test(v);
        },
        message: (props) => `${props.value} الاسم غير صحيح`,
      },
      required: [true, 'الاسم مطلوب '],
    },
    mobileNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^01[0125][0-9]{8}$/.test(v);
        },
        message: (props) => `${props.value} موبايل غير صحيح`,
      },
      required: [true, 'موبايل مطلوب'],
    },
    alAhlyPrediction: {
      type: Number,
      min: 0,
      max: 20,
      required: [true, 'توقع الاهلي مطلوب'],
    },
    zamalekPrediction: {
      type: Number,
      min: 0,
      max: 20,
      required: [true, 'توقع الزمالك مطلوب'],
    },
    'user-agent': {
      type: String,
      min: 20,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

let Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
