const express = require("express");
const router = express.Router();
const validateRequestedappointments = require("../validation/requestappointments");
const Appointments = require("../models/Appointments");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const sheduledAppointments = require("../models/sheduledAppointments");
router.route("/sheduleAppointment").post(function(req, res) {
  const newAppointment = new Appointments({
    doctorname: req.body.doctorname,
    doctoremail: req.body.doctoremail,
    doctorspeciality: req.body.doctorspeciality,
    patientaddress: req.body.patientaddress,
    patientemail: req.body.patientemail,
    patientname: req.body.patientname,
    patientphone: req.body.patientphone,
    reasonofappointment: req.body.reasonofappointment,
    date: req.body.date,
    doctoraddress: req.body.doctoraddress,
    status: "pending"
  });

  newAppointment.save().then(appointment => {
    console.log(appointment);
    res.status(200).json(appointment);
  });
});
let patientData;
router.route("/getAppoinmentsPatent").post(function(req, res) {
  let userid = req.body.id;
  //console.log("Id is " + userid);

  User.findById(userid)
    .then(response => {
      patientData = response;
      //    console.log(patientData);

      Appointments.find({ patientname: patientData.name })
        .then(response => {
          console.log(response);
          res.status(200).json(response);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  //console.log(patientData);
});

let doctorData;
router.route("/getAppoinmentsDoctors").post(function(req, res) {
  let userid = req.body.id;
  //console.log("Id is " + userid);

  Doctor.findById(userid)
    .then(response => {
      console.log(response + "doctor appointment requests ");
      doctorData = response;
      //    console.log(patientData);

      Appointments.find({ doctoremail: doctorData.email })
        .then(response => {
          console.log(response);
          res.status(200).json(response);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  //console.log(patientData);
});

router.route("/approvedAppointmentByDoctor").post(function(req, res) {
  let appointmentID = req.body.appointmentid;
  let additionalInfo = req.body.additionalInfo;
  console.log(appointmentID);
  let myquery = { _id: appointmentID };
  let newvalues = { $set: { status: "approved" } };
  Appointments.updateOne(myquery, newvalues, (err, response) => {
    if (response) console.log(response);
    if (err) console.log(err);
  });

  const shedAppointment = new sheduledAppointments({
    appointmentdetailid: appointmentID,
    appointmentnotes: additionalInfo.appointmentnotes,
    appointmenttime: additionalInfo.appointmenttime
  });

  shedAppointment
    .save()
    .then(response => {
      //    console.log(response);
      res.status(200).json("successfully added");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
