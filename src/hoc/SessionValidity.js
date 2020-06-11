import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/index";
import { sessionState } from "../utils/sessionManager";
import { history } from "../utils/history";
export default WrappedComponent => {
  const SessionValidity = props => {
    console.log("Props in sessinValidity... ", JSON.stringify(props));
    const { onLogout } = props;
    useEffect(() => {
      async function checkSession() {
        if (!(await sessionState())) {
          onLogout();
        } else {
          history.push(props.history.location.pathname);
        }
      }
      checkSession();
    }, [onLogout]);
    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };

  const mapDispatchToProps = dispatch => {
    return {
      onLogout: () => {
        dispatch(logout());
      }
    };
  };
  return connect(null, mapDispatchToProps)(SessionValidity);
};
