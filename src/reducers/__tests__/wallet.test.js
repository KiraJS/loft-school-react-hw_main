import {
  sellCurrencyRequest,
  sellCurrencySuccess,
  buyCurrencySuccess,
  fetchWalletSuccess
} from "../../actions/currency";
import { isLoading, btc, eth, usd, error } from "../../reducers/wallet";

describe("Reducer wallet =>", () => {
  describe("Action sellCurrencyRequest =>", () => {
    const action = sellCurrencyRequest.toString();
    it("Changes the flag isLoading =>", () => {
      const next = isLoading(false, { type: action });
      expect(next).toBeTruthy();
    });
    it("Cleares error field =>", () => {
      const next = error(null, { type: action });
      expect(next).toBeNull();
    });
  });
  describe("Reducer coins", () => {
    describe("Action sellCurrencySuccess =>", () => {
      const action = sellCurrencySuccess.toString();
      it("Set data to btc =>", () => {
        const next = btc(0, { type: action, payload: { btc: 12 } });
        expect(next).toEqual(12);
      });
      it("Set data to eth =>", () => {
        const next = eth(0, { type: action, payload: { eth: 15 } });
        expect(next).toEqual(15);
      });
      it("Set data to usd =>", () => {
        const next = usd(0, { type: action, payload: { usd: 25000 } });
        expect(next).toEqual(25000);
      });
    });
    describe("Action fetchWalletSuccess =>", () => {
      const action = fetchWalletSuccess.toString();
      it("Set data to btc =>", () => {
        const next = btc(0, { type: action, payload: { btc: 12 } });
        expect(next).toEqual(12);
      });
      it("Set data to eth =>", () => {
        const next = eth(0, { type: action, payload: { eth: 15 } });
        expect(next).toEqual(15);
      });
      it("Set data to usd =>", () => {
        const next = usd(0, { type: action, payload: { usd: 25000 } });
        expect(next).toEqual(25000);
      });
    });
    describe("Action buyCurrencySuccess =>", () => {
      const action = buyCurrencySuccess.toString();
      it("Set data to btc =>", () => {
        const next = btc(0, { type: action, payload: { btc: 12 } });
        expect(next).toEqual(12);
      });
      it("Set data to eth =>", () => {
        const next = eth(0, { type: action, payload: { eth: 15 } });
        expect(next).toEqual(15);
      });
      it("Set data to usd =>", () => {
        const next = usd(0, { type: action, payload: { usd: 25000 } });
        expect(next).toEqual(25000);
      });
    });
  });
});
