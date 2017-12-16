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
  selected,
  offset,
  btc,
  eth,
  isBtcLoading,
  isEthLoading
} from "../currency";

describe("Reducer currency =>", () => {
  describe("Action selectBtc =>", () => {
    it("Changes selected to 'btc' =>", () => {
      const next = selected("btc", { type: selectBtc.toString() });
      expect(next).toEqual("btc");
    });
  });
  describe("Action selectEth =>", () => {
    it("Changes selected to 'eth' =>", () => {
      const next = selected("btc", { type: selectEth.toString() });
      expect(next).toEqual("eth");
    });
  });
  describe("Action selectOffset =>", () => {
    it("Set action.payload to offset =>", () => {
      const next = offset("4h", {
        type: selectOffset.toString(),
        payload: "8h"
      });
      expect(next).toEqual("8h");
    });
  });
  describe("Action fetchBtcRequest =>", () => {
    const action = fetchBtcRequest.toString();
    it("Cleares btc data =>", () => {
      const next = btc([], { type: action });
      expect(next).toEqual([]);
    });
    it("Changes the flag isBtcLoading  =>", () => {
      const next = isBtcLoading(false, { type: action });
      expect(next).toBeTruthy();
    });
  });
  describe("Action fetchBtcSuccess =>", () => {
    const action = fetchBtcSuccess.toString();
    it("Set data to btc =>", () => {
      const next = btc([], { type: action, payload: "data" });
      expect(next).toEqual("data");
    });
    it("Changes the flag isBtcLoading =>", () => {
      const next = isBtcLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
  });
  describe("Action fetchBtcFailure =>", () => {
    const action = fetchBtcFailure.toString();
    it("Set error to btc =>", () => {
      const error = new Error("Some error");
      const next = btc([], { type: action, error: error });
      expect(next).toEqual(error);
    });
    it("Changes the flag isBtcLoading =>", () => {
      const next = isBtcLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
  });

  describe("Action fetchEthRequest =>", () => {
    const action = fetchEthRequest.toString();
    it("Cleares eth data =>", () => {
      const next = eth([], { type: action });
      expect(next).toEqual([]);
    });
    it("Changes the flag isEthLoading  =>", () => {
      const next = isEthLoading(false, { type: action });
      expect(next).toBeTruthy();
    });
  });
  describe("Action fetchEthSuccess =>", () => {
    const action = fetchEthSuccess.toString();
    it("Set data to eth =>", () => {
      const next = eth([], { type: action, payload: "data" });
      expect(next).toEqual("data");
    });
    it("Changes the flag isEthLoading =>", () => {
      const next = isEthLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
  });
  describe("Action fetchEthFailure =>", () => {
    const action = fetchEthFailure.toString();
    it("Set error to eth =>", () => {
      const error = new Error("Some error");
      const next = eth([], { type: action, error: error });
      expect(next).toEqual(error);
    });
    it("Changes the flag isEthLoading =>", () => {
      const next = isEthLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
  });
});
