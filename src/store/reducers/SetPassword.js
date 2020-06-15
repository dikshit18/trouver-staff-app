import * as ACTIONS from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: true
};

export const setPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOKEN_VALIDITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ACTIONS.TOKEN_VALIDITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ACTIONS.SET_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null };
    case ACTIONS.SET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: null };
    case ACTIONS.TOKEN_VALIDITY_START:
    case ACTIONS.SET_PASSWORD_START:
      return { ...state, loading: true, error: null };
    default:
      return { ...state };
  }
};
