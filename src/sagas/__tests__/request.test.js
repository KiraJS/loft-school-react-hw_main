import { call, put } from "redux-saga/effects";
import {
  authLoginFailure,
  authRegistrationFailure,
  logout
} from "../../actions/auth";
import { login, registration } from "../../api";
import requestFlow from "../request";
const fn = jest.fn();
const args = "test_token";

describe("Saga request", () => {
  describe("Without errors", () => {
    const saga = requestFlow(fn, args);
    it("Effect call fn", () => {
      expect(saga.next().value).toEqual(call(fn, args));
    });
  });
  describe("If errors", () => {
    describe("Если fn === login", () => {
      const saga = requestFlow(login, args);
      const errors = {
        data: {
          message: "Some error message"
        },
        response: {
          status: 401
        }
      };
      it("Effect put authLoginFailure", () => {
        saga.next();
        expect(saga.throw(errors).value).toEqual(
          put(authLoginFailure(errors.data.message))
        );
      });
    });
  });
  describe("If fn === registration", () => {
    const saga = requestFlow(registration, args);
    const errors = {
      data: {
        message: {
          email: ["Some error message"]
        }
      },
      response: {
        status: 401
      }
    };
    it("Effect put authRegistrationFailure", () => {
      saga.next();
      expect(saga.throw(errors).value).toEqual(
        put(authRegistrationFailure(errors.data.message.email[0]))
      );
    });
  });
  describe("If error.response.status === 401", () => {
    const saga = requestFlow(fn, args);
    const errors = {
      data: {
        message: {
          email: ["Some error message"]
        }
      },
      response: {
        status: 401
      }
    };
    it("Effect put logout", () => {
      saga.next();
      expect(saga.throw(errors).value).toEqual(put(logout()));
    });
  });
});
