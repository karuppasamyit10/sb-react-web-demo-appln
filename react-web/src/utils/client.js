import URL from "./URL";
import axios from "axios";
import store from "store";
import Constants from "./Constants";
import { myLog } from "./Utility";

export const axiosCommonInstance = axios.create({
  baseURL: URL.BASE_URL
});
export const axiosCommon = axios.create({
  baseURL: URL.BASE_URL
});

// axiosCommonInstance.interceptors.request.use(
//   function(config) {
//     let originalRequest = config;
//     let userSession = store.get("userSession");
//     if (Client.isTokenExpired()) {
//       console.log("access token expired , refersh token called");
//       let data = {
//         refresh_token: userSession.refresh_token,
//         grant_type: "refresh_token"
//       };
//       return Client.refresh_token(URL.OATHU, data)
//         .then(response => {
//           store.set("userSession", response);
//           if (response && response.refresh_token && response.expires_in) {
//             store.set("expiryTime", Client.tokenExpires(response.expires_in));
//           }
//           originalRequest["Authorization"] = "Bearer " + response.access_token;
//           return originalRequest;
//         })
//         .catch(err => {
//           window.location.replace("/");
//         });
//     }
//     return config;
//   },
//   function(err) {
//     return Promise.reject(err);
//   }
// );

// axiosCommonInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   function(error) {
//     if (error.response.status === 401) {
//       myLog("Access token expired && calling refresh token ...");
//       let userSession = store.get("userSession");
//       let data = {
//         refresh_token: userSession.refresh_token,
//         grant_type: "refresh_token"
//       };
//       return Client.refresh_token(URL.OATHU, data)
//         .then(token_response => {
//           store.set("userSession", token_response);
//           if (
//             token_response &&
//             token_response.refresh_token &&
//             token_response.expires_in
//           ) {
//             store.set(
//               "expiryTime",
//               Client.tokenExpires(token_response.expires_in)
//             );
//           }
//           error.config.headers["Authorization"] =
//             token_response.token_type + " " + token_response.access_token;
//           return Promise.resolve(axiosCommonInstance(error.config));
//         })
//         .catch(err => {
//           myLog("Refresh Token Error", err);
//           window.location.replace("/");
//         });
//     }
//     return Promise.reject(error.response);
//   }
// );

export default class Client {
  static httpHeader(isAccessToken, contentType) {
    let d = new Date();
    let headers = {};
    headers = {
      "Content-Type": contentType ? contentType : "application/json",
      offset: d.getTimezoneOffset()
    };
    if (isAccessToken) {
      headers = {
        "Content-Type": contentType ? contentType : "application/json",
        offset: d.getTimezoneOffset(),
        Authorization:
          typeof store.get("userSession") === "object"
            ? `${store.get("userSession").token_type} ${
                store.get("userSession").access_token
              }`
            : ""
      };
    }
    return headers;
  }

  static isRefreshToken() {
    let refresh_token;
    let userSession = store.get("userSession");
    if (userSession) {
      if (userSession.refresh_token) {
        refresh_token = userSession.refresh_token;
      }
    }
    return refresh_token;
  }

  static isTokenExpired() {
    let expiryTime = store.get("expiryTime");
    if (Date.now() > expiryTime - 120 * 1000 || Date.now() > expiryTime) {
      return true;
    } else {
      return false;
    }
  }

  static tokenExpires(tokenExpires) {
    let minutes = Date.now() + tokenExpires * 1000;
    console.log("min", minutes);
    return minutes;
  }

  static refresh_token(url, data) {
    return new Promise(function(success, failed) {
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic Y29udHJvbGNlbnRlcjpjb250cm9sY2VudGVy",
          "Content-Type": "application/json"
        },
        url: url,
        data: data
      };
      axiosCommon(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("POST ::::::: response", response);
          success(response);
        })
        .catch(err => {
          myLog("POST ::::::: err", err);
          failed(err);
        });
    });
  }

  static get(url, params, isAccessToken) {
    return new Promise(function(success, failed) {
      const config = {
        method: "GET",
        url,
        params,
        headers: Client.httpHeader(isAccessToken)
      };

      myLog("GET ::::::: INPUT", config);
      axiosCommonInstance(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("GET ::::::: response", response);
          success(response);
        })
        .catch(err => {
          myLog("GET ::::::: err", err);
          failed(err);
        });
    });
  }

  static post(url, data, isAccessToken) {
    return new Promise(function(success, failed) {
      const config = {
        method: "POST",
        url,
        data,
        headers: Client.httpHeader(isAccessToken)
      };
      myLog("POST ::::: Input", config);
      axiosCommonInstance(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("POST ::::::: response", response);
          success(response);
        })
        .catch(err => {
          myLog("POST ::::::: err", err);
          failed(err);
        });
    });
  }

  static formDataPost(url, data, isAccessToken) {
    return new Promise(function(success, failed) {
      const config = {
        method: "POST",
        url,
        data,
        headers: Client.httpHeader(isAccessToken,"multipart/form-data")
      };
      myLog("POST ::::: Input", config);
      axiosCommonInstance(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("POST ::::::: response", response);
          success(response);
        })
        .catch(err => {
          myLog("POST ::::::: err", err);
          failed(err);
        });
    });
  }

  static delete(url, data, isAccessToken) {
    return new Promise(function(success, failed) {
      const config = {
        method: "DELETE",
        url,
        params : data,
        headers: Client.httpHeader(isAccessToken)
      };
      myLog("DELETE ::::: Input", config);
      axiosCommonInstance(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("POST ::::::: response", response);
          success(response);
        })
        .catch(err => {
          myLog("POST ::::::: err", err);
          failed(err);
        });
    });
  }

  static put(url, data, isAccessToken) {
    return new Promise(function(success, failed) {
      const config = {
        method: "PUT",
        url,
        data,
        headers: Client.httpHeader(isAccessToken)
      };
      myLog("PUT ::::::: INPUT", config);
      axiosCommonInstance(config)
        .then(response => {
          try {
            if (
              response.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
              response.status === Constants.HTTP_CODE.REQUIRED_MISSING
            ) {
              throw Object({
                name: response.status,
                message: Constants.VALIDATION_MSG.AUTH_FAILED
              });
            }
            if (response.status === Constants.HTTP_CODE.SUCCESS) {
              try {
                return response.data;
              } catch (e) {
                throw Object({
                  name: response.status,
                  message: Constants.VALIDATION_MSG.REQ_FAILED
                });
              }
            }
          } catch (e) {
            throw Object({
              name: response.status,
              message: Constants.VALIDATION_MSG.REQ_FAILED
            });
          }
        })
        .then(response => {
          myLog("PUT ::::::: resounse", response);
          success(response);
        })
        .catch(err => {
          myLog("PUT ::::::: err", err);
          failed(err);
        });
    });
  }
}
