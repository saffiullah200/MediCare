import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonToolbar } from "react-bootstrap";
import ApprovedAppointmentsDetailModel from "./approvedAppointmentsDetailModel";
class TableRowAppointments extends Component {
  state = {};
  render() {
    let modalClose = () => this.setState({ modalShow: false });

    const pending = (
      <Link to={"#"} className="btn btn-primary">
        Pending{" "}
      </Link>
    );

    const Approved = (
      <ButtonToolbar>
        <Button
          className="btn btn-success"
          onClick={() => this.setState({ modalShow: true })}
        >
          Approved
        </Button>

        <ApprovedAppointmentsDetailModel
          obj={this.props.obj}
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );

    const Rejected = (
      <Link to={"#"} className="btn btn-danger">
        Rejected{" "}
      </Link>
    );
    return (
      <tr>
        <td>{this.props.obj.doctorname}</td>
        <td>{this.props.obj.doctorspeciality}</td>
        <td>{this.props.obj.doctoraddress}</td>
        <td>{this.props.obj.date.substring(0, 10)}</td>
        <td>
          {this.props.obj.status === "pending"
            ? pending
            : this.props.obj.status === "approved"
            ? Approved
            : Rejected}
        </td>
        <td />
      </tr>
    );
  }
}

export default TableRowAppointments;
