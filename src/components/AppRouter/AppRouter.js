import React, { Component } from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import "./AppRouter.css";

export class AppRouter extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default AppRouter
