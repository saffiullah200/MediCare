import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import requestappointmentsReducer from "./requestappointmentsReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  requestappointments: requestappointmentsReducer
});
