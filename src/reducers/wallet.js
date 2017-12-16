import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,
  fetchWalletSuccess
} from "../actions/currency";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

export const isLoading = handleActions(
  {
    [sellCurrencyRequest]: () => true,
    [sellCurrencySuccess]: () => false,
    [sellCurrencyFailure]: () => false
  },
  false
);

export const btc = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.btc,
    [sellCurrencySuccess]: (state, action) => action.payload.btc,
    [buyCurrencySuccess]: (state, action) => action.payload.btc
  },
  0
);
export const eth = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.eth,
    [sellCurrencySuccess]: (state, action) => action.payload.eth,
    [buyCurrencySuccess]: (state, action) => action.payload.eth
  },
  0
);
export const usd = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.usd,
    [sellCurrencySuccess]: (state, action) => action.payload.usd,
    [buyCurrencySuccess]: (state, action) => action.payload.usd
  },
  0
);
export const error = handleActions(
  {
    [sellCurrencyRequest]: () => null,
    [sellCurrencySuccess]: () => null,
    [sellCurrencyFailure]: (state, action) => action.payload.error,
    [buyCurrencyRequest]: () => null,
    [buyCurrencySuccess]: () => null,
    [buyCurrencyFailure]: (state, action) => action.payload.error
  },
  null
);
const coins = combineReducers({
  usd,
  btc,
  eth
});
export default combineReducers({
  isLoading,
  coins,
  error
});
export const getCoins = state => state.wallet.coins;
