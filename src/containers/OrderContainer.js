import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchOrderDetails,
  logout,
  changePassword,
  transition
} from "../store/actions/index";
import SessionValidityHOC from "../hoc/SessionValidity";
import Order from "../components/Order";

const OrderContainer = props => {
  const { onFetchOrderDetails, orderDetails, onStartTransition } = props;
  const logout = () => {
    props.onLogout();
  };
  const changePasswordFormSubmit = values => {
    props.onChangePassword(values);
  };
  const transitionHandler = event => {
    if (event) {
      const orderId = props.history.location.pathname.split("/")[2];
      onStartTransition(orderId);
    }
  };
  useEffect(() => {
    onFetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Order
      logout={logout}
      submit={changePasswordFormSubmit}
      orderDetails={orderDetails}
      transitionHandler={transitionHandler}
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
    },
    onStartTransition: orderId => {
      dispatch(transition(orderId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionValidityHOC(OrderContainer));
