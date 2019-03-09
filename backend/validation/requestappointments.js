const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRequestAppointmentsPage(data) {
  let errors = {};
  // console.log( " we are in validater function");
  data.patientname = !isEmpty(data.patientname) ? data.patientname : "";
  data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  data.doctorname = !isEmpty(data.doctorname) ? data.doctorname : "";
  data.doctorspeciality = !isEmpty(data.doctorspeciality)
    ? data.doctorspeciality
    : "";
  data.reasonforappointment = !isEmpty(data.reasonforappointment)
    ? data.reasonforappointment
    : "";

  if (!Validator.isLength(data.patientname, { min: 2, max: 30 })) {
    errors.patientname = "Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.patientname)) {
    errors.patientname = "Name field is required";
  }
  if (Validator.isEmpty(data.dateofbirth)) {
    errors.dateofbirth = "Date of Birth is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Phone field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.doctorname)) {
    errors.doctorname = "DoctorName field is required";
  }

  if (Validator.isEmpty(data.doctorspeciality)) {
    errors.doctorspeciality = "Field is required";
  }

  if (Validator.isEmpty(data.reasonforappointment)) {
    errors.reasonforappointment = "Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
