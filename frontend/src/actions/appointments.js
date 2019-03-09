const axios = require("axios");
const { GET_ERRORS } = require("./types");

export const makeAppointment = (requestappointment, history) => dispatch => {
  // console.log(requestappointment, "i am in make appointment");
  axios
    .post("/api/requestedappointments/requestappointment", requestappointment)
    .then(res => history.push("/appointmentsecond"))
    .catch(err => {
      //   console.log(err.response.data, "i am in make appointment error");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
