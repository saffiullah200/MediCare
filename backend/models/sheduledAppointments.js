const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sheduledAppointmentsSchema = new Schema({
  appointmentdetailid: {
    type: String,
    required: true
  },
  appointmentnotes: {
    type: String,
    required: true
  },
  appointmenttime: {
    type: String,
    required: true
  }
});

const sheduledAppointments = mongoose.model(
  "sheduledappointments",
  sheduledAppointmentsSchema
);
module.exports = sheduledAppointments;
