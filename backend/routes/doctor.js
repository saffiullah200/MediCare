const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

const gravatar = require("gravatar");
// router.get("/getDoctors", function(req, res) {
//   Doctor.find()
//     .then(response => {
//       //console.log("we are in bakcekdn");
//       res.status(200).json(response);
//     })
//     .catch(res.status(400).json("Error"));
// });
router.route("/doctorbyid/:id").get(function(req, res) {
  let id = req.params.id;
  //console.log("Doctor ID " + id);
  Doctor.findById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route("/getDoctors").get(function(req, res) {
  Doctor.find(function(err, doctors) {
    if (err) {
      console.log(err);
    } else {
      res.json(doctors);
    }
  });
});

router.post("/addDoctors", function(req, res) {
  //console.log("data is recieved ", req);
  Doctor.findOne({ email: req.body.email }).then(doctor => {
    if (doctor) {
      res.status(400).json({ email: "Email already exists " });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newdoctor = new Doctor({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        speciality: req.body.speciality,
        address: req.body.address,
        city: req.body.city,
        phonenumber: req.body.phonenumber,
        avatar
      });
      newdoctor.save().then(doctor => {
        //   console.log("Added succesfully ", doctor);
        res.status(200).json("successfully added");
      });
    }
  });
});

module.exports = router;
