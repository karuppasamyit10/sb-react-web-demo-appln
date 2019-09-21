import { ACTION_TYPES } from "../utils/Constants";
import _ from "lodash";
import store from "store";
import { axiosCommonInstance, axiosCommon } from "../utils/client";
import { clearNotifications } from "react-notification-system";
import URL from "../utils/URL";
import { myLog } from "../utils/Utility";
import Client from "../utils/client";

export function getSearchResult(params, callback) {
  return function(dispatch) {
    Client.get(URL.ADVANCED_SEARCH, params, true)
      .then(response => {
        console.log(response);
        myLog("====advanced search response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====advanced search response===????", error);
      });
  };
}


export function getDashboardDetails(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_DASHBOARD_DATA, params, true)
      .then(response => {
        console.log(response);
        myLog("====get dashboard response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get dashboard response===????", error);
      });
  };
}

export function getMasterData(params, callback) {
  return function(dispatch) {
    Client.get(URL.CAR_MASTER_DATA, params, true)
      .then(response => {
        console.log(response);
        myLog("====car master response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====car master response===????", error);
      });
  };
}