import React from "react";
import { connect } from "react-redux";
import { login } from "../store/actions/index";
import SessionValidityHOC from "../hoc/SessionValidity";
import Order from "../components/Order";

const OrderContainer = props => {
  console.log("Hello in order");
  return <Order />;
};

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    loading: state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSubmitHandler: ({ username, password }) => {
      dispatch(login(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionValidityHOC(OrderContainer));
