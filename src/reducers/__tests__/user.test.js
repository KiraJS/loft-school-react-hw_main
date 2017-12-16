import {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure
} from "../../actions/auth";
import { isLoading, data, error } from "../user";

describe("Reducer user =>", () => {
  describe("Action userInfoRequest =>", () => {
    const action = userInfoRequest.toString();
    it("Changes the flag isLoading =>", () => {
      const next = isLoading(false, { type: action });
      expect(next).toBeTruthy();
    });
    it("Cleares the error field =>", () => {
      const next = error(null, { type: action });
      expect(next).toBeNull();
    });
  });
  describe("Action userInfoSuccess =>", () => {
    const action = userInfoSuccess.toString();
    it("Changes the flag isLoading =>", () => {
      const next = isLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
    it("Set data to data =>", () => {
      const next = data(null, { type: action, payload: "test" });
      expect(next).toEqual("test");
    });
    it("Cleares error field=>", () => {
      const next = error(null, { type: action });
      expect(next).toBeNull();
    });
  });
  describe("Action userInfoFailure =>", () => {
    const action = userInfoFailure.toString();
    it("Changes the flag isLoading =>", () => {
      const next = isLoading(false, { type: action });
      expect(next).toBeFalsy();
    });
    it("Set data error data =>", () => {
      const next = error(null, {
        type: action,
        payload: { error: "Some error" }
      });
      expect(next).toEqual("Some error");
    });
  });
});
