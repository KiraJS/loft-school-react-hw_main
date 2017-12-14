import { call, put } from "redux-saga/effects";
import {
  authLoginFailure,
  authRegistrationFailure,
  logout
} from "../actions/auth";
import { login, registration } from "../api";


export default function*(fn, args) {
  try {
    const response = yield call(fn, args);
    return response;
  } catch (error) {
    if (fn === login) {
      yield put(authLoginFailure(error.data.message));
    } else if (fn === registration) {
      yield put(authRegistrationFailure(error.data.message.email[0]));
    }
    if (error.response.status === 401) yield put(logout());

    throw error;
  }
}
