import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { showNotification } from "../../actions/NotificationAction";
import {
  getSavedSearchList,
  deleteSavedSearch
} from "../../actions/searchAction";
import UserList from "./userList";
import MyAccount from "./myAccount";
import ProductList from "./ProductList";
import WaitingApprovalList from "./waitingApproval";

class AdminActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedSearchList: [],
      limit: 5,
      todosPerPage: 5,
      offset: 1,
      isModelOpen: 0,
      pageNo: 1,
      itemsPerPage: 5,
      total: 0,
      activeTab: 0
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Saved Search";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.getSavedSearchList();
  }

  getSavedSearchList = () => {
    this.props.getSavedSearchList({}, response => {
      console.log(response);
      if (response && response.response_code === 0) {
        this.setState({ savedSearchList: response.response.savedSearchList });
      }
    });
  };

  deleteSavedSearch = (vehicleId, savedSearchId) => {
    let formData = new FormData();
    formData.append("vehicleId", vehicleId);
    formData.append("savedSearchId", savedSearchId);
    let data = {
      vehicleId: vehicleId,
      savedSearchId: savedSearchId
    };
    this.props.deleteSavedSearch(data, response => {
      console.log(response);
      if (response && response.response_code === 0) {
        this.props.showNotification("deleted successfully", "success");
        this.getSavedSearchList();
      } else {
        this.props.showNotification(response.response_message, "error");
      }
    });
  };

  searchDetails = vehicleId => {
    this.props.history.push({
      pathname: PATH.SEARCH_DETAIL,
      state: {
        vehicleId: vehicleId
      }
    });
  };

  onChangeActiveTab = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { savedSearchList, activeTab } = this.state;
    return (
      <React.Fragment>
        <section class="breadcrumb_wrap">
          <div class="container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to={PATH.DASHBOARD}>Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Admin Activity
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="register-wrap spacerTop">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="sidelinks">
                  <div
                    class="slhead text-center medium head3"
                    onClick={() => {
                      this.onChangeActiveTab(0);
                    }}
                  >
                    My Account
                  </div>
                  <ul class="sllinks medium">
                    <li class={activeTab === 1 ? "active" : ""}>
                      <a
                        href="#"
                        onClick={() => {
                          this.onChangeActiveTab(1);
                        }}
                      >
                        User List{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li class={activeTab === 2 ? "active" : ""}>
                      <a
                        href="#"
                        onClick={() => {
                          this.onChangeActiveTab(2);
                        }}
                      >
                        Waiting For Approval{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {}
              <div class="col-md-9 form-wrap">
                {activeTab === 0 ? (
                  <MyAccount />
                ) : activeTab === 1 ? (
                  <UserList />
                ) : activeTab === 2 ? (
                  <WaitingApprovalList />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSavedSearchList: (params, callback) => {
      dispatch(getSavedSearchList(params, callback));
    },
    deleteSavedSearch: (params, callback) => {
      dispatch(deleteSavedSearch(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default AppWrapper(AdminActivity, null, mapDispatchToProps);
