import React, { Component } from "react";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import axios from "axios";
class addDcotorsbyAdmin extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      speciality: "",
      address: "",
      city: "",
      email: "",
      password: "",
      phonenumber: "",
      errors: {}
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const doctor = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      speciality: this.state.speciality,
      address: this.state.address,
      city: this.state.city,
      phonenumber: this.state.phonenumber
    };
    console.log(doctor);
    axios
      .post("/api/doctors/addDoctors", doctor)
      .then(res => {
        res.status(200).json("doctor inserted successfully");
        this.setState({
          name: "",
          speciality: "",
          address: "",
          city: "",
          email: "",
          password: "",
          phonenumber: "",
          errors: {}
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      name: "",
      speciality: "",
      address: "",
      city: "",
      email: "",
      password: "",
      phonenumber: "",
      errors: {}
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div
          className="container"
          style={{ marginTop: "50px", width: "700px" }}
        >
          <h2 style={{ marginBottom: "40px" }}>Add Doctors</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="DoctorName"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Doctor Speciality"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.speciality
                })}
                name="speciality"
                onChange={this.handleInputChange}
                value={this.state.speciality}
              />
              {errors.speciality && (
                <div className="invalid-feedback">{errors.speciality}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.address
                })}
                name="address"
                onChange={this.handleInputChange}
                value={this.state.address}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.phonenumber
                })}
                name="phonenumber"
                onChange={this.handleInputChange}
                value={this.state.phonenumber}
              />
              {errors.phonenumber && (
                <div className="invalid-feedback">{errors.phonenumber}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="City"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.city
                })}
                name="city"
                onChange={this.handleInputChange}
                value={this.state.city}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

// addDcotorsbyAdmin.prototype = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(addDcotorsbyAdmin));
