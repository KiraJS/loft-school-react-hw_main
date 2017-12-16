import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationFailure
} from "../../actions/auth";

import { IsAuthorized, loginError, registationError } from "../auth";

describe("Reducer auth =>", () => {
  describe("Action authLoginRequest =>", () => {
    const request = authLoginRequest.toString();
    it("Changes the flag IsAuthorized =>", () => {
      const next = IsAuthorized(false, { type: request });
      expect(next).toEqual(false);
    });
    it("Changes the field loginError", () => {
      const next = loginError(null, { type: request });
      expect(next).toBeNull();
    });
    it("Changes the field registationError", () => {
      const next = registationError(null, { type: request });
      expect(next).toBeNull();
    });
  });
  describe("Action authLoginSuccess =>", () => {
    const request = authLoginSuccess.toString();
    it("Changes the flag IsAuthorized =>", () => {
      const next = IsAuthorized(false, { type: request });
      expect(next).toEqual(true);
    });
    it("Changes the field loginError", () => {
      const next = loginError(null, { type: request });
      expect(next).toBeNull();
    });
    it("Changes the field registationError", () => {
      const next = registationError(null, { type: request });
      expect(next).toBeNull();
    });
  });
  describe("Action authLoginFailure =>", () => {
    const request = authLoginFailure.toString();
    it("Changes the flag IsAuthorized =>", () => {
      const next = IsAuthorized(false, { type: request });
      expect(next).toEqual(false);
    });
    it("Set data to loginError =>", () => {
      const next = loginError(null, {
        type: request,
        payload: "login error"
      });
      expect(next).toEqual("login error");
    });
    it("Сleares the field registationError", () => {
      const next = registationError(null, { type: request });
      expect(next).toBeNull();
    });
  });
  describe("Action authRegistrationRequest =>", () => {
    const request = authRegistrationRequest.toString();
    it("Changes the flag IsAuthorized =>", () => {
      const next = IsAuthorized(false, { type: request });
      expect(next).toEqual(false);
    });
    it("Cleares the field loginError =>", () => {
      const next = loginError(null, { type: request });
      expect(next).toBeNull();
    });
    it("Cleares the field registationError", () => {
      const next = registationError(null, {
        type: request
      });
      expect(next).toBeNull();
    });
  });
  describe("Action authRegistrationFailure =>", () => {
    const request = authRegistrationFailure.toString();
    it("Changes the flag IsAuthorized =>", () => {
      const next = IsAuthorized(false, { type: request });
      expect(next).toEqual(false);
    });
    it("Changes the field loginError =>", () => {
      const next = loginError(null, { type: request });
      expect(next).toBeNull();
    });
    it("Set data to registationError", () => {
      const next = registationError(null, {
        type: request,
        payload: "registration error"
      });
      expect(next).toEqual("registration error");
    });
  });
});
