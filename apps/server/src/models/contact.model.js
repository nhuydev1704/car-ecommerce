const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

/**
 * @typedef Contact
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
