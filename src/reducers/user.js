import { handleAction, handleActions } from "redux-actions";
import {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure
} from "../actions/auth";
import { combineReducers } from "redux";

export const isLoading = handleActions(
  {
    [userInfoRequest]: () => true,
    [userInfoSuccess]: () => false,
    [userInfoFailure]: () => false
  },
  false
);

export const data = handleAction(
  userInfoSuccess,
  (state, action) => action.payload,
  null
);
export const error = handleActions(
  {
    [userInfoRequest]: () => null,
    [userInfoSuccess]: () => null,
    [userInfoFailure]: (state, action) => action.payload.error
  },
  null
);
export default combineReducers({
  isLoading,
  data,
  error
});

export const getIsLoading = state => state.user.isLoading;
export const getData = state => state.user.data;
