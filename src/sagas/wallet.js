import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,
  fetchWalletSuccess,
  fetchBtcRequest
} from "../actions/currency";
import { takeLatest, put, call } from "redux-saga/effects";
import { sellCurrency, buyCurrency, getWallet } from "../api";

export function* sellCurrencyFlow(action) {
  try {
    if (action.type === sellCurrencyRequest.toString()) {
      const response = yield call(
        sellCurrency,
        action.payload.currency,
        action.payload.value
      );
      yield put(sellCurrencySuccess(response.data));
    } else {
      const response = yield call(getWallet);
      yield put(fetchWalletSuccess(response.data.result));
    }
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}

export function* buyCurrencyFlow(action) {
  try {
    if (action.type === buyCurrencyRequest.toString()) {
      const response = yield call(
        buyCurrency,
        action.payload.currency,
        action.payload.value
      );
      yield put(buyCurrencySuccess(response.data));
    } else {
      const response = yield call(getWallet);
      yield put(fetchWalletSuccess(response.data.result));
    }
  } catch (error) {
    yield put(buyCurrencyFailure(error));
  }
}

export function* sellCurrencyWatch() {
  yield takeLatest([sellCurrencyRequest, fetchBtcRequest], sellCurrencyFlow);
}
export function* buyCurrencyWatch() {
  yield takeLatest([buyCurrencyRequest, fetchBtcRequest], buyCurrencyFlow);
}
