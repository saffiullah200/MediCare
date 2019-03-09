const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

router.post("/register", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        bloodgroup: req.body.bloodgroup,
        usertype: req.body.usertype,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});
router.get("/getpatient/:id", function(req, res) {
  let id = req.params.id;
  // console.log(id);
  User.findById(id, function(err, user) {
    if (user) {
      //   console.log(user);
      res.status(200).json(user);
    } else {
      console.log(err);
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const usertype = req.body.usertype;
  if (usertype == "patient") {
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            usertype: "patient",
            name: user.name,
            avatar: user.avatar
          };
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 36000
            },
            (err, token) => {
              if (err) console.error("There is some error in token", err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  }
  if (usertype == "doctor") {
    // console.log("Doctor login block ");
    Doctor.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "Doctor not found";
        return res.status(404).json(errors);
      }

      // console.log(doctor, password);
      if (user.password === password) {
        console.log(user.avatar);
        const payload = {
          id: user.id,
          usertype: "doctor",
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 36000
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        //  console.log("Error incoreect block ");
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  }
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
