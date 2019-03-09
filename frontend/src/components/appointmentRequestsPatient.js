import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TableRowAppointments from "./TableRowAppointments";

class appointmentRequestsPatient extends Component {
  constructor() {
    super();
    this.state = {
      appointments: []
    };
  }
  componentDidMount() {
    //   console.log(this.props.auth.user);
    console.log(this.props.auth.user);
    Axios.post("/api/appointmentrequests/getAppoinmentsPatent", {
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
      return <TableRowAppointments obj={object} key={i} />;
    });
  };
  render() {
    const appointmentsRequestPatientAuthenticated = (
      <div>
        <div>
          <h3 align="center">Appointments List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Speciality</th>
                <th>Doctor Address</th>
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
        <h6>Kindly Login to visitthis page </h6>
      </div>
    );

    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated
          ? appointmentsRequestPatientAuthenticated
          : appointmentsNotAthenticated}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(appointmentRequestsPatient));
