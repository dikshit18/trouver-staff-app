import * as ACTIONS from "./actionTypes";
import axios from "../../utils/axios";
import { apiEndpoints } from "../../utils/constants";
import { getCookie, deleteAllCookies } from "../../utils/cookies";

const orderSuccess = details => {
  return {
    type: ACTIONS.FETCH_ORDER_SUCCESS,
    details
  };
};
const orderFailure = error => {
  return {
    type: ACTIONS.FETCH_ORDER_FAILURE,
    error
  };
};
const orderStart = details => {
  return {
    type: ACTIONS.FETCH_ORDER_START,
    details
  };
};

export const fetchOrderDetails = () => {
  return dispatch => {
    dispatch(orderStart());
    setTimeout(() => {
      console.log("I am here");
      const details = {
        orderId: "bbd4ce26-0cea-491d-a570-73a7f99db771",
        timestamp: "",
        itemName: "Trimmer",
        source: "New Delhi",
        destination: "Chandigarh",
        location: [{ Kurukshetra: "1:10PM" }, { Karnal: "1:10PM" }],
        label: "Suresh Kumar",
        phoneNumber: "+18472198",
        address: "uhie1872",
        stage: 1
      };
      dispatch(orderSuccess(details));
    }, 1000);
    // const config = {
    //   headers: { Authorization: getCookie("idToken") }
    // };
    // axios
    //   .get(apiEndpoints.details, config)
    //   .then(data => {
    //     if (data.data.statusCode === 200) {
    //       const { details } = data.data;
    //       dispatch(detailsSuccess(details));
    //     }
    //   })
    //   .catch(error => {
    //     dispatch(detailsFailure(error));
    //   });
  };
};
