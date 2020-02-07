import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showNotification } from "../../actions/NotificationAction";
import { getWaitingApprovalList, deleteSavedSearch } from "../../actions/searchAction";

class waitingApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      limit: 5,
      todosPerPage: 5,
      offset: 1,
      isModelOpen: 0,
      pageNo: 1,
      itemsPerPage: 5,
      total: 0,
      search: ""
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
    this.getApprovalList();
  }

  getApprovalList = () => {
    const { search, pageNo, itemsPerPage } = this.state;
    const params = {
      pageNo,
      itemsPerPage
    };
    this.props.getWaitingApprovalList(params, response => {
      console.log(response);
      if (response && response.response_code === 0) {
        this.setState({ userList: response.response.userList });
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
        this.getuserList();
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

  render() {
    const { userList } = this.state;
    return (
      <React.Fragment>
        <section class="">
          <div class="container">
            <div class="row">
              <div class="col-md-9 form-wrap">
                <h1 class="form-header">PENDING APPROVAL List</h1>
                <p class="lead">List of pending approvals.</p>
                <div class="row no-gutters">
                  <div class="col-12">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Car Model</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userList && userList.length ? (
                            userList.map((list, index) => {
                              return (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {list.vehicleName ? list.vehicleName : ""}
                                  </td>
                                  <td>
                                    357 Great Deals out of 7,942 listings
                                    starting at $1,100
                                  </td>
                                  <td>USD 970</td>
                                  <td>
                                    <div
                                      class="btn-group"
                                      role="group"
                                      aria-label="Basic example"
                                    >
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={() => {
                                          this.searchDetails(list.vehicleId);
                                        }}
                                      >
                                        View
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-danger"
                                        onClick={() => {
                                          this.deleteSavedSearch(
                                            list.vehicleId,
                                            list.savedSearchId
                                          );
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="text-center">
                              <td colspan="12">No items found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
    getWaitingApprovalList: (params, callback) => {
      dispatch(getWaitingApprovalList(params, callback));
    },
    deleteSavedSearch: (params, callback) => {
      dispatch(deleteSavedSearch(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};
export default connect(null, mapDispatchToProps)(waitingApproval);
