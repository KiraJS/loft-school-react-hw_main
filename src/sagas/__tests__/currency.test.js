import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call
} from "redux-saga/effects";
import { delay } from "redux-saga";
import { authLoginSuccess, logout } from "../../actions/auth";
import { getOffset } from "../../reducers/currency";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from "../../actions/currency";
import {
  currencyWatch,
  fetchBtcWatch,
  fetchEthWatch,
  fetchCurrencyFlow,
  fetchBtcFlow,
  fetchEthFlow
} from "../currency";
import { candles } from "../../api";
import { createMockTask } from "redux-saga/utils";
describe("Flow саг currency =>", () => {
  describe("Saga currencyWatch =>", () => {
    const saga = currencyWatch();
    const mockTask = createMockTask();
    it("Get actions authLoginSuccesslogout,selectBtc,selectEth,selectOffset =>", () => {
      expect(saga.next({ type: authLoginSuccess.toString() }).value).toEqual(
        take([authLoginSuccess, logout, selectBtc, selectEth, selectOffset])
      );
    });
    it("For all actions but logout apply fork effect fetchCurrencyFlow=>", () => {
      expect(saga.next({ type: authLoginSuccess.toString() }).value).toEqual(
        fork(fetchCurrencyFlow)
      );
    });
    it("If action === logout, cancel job =>", () => {
      saga.next(mockTask);
      expect(saga.next({ type: logout.toString() }).value).toEqual(
        cancel(mockTask)
      );
    });
  });
  describe("Saga fetchCurrencyFlow =>", () => {
    const saga = fetchCurrencyFlow();
    const offset = "4h";
    it("Effect select getOffset", () => {
      expect(saga.next().value).toEqual(select(getOffset));
    });
    it("Effect put fetchBtcRequest =>", () => {
      expect(saga.next(offset).value).toEqual(put(fetchBtcRequest(offset)));
    });
    it("Effect put fetchEthRequest =>", () => {
      expect(saga.next(offset).value).toEqual(put(fetchEthRequest(offset)));
    });
    it("Effect delay =>", () => {
      expect(saga.next().value).toEqual(call(delay, 15000));
    });
  });
  describe("Saga fetchBtcWatch =>", () => {
    const saga = fetchBtcWatch();
    it("Effect takeLatest fetchBtcRequest =>", () => {
      expect(saga.next().value).toEqual(
        takeLatest(fetchBtcRequest, fetchBtcFlow)
      );
    });
  });
  describe("Saga fetchEthWatch =>", () => {
    const saga = fetchEthWatch();
    it("Effect takeLatest fetchBtcRequest =>", () => {
      expect(saga.next().value).toEqual(
        takeLatest(fetchEthRequest, fetchEthFlow)
      );
    });
  });
  describe("Saga fetchBtcFlow =>", () => {
    const action = fetchBtcRequest();
    const saga = fetchBtcFlow(action);
    const response = {
      data: {
        result: [{ sell: "1234" }, { sell: "5678" }]
      }
    };
    it("Effect call candles =>", () => {
      expect(saga.next().value).toEqual(call(candles, "btc", action.payload));
    });
    it("Effect put fetchBtcSuccess =>", () => {
      expect(saga.next(response).value).toEqual(
        put(fetchBtcSuccess(response.data.result))
      );
    });
    it("If Error => put fetchBtcFailure =>", () => {
      const error = new Error("Some error");
      expect(saga.throw(error).value).toEqual(put(fetchBtcFailure(error)));
    });
  });
  describe("Saga fetchEthFlow =>", () => {
    const action = fetchEthRequest();
    const saga = fetchEthFlow(action);
    const response = {
      data: {
        result: [{ sell: "1234" }, { sell: "5678" }]
      }
    };
    it("Effect call candles =>", () => {
      expect(saga.next().value).toEqual(call(candles, "eth", action.payload));
    });
    it("Effect put fetchBtcSuccess =>", () => {
      expect(saga.next(response).value).toEqual(
        put(fetchEthSuccess(response.data.result))
      );
    });
    it("If Error => put fetchBtcFailure =>", () => {
      const error = new Error("Some error");
      expect(saga.throw(error).value).toEqual(put(fetchEthFailure(error)));
    });
  });
});
