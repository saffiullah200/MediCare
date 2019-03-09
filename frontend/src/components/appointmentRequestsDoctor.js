import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TableRowAppointmentsReqDoctor from "./tableRowAppointmentReqDoctor";
class appointmentRequestsDoctor extends Component {
  constructor() {
    super();
    this.state = {
      appointments: []
    };
  }
  componentDidMount() {
    //   console.log(this.props.auth.user);
    //    console.log(this.props.auth.user);
    Axios.post("/api/appointmentrequests/getAppoinmentsDoctors", {
      id: this.props.auth.user.id
    })
      .then(res => {
        this.setState({ appointments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  tabRow = () => {
    return this.state.appointments.map(function(object, i) {
      return <TableRowAppointmentsReqDoctor obj={object} key={i} />;
    });
  };
  render() {
    const appointmentsRequestDoctorAuthenticated = (
      <div>
        <div>
          <h3 align="center">Appointments List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Reason Of Appointment</th>
                <th>Patient Phone</th>
                <th>Patient Address</th>
                <th>Appointment Date</th>
                <th colSpan="2">Status</th>
              </tr>
            </thead>
            <tbody>{this.tabRow()}</tbody>
          </table>
        </div>
      </div>
    );

    const appointmentsNotAthenticated = (
      <div>
        <h6>Kindly Login to visit this page </h6>
      </div>
    );

    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated
          ? appointmentsRequestDoctorAuthenticated
          : appointmentsNotAthenticated}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(appointmentRequestsDoctor));
