import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApproveAppointmentRequestModel from "./ApproveAppointmentRequestModel";

class TableRowAppointmentsReqDoctor extends Component {
  constructor() {
    super();
    this.state = { modalShow: false };
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <tr>
        <td>{this.props.obj.patientname}</td>
        <td>{this.props.obj.reasonofappointment}</td>
        <td>{this.props.obj.patientphone}</td>
        <td>{this.props.obj.patientaddress}</td>
        <td>{this.props.obj.date.substring(0, 10)}</td>
        <td>
          <ButtonToolbar>
            <Button
              variant="primary"
              onClick={() => this.setState({ modalShow: true })}
            >
              Approve Appointment
            </Button>

            <ApproveAppointmentRequestModel
              obj={this.props.obj}
              show={this.state.modalShow}
              onHide={modalClose}
            />
          </ButtonToolbar>
        </td>
        <td>
          <Link to={"#"} className="btn btn-danger">
            Reject{" "}
          </Link>
        </td>
      </tr>
    );
  }
}

export default TableRowAppointmentsReqDoctor;
