import * as ACTIONS from "./actionTypes";
import axios from "../../utils/axios";

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
    // setTimeout(() => {
    //   // const details = {
    //   //   history: [
    //   //     {
    //   //       description: "XYZ",
    //   //       id: "f6190b2b-4ffc-4b2d-ac2e-b73306ae61dc",
    //   //       timestamp: "2020-06-20T20:50:43Z"
    //   //     }
    //   //   ],
    //   //   orderId: "04df7954-cad6-4fc6-b8fa-6e7df49e77d4",
    //   //   transition: "on",
    //   //   orderDetails: {
    //   //     recipientName: "Dikshit",
    //   //     address: {
    //   //       line3: "Kurukshetra",
    //   //       line2: "Sector 5",
    //   //       line1: "H.No 552",
    //   //       district: "Kurukshetra"
    //   //     },
    //   //     phoneNumber: "21832983298438"
    //   //   },
    //   //   currentLocation: "Kurukshetra",
    //   //   productDetails: [
    //   //     {
    //   //       productId: "faa3a4a0-a7ae-4531-90d6-efcf34c92dbc",
    //   //       name: "Mask",
    //   //       label: "Mask",
    //   //       quantity: 2
    //   //     },
    //   //     {
    //   //       productId: "faa3a4a0-a7ae-4531-90d6-efcf34c92dbc",
    //   //       name: "Mask",
    //   //       label: "Mask",
    //   //       quantity: 2
    //   //     }
    //   //   ],
    //   //   warehouse: ["Warehouse", "Sonipat", "Panipat", "Karnal", "Kurukshetra"]
    //   // };

    //   dispatch(orderSuccess(details));
    // }, 1000);
    // const config = {
    //   headers: { Authorization: getCookie("idToken") }
    // };
    axios
      .get(
        "http://localhost:3002/shared/order/details/04df7954-cad6-4fc6-b8fa-6e7df49e77d4"
        //config
      )
      .then(data => {
        if (data.data.statusCode === 200) {
          const details = data.data.orderDetails;

          dispatch(orderSuccess(details));
        }
      })
      .catch(error => {
        dispatch(orderFailure(error));
      });
  };
};

export const transitionStart = () => {
  return {
    type: ACTIONS.TRANSITION_START
  };
};
export const transitionSuccess = () => {
  return {
    type: ACTIONS.TRANSITION_SUCCESS
  };
};
export const transitionFailure = error => {
  return {
    type: ACTIONS.TRANSITION_FAILURE,
    error
  };
};
export const transition = orderId => {
  return dispatch => {
    // dispatch(fetchOrdersStart());
    // const config = {
    //   headers: { Authorization: idToken }
    // };
    const payload = {
      orderId
    };
    axios
      .put("http://localhost:3002/shared/order/start", payload)
      .then(data => {
        console.log("Error in orders", data);
        //No dispatching,as no state changes are expected.
      })
      .catch(error => {
        console.log("Error in orders", error);
        dispatch(transitionFailure());
      });
  };
};
