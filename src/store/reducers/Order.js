import * as ACTIONS from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: true,
  orderDetails: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.details,
        loading: false
      };
    case ACTIONS.FETCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ACTIONS.FETCH_ORDER_START:
      return { ...state, loading: true, error: null };
    default:
      return { ...state };
  }
};
