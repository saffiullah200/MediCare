import React, { Component } from "react";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { makeAppointment } from "../actions/appointments";
//console.log(this.props.auth.user.id);
class appointDoctor extends Component {
  constructor() {
    super();

    this.state = {
      doctorname: "",
      doctoremail: "",
      doctorspeciality: "",
      doctoraddress: "",
      patientname: "",
      patientaddress: "",
      patientemail: "",
      patientphone: "",
      date: "",
      reasonofappointment: "",
      errors: {}
    };
  }
  componentDidMount() {
    // console.log(this.props.auth.user);
    axios
      .get("/api/users/getpatient/" + this.props.auth.user.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          patientemail: response.data.email,
          patientphone: response.data.phone,
          patientname: response.data.name
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("/api/doctors/doctorbyid/" + this.props.match.params.id)
      .then(response => {
        //   console.log(response.data);
        this.setState({
          doctoremail: response.data.email,
          doctorname: response.data.name,
          doctorspeciality: response.data.speciality,
          doctoraddress: response.data.address
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let strDate = this.state.date;

    const appointmentRequests = {
      doctorname: this.state.doctorname,
      doctoremail: this.state.doctoremail,
      doctorspeciality: this.state.doctorspeciality,
      patientaddress: this.state.patientaddress,
      patientemail: this.state.patientemail,
      patientname: this.state.patientname,
      patientphone: this.state.patientphone,
      reasonofappointment: this.state.reasonofappointment,
      doctoraddress: this.state.doctoraddress,
      date: strDate.substring(0, 10)
    };
    console.log(appointmentRequests);
    axios
      .post("/api/appointmentrequests/sheduleAppointment", appointmentRequests)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/");
  };

  render() {
    const { errors } = this.state;
    // console.log("errro may occue");
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Appointment</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            Doctor Name
            <input
              type="text"
              //placeholder="PatientName"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.doctorname
              })}
              name="doctorname"
              onChange={this.handleInputChange}
              value={this.state.doctorname}
              disabled={"disabled"}
            />
            {errors.patientname && (
              <div className="invalid-feedback">{errors.doctorname}</div>
            )}
          </div>
          <div className="form-group">
            Doctor Speciality
            <input
              type="text"
              //placeholder="PatientName"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.doctorspeciality
              })}
              name="doctorspeciality"
              onChange={this.handleInputChange}
              value={this.state.doctorspeciality}
              disabled={"disabled"}
            />
            {errors.doctorspeciality && (
              <div className="invalid-feedback">{errors.doctorspeciality}</div>
            )}
          </div>
          <div className="form-group">
            Patient Name
            <input
              type="text"
              placeholder="PatientName"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.patientname
              })}
              name="patientname"
              onChange={this.handleInputChange}
              value={this.state.patientname}
              disabled={"disabled"}
            />
            {errors.patientname && (
              <div className="invalid-feedback">{errors.patientname}</div>
            )}
          </div>
          Patient Address
          <div className="form-group">
            <input
              type="text"
              placeholder="Patient Address"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.patientaddress
              })}
              name="patientaddress"
              onChange={this.handleInputChange}
              value={this.state.patientaddress}
            />
            {errors.patientaddress && (
              <div className="invalid-feedback">{errors.patientaddress}</div>
            )}
          </div>
          <div className="form-group">
            Patient Email
            <input
              type="email"
              placeholder="patientemail"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.patientemail
              })}
              name="patientemail"
              onChange={this.handleInputChange}
              value={this.state.patientemail}
              disabled={"disabled"}
            />
            {errors.patientemail && (
              <div className="invalid-feedback">{errors.patientemail}</div>
            )}
          </div>
          <div className="form-group">
            Patient PhoneNumber
            <input
              type="text"
              placeholder="patientphone"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.patientphone
              })}
              name="patientphone"
              onChange={this.handleInputChange}
              value={this.state.patientphone}
              disabled={"disabled"}
            />
            {errors.patientphone && (
              <div className="invalid-feedback">{errors.patientphone}</div>
            )}
          </div>
          <div className="form-group">
            Date for the Appointment
            <input
              type="date"
              placeholder="date"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.date
              })}
              name="date"
              onChange={this.handleInputChange}
              value={this.state.date}
            />
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>
          <div className="form-group">
            <textarea
              type="text"
              placeholder="Reason Of appointment"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.reasonofappointment
              })}
              name="reasonofappointment"
              onChange={this.handleInputChange}
              value={this.state.reasonofappointment}
            />
            {errors.reasonofappointment && (
              <div className="invalid-feedback">
                {errors.reasonofappointment}
              </div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Appoint Doctor
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// appointDoctor.prototype = {
//   auth: PropTypes.object
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { makeAppointment }
)(withRouter(appointDoctor));
