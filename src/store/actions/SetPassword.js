import * as ACTIONS from "./actionTypes";
import axios from "../../utils/axios";
import { apiEndpoints } from "../../utils/constants";
import { getCookie, deleteAllCookies } from "../../utils/cookies";

const tokenValiditySuccess = () => {
  return {
    type: ACTIONS.TOKEN_VALIDITY_SUCCESS
  };
};
const tokenValidityFailure = error => {
  return {
    type: ACTIONS.TOKEN_VALIDITY_FAILURE,
    error
  };
};
const tokenValidityStart = () => {
  return {
    type: ACTIONS.TOKEN_VALIDITY_START
  };
};

export const tokenValidity = token => {
  return dispatch => {
    dispatch(tokenValidityStart());
    const payload = { token };
    axios
      .post("http://localhost:3001/staff/validate-token", payload)
      .then(data => {
        dispatch(tokenValiditySuccess());
      })
      .catch(error => dispatch(tokenValidityFailure(error)));
  };
};

const setPasswordSuccess = () => {
  return {
    type: ACTIONS.SET_PASSWORD_SUCCESS
  };
};
const setPasswordFailure = error => {
  return {
    type: ACTIONS.SET_PASSWORD_FAILURE,
    error
  };
};
const setPasswordStart = () => {
  return {
    type: ACTIONS.SET_PASSWORD_START
  };
};

export const setPassword = values => {
  return dispatch => {
    dispatch(setPasswordStart());
    const { token, password } = values;
    const payload = { token, password };
    axios
      .post("http://localhost:3001/staff/confirm-user", payload)
      .then(data => {
        dispatch(setPasswordSuccess());
      })
      .catch(error => dispatch(setPasswordFailure(error)));
  };
};
