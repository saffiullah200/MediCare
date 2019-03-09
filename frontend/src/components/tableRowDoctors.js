import React, { Component } from "react";
import { Link } from "react-router-dom";

class TableRowDoctors extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.speciality}</td>
        <td>{this.props.obj.city}</td>
        <td>
          <Link
            to={"/appointDoctor/" + this.props.obj._id}
            className="btn btn-primary"
          >
            Make Appointment{" "}
          </Link>
        </td>
        <td />
      </tr>
    );
  }
}

export default TableRowDoctors;
