import React from "react";
import { Modal, Button } from "react-bootstrap";
import classnames from "classnames";
import Axios from "axios";
class ApproveAppointmentRequestModel extends React.Component {
  constructor() {
    super();
    this.state = {
      appointmenttime: "",
      appointmentnotes: "",
      errors: {}
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    // console.log("id is " + this.props.obj._id);
    // console.log(this.props.obj);
    const additionalInfo = {
      appointmenttime: this.state.appointmenttime,
      appointmentnotes: this.state.appointmentnotes
    };
    //console.log(additionalInfo);

    Axios.post("/api/appointmentrequests/approvedAppointmentByDoctor", {
      appointmentid: this.props.obj._id,
      additionalInfo
    })
      .then(Response => {
        console.log("succefull");
        //     this.props.onHide;
        //      this.props.history.push("/appointmentRequestsDoctor");
      })
      .catch(err => {
        console.log("Error occured ");
      });
  };
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
            Approve Appointment{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Details </h4>
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
                />
                {errors.appointmentnotes && (
                  <div className="invalid-feedback">
                    {errors.appointmentnotes}
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
export default ApproveAppointmentRequestModel;
