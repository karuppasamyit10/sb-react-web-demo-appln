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
    Client.get(URL.GET_DASHBOARD_DATA, params, false)
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

export function getVehicleModelList(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_VEHICLE_MODEL, params, true)
      .then(response => {
        console.log(response);
        myLog("====get car model response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get car model response===????", error);
      });
  };
}

export function getVehicleDetailedModelList(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_VEHICLE_MODEL_DETAILS, params, true)
      .then(response => {
        console.log(response);
        myLog("====get vehicle detailed model response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get vehicle detailed model error ===????", error);
      });
  };
}

export function getVehicleSearchList(params, callback) {
  return function(dispatch) {
    Client.post(URL.GET_VEHICLE_SEARCH_LIST, params, true)
      .then(response => {
        console.log(response);
        myLog("====get car model response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get car model response===????", error);
      });
  };
}

export function getVehicleDetails(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_VEHICLE_DETAILS, params, true)
      .then(response => {
        console.log(response);
        myLog("====get car model response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get car model response===????", error);
      });
  };
}

export function getVehicleMasterData(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_VEHICLE_ALL_DETAILS, params, false)
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

export function getCategory2(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_VEHICLE_CATEGORY2S, params, true)
      .then(response => {
        console.log(response);
        myLog("====get category2 response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get category2 response===????", error);
      });
  };
}

export function getWaitingApprovalList(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_APPROVAL_LIST, params, true)
      .then(response => {
        console.log(response);
        myLog("====get approval list response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get approval list response===????", error);
      });
  };
}

export function getuserList(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_ADMIN_USER_LIST, params, true)
      .then(response => {
        console.log(response);
        myLog("====get user list response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get user list response===????", error);
      });
  };
}


export function changeMemberShip(params,callback){
  return function(dispatch) {
    Client.put(URL.CHANGE_MEMBERSHIP, params, true)
      .then(response => {
        console.log(response);
        myLog("====update membeship response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====update member ship response===????", error);
      });
  };
}

export function getSavedSearchList(params, callback) {
  return function(dispatch) {
    Client.get(URL.GET_SAVED_SEARCH, params, true)
      .then(response => {
        console.log(response);
        myLog("====get saved search list response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====get saved search list response===????", error);
      });
  };
}

export function addToSavedSearch(params, callback) {
  return function(dispatch) {
    Client.post(URL.ADD_TO_SAVED_SEARCH, params, true)
      .then(response => {
        console.log(response);
        myLog("====add to saved search response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====add to saved search response===????", error);
      });
  };
}

export function deleteSavedSearch(params, callback) {
  return function(dispatch) {
    Client.delete(URL.DELETE_SAVED_SEARCH, params, true)
      .then(response => {
        console.log(response);
        myLog("====delete saved search response===::::", response);
        callback(response);
      })
      .catch(error => {
        myLog("====delete saved search response===????", error);
      });
  };
}
