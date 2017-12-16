import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../reducers/auth";
export class PrivateRoute extends PureComponent {
  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthorized } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthorized ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});
export default connect(mapStateToProps, null)(PrivateRoute);
