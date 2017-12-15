import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import MainPrivatePage from "../MainPrivatePage/MainPrivatePage";
import "semantic-ui-css/semantic.min.css";
import "./AppRouter.css";
import { getIsAuthorized } from "../../reducers/auth";
import { connect } from "react-redux";

export class AppRouter extends Component {
  state = {};
  render() {
    const { isAuthorized } = this.props;
    return (
      <div className="App">
        <Switch>
          <MainPrivatePage exact component={MainPrivatePage} />
          {isAuthorized ? <Redirect to="/trade" /> : null}
          <Route path="/" exact component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});
export default connect(mapStateToProps, null)(AppRouter);
