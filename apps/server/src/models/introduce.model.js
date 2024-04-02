const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const introduceSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
introduceSchema.plugin(toJSON);

const Introduce = mongoose.model('Introduce', introduceSchema);

module.exports = Introduce;
