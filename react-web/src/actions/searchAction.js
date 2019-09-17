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
