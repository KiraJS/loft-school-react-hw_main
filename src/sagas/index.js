import { fork } from "redux-saga/effects";
import { authFlow } from "./auth";
import { currencyWatch, fetchBtcWatch, fetchEthWatch } from "./currency";
import { sellCurrencyWatch, buyCurrencyWatch } from "./wallet";
import { userInfoWatch } from "./user";

export default function*() {
  yield fork(authFlow);
  yield fork(currencyWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(sellCurrencyWatch);
  yield fork(buyCurrencyWatch);
  yield fork(userInfoWatch);
}
