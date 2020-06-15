import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Router } from "react-router-dom";
import AuthContainer from "./containers/AuthContainer";
import SetPasswordContainer from "./containers/SetPasswordContainer";
import ProtectedRoute from "./hoc/ProtectedRoute";
import MenuContainer from "./containers/MenuContainer";
import { history } from "./utils/history";
import OrderContainer from "./containers/OrderContainer";

function App(props) {
  return (
    <div className="App">
      <Router history={history}>
        <Route exact path="/" component={AuthContainer} />
        <ProtectedRoute
          path="/dashboard"
          component={MenuContainer}
          isLogin={props.isLogin}
        />
        <ProtectedRoute
          path="/orders/:orderId"
          component={OrderContainer}
          isLogin={props.isLogin}
        />
        <Route exact path="/setpassword" component={SetPasswordContainer} />
      </Router>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin
  };
};
export default connect(mapStateToProps)(App);
