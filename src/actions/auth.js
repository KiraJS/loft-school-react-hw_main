import { createActions, createAction } from "redux-actions";

const actionCreators = createActions({
  AUTH: {
    LOGIN_REQUEST: undefined,
    LOGIN_SUCCESS: undefined,
    LOGIN_FAILURE: undefined,
    REGISTRATION_REQUEST: undefined,
    REGISTRATION_FAILURE: undefined
  },
  USER: {
    INFO_REQUEST: undefined,
    INFO_SUCCESS: undefined,
    INFO_FAILURE: undefined
  }
});
export const logout = createAction("LOGOUT");
export const authLoginRequest = actionCreators.auth.loginRequest;
export const authLoginSuccess = actionCreators.auth.loginSuccess;
export const authLoginFailure = actionCreators.auth.loginFailure;
export const authRegistrationRequest = actionCreators.auth.registrationRequest;
export const authRegistrationFailure = actionCreators.auth.registrationFailure;

export const userInfoRequest = actionCreators.user.infoRequest;
export const userInfoSuccess = actionCreators.user.infoSuccess;
export const userInfoFailure = actionCreators.user.infoFailure;
