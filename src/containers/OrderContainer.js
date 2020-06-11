import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchOrderDetails,
  logout,
  changePassword
} from "../store/actions/index";
import SessionValidityHOC from "../hoc/SessionValidity";
import Order from "../components/Order";

const OrderContainer = props => {
  const { onFetchOrderDetails, orderDetails } = props;
  const logout = () => {
    props.onLogout();
  };
  const changePasswordFormSubmit = values => {
    props.onChangePassword(values);
  };
  useEffect(() => {
    onFetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   const
  // }, [orderDetails]);
  return (
    <Order
      logout={logout}
      submit={changePasswordFormSubmit}
      orderDetails={orderDetails}
    />
  );
};

const mapStateToProps = state => {
  return {
    orderDetails: state.order.orderDetails
    // loading: state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrderDetails: orderId => {
      dispatch(fetchOrderDetails(orderId));
    },

    onLogout: () => {
      dispatch(logout());
    },
    onChangePassword: values => {
      dispatch(changePassword(values));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionValidityHOC(OrderContainer));
