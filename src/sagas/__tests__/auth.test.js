import {
  authLoginRequest,
  authLoginSuccess,
  authRegistrationRequest,
  logout
} from "../../actions/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../../localStorage";
import { take, put, call, select } from "redux-saga/effects";
import { getIsAuthorized } from "../../reducers/auth";
import { setTokenApi, clearTokenApi, login, registration } from "../../api";
import requestFlow from "../request";
import { authFlow } from "../auth";

describe("Saga authFlow", () => {
  describe("Without token in localStorage", () => {
    const saga = authFlow();
    it("Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });
    it("Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });
    it("Effect take, waiting authLoginRequest and authRegistrationRequest actions", () => {
      expect(saga.next().value).toEqual(
        take([authLoginRequest, authRegistrationRequest])
      );
    });
    it("Action.type === authLoginRequest => effect call login", () => {
      const action = {
        type: authLoginRequest.toString(),
        payload: { email: "test", password: 123 }
      };
      expect(saga.next(action).value).toEqual(
        call(requestFlow, login, action.payload)
      );
    });
    it("else call registration", () => {
      const saga2 = authFlow();
      saga2.next();
      saga2.next();
      saga2.next();
      const action = {
        type: authRegistrationRequest.toString(),
        payload: { email: "test2", password: 1234 }
      };
      expect(saga2.next(action).value).toEqual(
        call(requestFlow, registration, action.payload)
      );
    });
    it("Effect put authLoginSuccess", () => {
      const action = {
        type: "test",
        payload: { email: "test2", password: 1234 }
      };
      expect(saga.next(action).value).toEqual(put(authLoginSuccess()));
    });
    it("Effect call(setTokenApi, token)", () => {
      const action = {
        type: "test",
        payload: { email: "test2", password: 1234 }
      };
      expect(saga.next().value).toEqual(call(setTokenApi, action));
    });
    it("Effect call setTokenToLocalStorage", () => {
      const action = {
        type: "test",
        payload: { email: "test2", password: 1234 }
      };
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, action));
    });
    it("Effect take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });
    it("Effect call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });
    it("Effect call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });
});
