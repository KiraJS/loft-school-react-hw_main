import {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure
} from "../actions/auth";
import { takeLatest, put, call } from "redux-saga/effects";
import { getUserInfo } from "../api";

export function* userInfoFetch(action) {
  try {
    const response = yield call(getUserInfo);
    yield put(userInfoSuccess(response.data.result));
  } catch (error) {
    yield put(userInfoFailure(error));
  }
}

export function* userInfoWatch() {
  yield takeLatest(userInfoRequest, userInfoFetch);
}
