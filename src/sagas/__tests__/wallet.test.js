import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,
  fetchWalletSuccess,
  fetchBtcRequest
} from "../../actions/currency";
import { takeLatest, put, call } from "redux-saga/effects";
import { sellCurrency, buyCurrency, getWallet } from "../../api";
import {
  sellCurrencyWatch,
  buyCurrencyWatch,
  sellCurrencyFlow,
  buyCurrencyFlow
} from "../wallet";

describe("Saga wallet =>", () => {
  describe("Saga sellCurrencyWatch =>", () => {
    const saga = sellCurrencyWatch();
    it("Effect takeLatest =>", () => {
      expect(saga.next().value).toEqual(
        takeLatest([sellCurrencyRequest, fetchBtcRequest], sellCurrencyFlow)
      );
    });
  });
  describe("Saga sellCurrencyFlow =>", () => {
    describe("If action sellCurrencyRequest =>", () => {
      const action = {
        type: sellCurrencyRequest.toString(),
        payload: {
          currency: "eth",
          value: 10
        }
      };
      const saga = sellCurrencyFlow(action);
      it("Effect call sellCurrency =>", () => {
        expect(saga.next(action).value).toEqual(
          call(sellCurrency, action.payload.currency, action.payload.value)
        );
      });
      it("Effect put =>", () => {
        const response = {
          data: {
            value: "test"
          }
        };
        expect(saga.next(response).value).toEqual(
          put(sellCurrencySuccess(response.data))
        );
      });
    });
    describe("If action fetchBtcRequest =>", () => {
      const action = {
        type: fetchBtcRequest.toString(),
        payload: {
          currency: "btc",
          value: 10
        }
      };
      const saga = sellCurrencyFlow(action);
      it("Effect call getWallet =>", () => {
        expect(saga.next(action).value).toEqual(call(getWallet));
      });
      it("Effect put fetchWalletSuccess =>", () => {
        const response = {
          data: {
            result: "test"
          }
        };
        expect(saga.next(response).value).toEqual(
          put(fetchWalletSuccess(response.data.result))
        );
      });
      it("Error =>", () => {
        const error = new Error("Some error");
        expect(saga.throw(error).value).toEqual(
          put(sellCurrencyFailure(error))
        );
      });
    });
  });
  describe("Saga buyCurrencyWatch =>", () => {
    const saga = buyCurrencyWatch();
    it("Effect takeLatest =>", () => {
      expect(saga.next().value).toEqual(
        takeLatest([buyCurrencyRequest, fetchBtcRequest], buyCurrencyFlow)
      );
    });
  });
  describe("Action buyCurrencyRequest =>", () => {
    const action = {
      type: buyCurrencyRequest.toString(),
      payload: {
        currency: "eth",
        value: 10
      }
    };
    const saga = buyCurrencyFlow(action);
    it("Effect  call buyCurrency =>", () => {
      expect(saga.next(action).value).toEqual(
        call(buyCurrency, action.payload.currency, action.payload.value)
      );
    });
    it("Effect put =>", () => {
      const response = {
        data: {
          value: "test"
        }
      };
      expect(saga.next(response).value).toEqual(
        put(buyCurrencySuccess(response.data))
      );
    });
  });
  describe("Action fetchBtcRequest =>", () => {
    const action = {
      type: fetchBtcRequest.toString(),
      payload: {
        currency: "btc",
        value: 10
      }
    };
    const saga = buyCurrencyFlow(action);
    it("Effect call getWallet =>", () => {
      expect(saga.next(action).value).toEqual(call(getWallet));
    });
    it("Effect put fetchWalletSuccess =>", () => {
      const response = {
        data: {
          result: "test"
        }
      };
      expect(saga.next(response).value).toEqual(
        put(fetchWalletSuccess(response.data.result))
      );
    });
    it("Error =>", () => {
      const error = new Error("Some error");
      expect(saga.throw(error).value).toEqual(put(buyCurrencyFailure(error)));
    });
  });
});
