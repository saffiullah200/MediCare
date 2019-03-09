const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentrequestsSchema = new Schema({
  doctorname: {
    type: String,
    required: true
  },
  doctoremail: {
    type: String,
    required: true
  },

  doctoraddress: {
    type: String,
    required: true
  },

  doctorspeciality: {
    type: String,
    required: true
  },

  patientname: {
    type: String,
    required: true
  },

  patientaddress: {
    type: String,
    required: true
  },

  patientemail: {
    type: String,
    required: true
  },

  patientphone: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  reasonofappointment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Appointments = mongoose.model(
  "appointmentrequests",
  appointmentrequestsSchema
);
module.exports = Appointments;
