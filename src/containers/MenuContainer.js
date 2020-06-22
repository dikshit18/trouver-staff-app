import React, { useEffect } from "react";
import { connect } from "react-redux";
import { details, changePassword, fetchOrders } from "../store/actions/index";
import Menu from "../components/Menu";
import { logout } from "../store/actions";
import SessionValidityHOC from "../hoc/SessionValidity";
import {
  initiateClient,
  handleWebsocketResponse
} from "../utils/websocketHelper";
import { getCookie } from "../utils/cookies";

const MenuContainer = props => {
  const { onFetchDetails, onLogout, onFetchOrders } = props;
  useEffect(() => {
    onFetchDetails();
    onFetchOrders();
  }, [onFetchDetails, onFetchOrders]);
  useEffect(() => {
    let client;
    client = initiateClient();
    client.onmessage = message => {
      try {
        if (!props.details) client.close();
        console.log("Message in websocket....", message);
        const parsedMessage = JSON.parse(message.data);
        console.log("parsedMessage", parsedMessage.dispatch);
        if (parsedMessage.dispatch === "logout") {
          onLogout();
          return () => {
            client.close();
          };
        }
        handleWebsocketResponse(parsedMessage);
      } catch (error) {
        //Non handled message which aren't JSON.
      }
    };
    const webSocketInterval = setInterval(() => {
      client.close();
      client.onclose = () => {
        console.log("Closing websocket connection now... ", Date());
      };
      client = null;
      const sessionId = getCookie("sessionId");
      if (sessionId) {
        client = initiateClient();
        client.onmessage = message => {
          try {
            console.log("Message in websocket....", message);
            const parsedMessage = JSON.parse(message.data);
            if (parsedMessage.dispatch === "logout") {
              onLogout();
              return () => {
                client.close();
              };
            }
            handleWebsocketResponse(parsedMessage);
          } catch (error) {
            //Non handled message which aren't JSON.
          }
        };
      }
    }, 570000); //Every 9.5 minutes
    return () => {
      client.close();
      clearInterval(webSocketInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logout = () => {
    props.onLogout();
  };
  const changePasswordFormSubmit = values => {
    props.onChangePassword(values);
  };

  return (
    <Menu
      details={props.details}
      loading={props.loading}
      logout={logout}
      submit={changePasswordFormSubmit}
      orders={props.orders}
      isLoadingOrders={props.isLoadingOrders}
    />
  );
};
const mapStateToProps = state => {
  return {
    details: state.menu.details,
    loading: state.menu.loading,
    isLoadingOrders: state.menu.isLoadingOrders,
    orders: state.menu.orders
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchDetails: () => {
      dispatch(details());
    },
    onLogout: () => {
      dispatch(logout());
    },
    onChangePassword: values => {
      dispatch(changePassword(values));
    },
    onFetchOrders: () => {
      dispatch(fetchOrders());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionValidityHOC(MenuContainer));
