import * as ACTIONS from "./actionTypes";
import axios from "../../utils/axios";
import { apiEndpoints } from "../../utils/constants";
import { getCookie, deleteAllCookies } from "../../utils/cookies";

const detailsSuccess = details => {
  return {
    type: ACTIONS.DETAILS_SUCCESS,
    details
  };
};
const detailsFailure = error => {
  return {
    type: ACTIONS.DETAILS_FAILURE,
    error
  };
};
const detailsStart = () => {
  return {
    type: ACTIONS.DETAILS_START
  };
};

export const details = () => {
  return dispatch => {
    dispatch(detailsStart());
    const config = {
      headers: { Authorization: getCookie("idToken") }
    };
    axios
      .get(apiEndpoints.details, config)
      .then(data => {
        if (data.data.statusCode === 200) {
          const { details } = data.data;
          dispatch(detailsSuccess(details));
        }
      })
      .catch(error => {
        dispatch(detailsFailure(error));
      });
  };
};

const changePasswordSuccess = () => {
  return {
    type: ACTIONS.CHANGE_PASSWORD_SUCCESS
  };
};
const changePasswordFailure = error => {
  return {
    type: ACTIONS.CHANGE_PASSWORD_FAILURE,
    error
  };
};
const changePasswordStart = () => {
  return {
    type: ACTIONS.CHANGE_PASSWORD_START
  };
};

export const changePassword = values => {
  return dispatch => {
    dispatch(changePasswordStart());
    const { oldPassword, newPassword } = values;
    const sessionId = getCookie("sessionId");
    const idToken = getCookie("idToken");
    const payload = { sessionId, oldPassword, newPassword };
    const config = {
      headers: { Authorization: idToken }
    };
    axios
      .post(apiEndpoints.changePassword, payload, config)
      .then(data => {
        dispatch(changePasswordSuccess());
      })
      .catch(error => dispatch(changePasswordFailure(error)));
  };
};
