import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { makeAppointment } from "../actions/appointments";
import "../style/searchBar.css";
//import DoctorsDropdown from "./doctorsDropdown";
import axios from "axios";
import TableRowDoctors from "./tableRowDoctors";
class appointments extends Component {
  constructor() {
    super();

    this.state = {
      doctors: []
    };
    //console.log(this.state);
  }
  componentDidMount() {
    axios
      .get("/api/doctors/getdoctors")
      .then(response => {
        console.log(response.data);
        this.setState({
          doctors: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  tabRow = () => {
    return this.state.doctors.map(function(object, i) {
      return <TableRowDoctors obj={object} key={i} />;
    });
  };

  handleInputChange = e => {
    // console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    // console.log(errors);

    const appointmentsAuthenticated = (
      <div>
        <div>
          <h3 align="center">Doctors List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Speciality</th>
                <th>City</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </div>
      </div>
    );

    const appointmentsNotAthenticated = (
      <div>
        <h6>Kindly Login to visite this page </h6>
      </div>
    );

    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated
          ? appointmentsAuthenticated
          : appointmentsNotAthenticated}
      </React.Fragment>
    );
  }
}

appointments.propTypes = {
  registerUser: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { makeAppointment }
)(withRouter(appointments));
