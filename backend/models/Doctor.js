const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorShema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },

  phonenumber: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model("doctors", doctorShema);
module.exports = Doctor;
