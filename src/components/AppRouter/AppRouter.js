import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AuthPage from "../AuthPage/AuthPage";
import MainPage from "../MainPage/MainPage";
import { getIsAuthorized } from "../../reducers/auth";
import { connect } from "react-redux";
import "./AppRouter.css";

export class AppRouter extends Component {
  state = {};
  render() {
    const { isAuthorized } = this.props;
    return (
      <div className="App">
        <Switch>
          <PrivateRoute path="/trade/:cur" component={MainPage} />
          {isAuthorized ? <Redirect to="/trade/btc" /> : null}
          <Route path="/" exact component={AuthPage} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});
export default withRouter(connect(mapStateToProps, null)(AppRouter));
