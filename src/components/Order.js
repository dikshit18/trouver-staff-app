import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { login } from "../store/actions/index";
import SessionValidityHOC from "../hoc/SessionValidity";
import SideKick from "./SideKick";
const { Header, Content, Footer } = Layout;

const Order = props => {
  return (
    <Layout>
      <SideKick logout={props.logout} submit={props.submit} />
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(SessionValidityHOC(Order));
