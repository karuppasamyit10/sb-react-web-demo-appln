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

class savedSearch extends Component {
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
      total: 0
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
    }
    this.props.deleteSavedSearch(data, response => {
      console.log(response);
      if(response && response.response_code === 0){
        this.props.showNotification("deleted successfully","success");
        this.getSavedSearchList();
      }
      else{
        this.props.showNotification(response.response_message,'error');
      }
    });
  };

  searchDetails = (vehicleId) => {
    this.props.history.push({
      pathname: PATH.SEARCH_DETAIL,
      state: {
        vehicleId: vehicleId
      }
    });
  };

  render() {
    const { savedSearchList } = this.state;
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
                  Saved Search
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
                  <div class="slhead text-center medium head3">My Account</div>
                  <ul class="sllinks medium">
                    <li class="active">
                      <a href="saved-search.html">
                        Saved Searches{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Saved Listings{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Financing
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Inbox
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9 form-wrap">
                <h1 class="form-header">Saved Searches</h1>
                <p class="lead">List of saved searches.</p>
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
                          {savedSearchList && savedSearchList.length
                            ? savedSearchList.map((list, index) => {
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
                                          onClick={()=>{
                                            this.searchDetails(list.vehicleId)
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
                            : <tr className="text-center">
                              <td colspan="12">No items found</td>
                            </tr>}
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

export default AppWrapper(savedSearch, null, mapDispatchToProps);
