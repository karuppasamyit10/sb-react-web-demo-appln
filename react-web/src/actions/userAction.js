import { ACTION_TYPES } from "../utils/Constants";
import _ from "lodash";
import store from "store";
import { axiosCommonInstance, axiosCommon } from "../utils/client";
import { clearNotifications } from "react-notification-system";
import URL from "../utils/URL";
import { myLog } from "../utils/Utility";
import Client from "../utils/client";

export function logInUser(username, password, callBack) {
  const bodyFormData = new FormData();
  bodyFormData.set("grant_type", "password");
  bodyFormData.set("username", username);
  bodyFormData.set("password", password);
  return function(dispatch) {
    const config = {
      method: "POST",
      headers: {
        Authorization: "Basic c2ItZGVtbzpzYi1kZW1vLXNlY3JldA==",
        "Content-Type": "multipart/form-data"
      },
      url: URL.OATHU,
      data: bodyFormData
    };
    myLog("input", config);
    axiosCommon(config)
      .then(response => {
        console.log("====logInUser response===::::", response);
        let t = new Date();
        const expiryTime = t.setSeconds(t.getSeconds() + 100000);
        const expiryObj = { expiry_time: expiryTime };
        // add expiry time to result object
        _.assign(response.data, expiryObj);
        store.set("userSession", response.data);
        if (
          response.data &&
          response.data.refresh_token &&
          response.data.expires_in
        ) {
          store.set(
            "expiryTime",
            Client.tokenExpires(response.data.expires_in)
          );
        }

        dispatch({
          type: ACTION_TYPES.LOGIN_USER,
          payload: response.data
        });
        callBack(response.data);
        console.log("====test===::::", response);
      })
      .catch(error => {
        console.log(error);
        console.log("====logInUser error===????", error);
        callBack(false);
      });
  };
}

export function logout(callback) {
  return function(dispatch) {
    Client.get(URL.LOGOUT, null, true)
      .then(response => {
        store.clearAll();
        myLog("====logout response===::::", response);
        callback(response);
        dispatch({
          type: ACTION_TYPES.LOGOUT_USER,
          payload: null
        });
      })
      .catch(error => {
        myLog("====logout error===????", error);
      });
  };
}

export function registerCookie(callback) {
  Client.get(URL.COOKIE, null, true)
    .then(response => {
      console.log(response, "cooooooooooooooookie");
      myLog("====register cookie response===::::", response);
      callback(response);
    })
    .catch(error => {
      myLog("====register cookie response===????", error);
    });
}

export function userRegistration(object, callback) {
  return function(dispatch) {
    Client.post(URL.REGISTRATION, object, true)
      .then(response => {
        myLog("====registration response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====registration error===????", error);
      });
  };
}

export function productRegistration(object, callback) {
  return function(dispatch) {
    Client.formDataPost(URL.PRODUCT_REGISTRATION, object, true)
      .then(response => {
        myLog("====registration response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====registration error===????", error);
      });
  };
}

export function getCommonDetails(callback) {
  Client.get(URL.COMMON, null, false)
    .then(response => {
      console.log(response, "comon");
      if (response && response.response_code === 0) {
        let userSession = store.get("userSession");
        userSession.common = response.response;
        store.set("userSession", userSession);
      }
      myLog("====get common response===::::", response);
      callback(response);
    })
    .catch(error => {
      myLog("====get common error response===????", error);
    });
}

export function changeUploadStaus(value) {
  console.log(value);
  return function(dispatch) {
    dispatch({
      type: ACTION_TYPES.CHANGE_UPLOADING_STATUS,
      payload: value
    });
  };
}
