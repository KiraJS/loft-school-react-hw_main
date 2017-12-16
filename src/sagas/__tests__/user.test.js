import {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure
} from "../../actions/auth";
import { takeLatest, put, call } from "redux-saga/effects";
import { userInfoFetch, userInfoWatch } from "../user";
import { getUserInfo } from "../../api";

describe("Saga user =>", () => {
  describe("Saga userInfoWatch =>", () => {
    const saga = userInfoWatch();
    it("Effect takeLatest =>", () => {
      expect(saga.next().value).toEqual(
        takeLatest(userInfoRequest, userInfoFetch)
      );
    });
  });
  describe("Saga userInfoFetch =>", () => {
    const action = userInfoRequest();
    const saga = userInfoFetch(action);
    it("Effect call getUserInfo =>", () => {
      expect(saga.next(action).value).toEqual(call(getUserInfo));
    });
    it("Effect put userInfoSuccess =>", () => {
      const response = {
        data: {
          result: "test"
        }
      };
      expect(saga.next(response).value).toEqual(
        put(userInfoSuccess(response.data.result))
      );
    });
    it("error => Effect userInfoFailure ", () => {
      const error = new Error("Some error");
      expect(saga.throw(error).value).toEqual(put(userInfoFailure(error)));
    });
  });
});
