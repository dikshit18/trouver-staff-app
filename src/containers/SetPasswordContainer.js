import React, { useEffect } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { tokenValidity, setPassword } from "../store/actions/index";
import SetPassword from "../components/SetPassword";
import styled from "styled-components";
const Layout = styled.div`
  background: rgb(238, 174, 202);
  background: linear-gradient(
    90deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 0%,
    rgba(224, 229, 235, 1) 100%
  );
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const SetPasswordContainer = props => {
  const { onValidityHandler, onSetPasswordHandler } = props;

  const setPasswordHandler = ({ newPassword, confirmPassword }) => {
    if (newPassword === confirmPassword) {
      const params = new queryString.parse(props.history.location.search);
      if (params) {
        const { token } = params;
        onSetPasswordHandler(token, newPassword);
      }
    }
  };
  useEffect(() => {
    const params = new queryString.parse(props.history.location.search);
    if (params) {
      const { token } = params;
      onValidityHandler(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <SetPassword
        onSubmit={values => setPasswordHandler(values)}
        loading={props.loading}
      />
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.setPassword.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onValidityHandler: token => {
      dispatch(tokenValidity(token));
    },
    onSetPasswordHandler: (token, password) => {
      dispatch(setPassword({ token, password }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordContainer);
