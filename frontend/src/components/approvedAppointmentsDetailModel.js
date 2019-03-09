import React from "react";
import { Modal, Button } from "react-bootstrap";
import classnames from "classnames";
import Axios from "axios";
class ApprovedAppointmentsDetailModel extends React.Component {
  constructor() {
    super();
    this.state = {
      appointmenttime: "",
      appointmentnotes: "",
      errors: {}
    };
  }
  render() {
    const { errors } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Approved Appointment{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Details and Additional notes </h4>
          <div
            className="container"
            style={{ marginTop: "50px", width: "700px" }}
          >
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                Appointment Date
                <input
                  type="date"
                  className={classnames("form-control form-control-lg")}
                  value={this.props.obj.date.substr(0, 10)}
                  disabled={"disabled"}
                />
              </div>
              <div className="form-group">
                Appointment Date
                <input
                  type="time"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.appointmenttime
                  })}
                  name="appointmenttime"
                  disabled={"disabled"}
                  onChange={this.handleInputChange}
                  value={this.state.appointmenttime}
                />
                {errors.appointmenttime && (
                  <div className="invalid-feedback">
                    {errors.appointmenttime}
                  </div>
                )}
              </div>
              <div className="form-group">
                Appointment Note for Patient
                <input
                  type="textarea"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.appointmentnotes
                  })}
                  name="appointmentnotes"
                  onChange={this.handleInputChange}
                  value={this.state.appointmentnotes}
                  disabled={"disabled"}
                />
                {errors.appointmentnotes && (
                  <div className="invalid-feedback">
                    {errors.appointmentnotes}
                  </div>
                )}
              </div>

              <div className="form-group" />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="form-group">
            <button onClick={this.props.onHide} className="btn btn-primary">
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ApprovedAppointmentsDetailModel;
