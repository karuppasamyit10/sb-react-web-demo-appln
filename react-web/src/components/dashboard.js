/*************************************************
 *
 * @exports
 * @class Upload.js
 * @extends Component
 * @author Ramkumar
 * @copyright © 2019. All rights reserved.
 *************************************************/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "./public/AppWrapper";
import store from "store";
import { formatDate } from "../utils/utils";
import { PATH } from "../utils/Constants";
import Background1 from "../assets/img/ssangyong.jpg";
import Background2 from "../assets/img/hyundai.jpg";
import Background3 from "../assets/img/kia.jpg";
import {
  getDashboardDetails,
  getVehicleMasterData,
  getVehicleModelList
} from "../actions/searchAction";
import { showNotification } from "../actions/NotificationAction";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import "./public/i18nxt";
import { useTranslation, withTranslation } from "react-i18next";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      dashboardDetails: {},
      masterData: {},
      brandId: null,
      modelId: null,
      brandName: null,
      modelName: null,
      country: null,
      modelList: [],
      modelisDisable: true,
      brandObject: {},
      modelObject: {},
      vehicleTypeId: 1,
      isLoading: false,
      fromPriceList: [],
      toPriceList: [],
      fromPrice: null,
      toPrice: null
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Dashboard";
    let cookieData = Cookies.get();
    console.log(cookieData);
    this.getDashboardDetails();
    this.getVehicleMasterData();
  }

  getDashboardDetails = () => {
    this.setState({ isLoading: true });
    this.props.getDashboardDetails({}, response => {
      console.log(response);
      this.setState({ isLoading: false });
      if (response.response_code === 0) {
        this.setState({ dashboardDetails: response.response });
      }
    });
  };

  getVehicleMasterDataByVehicleTypeId = vehicleTypeId => {
    this.getVehicleMasterData(vehicleTypeId);
    this.setState({ vehicleTypeId: vehicleTypeId });
  };

  onChangeCountry = event => {
    this.setState({ country: event.target.value });
  };

  onChangeFromPrice = event => {
    this.setState({ fromPrice: event.target.value });
  };

  onChangeToPrice = event => {
    this.setState({ toPrice: event.target.value });
  };

  onChangeBrand = event => {
    let found = this.state.masterData.brandList.find(brand => {
      return brand.brand === event.target.value;
    });
    let brandId = null;
    if (found) {
      brandId = found.brandId;
    }
    this.setState({ brand: event.target.value, brandId: brandId });
    if (brandId) {
      this.getVehicleModelList(brandId);
    }
  };

  onChangeModel = event => {
    let found = this.state.modelList.find(model => {
      return model.model === event.target.value;
    });
    let modelId = null;
    if (found) {
      modelId = found.modelId;
    }
    this.setState({ modelName: event.target.value, modelId: modelId }, () => {
      console.log(this.state.modelName);
    });
  };

  getVehicleMasterData = vehicleTypeId => {
    this.props.getVehicleMasterData({ vehicleTypeId }, response => {
      if (response.response_code === 0) {
        this.setState({ masterData: response.response }, () => {
          const { priceList } = this.state.masterData;
          this.setState({ fromPriceList: priceList, toPriceList: priceList });
        });
      }
    });
  };

  getVehicleModelList = brandId => {
    this.setState({ isLoading: true });
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      this.setState({ isLoading: false });
      if (response.response_code === 0) {
        this.setState({ modelList: response.response.modelList });
        this.setState({ modelisDisable: false });
      }
    });
  };

  onChangeDropDown = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "fromPrice") {
      let toPriceList = this.state.fromPriceList;
      let filteredArray = toPriceList.filter(
        price => parseInt(price.price) > parseInt(e.target.value)
      );
      this.setState({ toPriceList: filteredArray });
    }
  };

  handleSearch = () => {
    const {
      brand,
      modelName,
      country,
      brandId,
      modelId,
      vehicleTypeId
    } = this.state;
    this.props.history.push({
      pathname: PATH.ADVANCED_SEARCH,
      state: {
        brandName: brand,
        brandId: brandId,
        modelId: modelId,
        modelName: modelName,
        country: country,
        vehicleTypeId: vehicleTypeId
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
    const { t } = this.props;

    let {
      ourLastSearchList,
      popularNewsList,
      popularSedansList,
      relatedSearchList,
      savedRecentSearchList
    } = this.state.dashboardDetails;
    const { fromPriceList, toPriceList } = this.state;
    let { brandList, countryList, priceList } = this.state.masterData;
    console.log(this.state.modelList);
    return (
      <React.Fragment>
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text="Loading ..."
        >
          <section className="search-filter">
            <div className="container h-100">
              <div
                id="sf-content"
                className="row no-gutters h-100 align-items-center justify-content-center hideForAni"
              >
                <div className="col sfcol">
                  <div className="head1 white text-center mb-3 text-shadow">
                    {t("Find great deals from top-rated dealers.1")}
                    <sup className="sup">TM</sup>
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li
                      className="nav-item"
                      onClick={() => {
                        this.getVehicleMasterDataByVehicleTypeId(1);
                      }}
                    >
                      <a
                        className="nav-link active"
                        id="usedCar-tab"
                        data-toggle="tab"
                        href="#usedCar"
                        role="tab"
                        aria-controls="usedCar"
                        aria-selected="true"
                      >
                        Car
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => {
                        this.getVehicleMasterDataByVehicleTypeId(2);
                      }}
                    >
                      <a
                        className="nav-link"
                        id="usedCar-tab"
                        data-toggle="tab"
                        href="#usedCar"
                        role="tab"
                        aria-controls="usedCar"
                        aria-selected="false"
                      >
                        Truck
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => {
                        this.getVehicleMasterDataByVehicleTypeId(3);
                      }}
                    >
                      <a
                        className="nav-link"
                        id="usedCar-tab"
                        data-toggle="tab"
                        href="#usedCar"
                        role="tab"
                        aria-controls="usedCar"
                        aria-selected="false"
                      >
                        Bus
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => {
                        this.getVehicleMasterDataByVehicleTypeId(4);
                      }}
                    >
                      <a
                        className="nav-link"
                        id="usedCar-tab"
                        data-toggle="tab"
                        href="#usedCar"
                        role="tab"
                        aria-controls="usedCar"
                        aria-selected="false"
                      >
                        Equipments
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => {
                        this.getVehicleMasterDataByVehicleTypeId(5);
                      }}
                    >
                      <a
                        className="nav-link"
                        id="usedCar-tab"
                        data-toggle="tab"
                        href="#usedCar"
                        role="tab"
                        aria-controls="usedCar"
                        aria-selected="false"
                      >
                        Parts
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="usedCar"
                      role="tabpanel"
                      aria-labelledby="usedCar-tab"
                    >
                      <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="by-models-tab"
                            data-toggle="pill"
                            href="#by-models"
                            role="tab"
                            aria-controls="by-models"
                            aria-selected="true"
                          >
                            By Brand / Models
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="by-price-tab"
                            data-toggle="pill"
                            href="#by-price"
                            role="tab"
                            aria-controls="by-price"
                            aria-selected="false"
                          >
                            By Price
                          </a>
                        </li>
                      </ul>
                      <div
                        className="tab-content pills-tabContent"
                        id="pills-tabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="by-models"
                          role="tabpanel"
                          aria-labelledby="by-models-tab"
                        >
                          <div className="model-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select
                                    onChange={this.onChangeBrand}
                                    className="form-control"
                                    value={this.state.brandName}
                                  >
                                    <option value={null} selected>
                                      All Brands
                                    </option>
                                    {brandList && brandList.length
                                      ? brandList.map(vehicle => {
                                          return (
                                            <option
                                              id={vehicle.brandId}
                                              value={vehicle.brand}
                                            >
                                              {vehicle.brand}
                                            </option>
                                          );
                                        })
                                      : ""}
                                  </select>
                                </div>
                              </div>
                              {this.state.vehicleTypeId !== 4 ? (
                                <div className="col-md-3 colgrids">
                                  <div className="selectdd">
                                    <span className="caret">
                                      <i
                                        className="fa fa-angle-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <select
                                      disabled={this.state.modelisDisable}
                                      onChange={this.onChangeModel}
                                      className="form-control"
                                      name="modelName"
                                      value={this.state.modelName}
                                    >
                                      <option selecte={true}>All Models</option>
                                      {this.state.modelList &&
                                      this.state.modelList.length ? (
                                        this.state.modelList.map(model => {
                                          return (
                                            <option
                                              id={model.modelId}
                                              value={model.model}
                                            >
                                              {model.model}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option>No Data Found</option>
                                      )}
                                    </select>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select
                                    onChange={e => {
                                      this.onChangeCountry(e);
                                    }}
                                    name="country"
                                    value={this.state.country}
                                    className="form-control"
                                  >
                                    <option selected>Choose Country</option>
                                    {countryList && countryList.length ? (
                                      countryList.map(country => {
                                        return (
                                          <option
                                            value={country.country}
                                            id={country.countryId}
                                          >
                                            {country.country}
                                          </option>
                                        );
                                      })
                                    ) : (
                                      <option>Loading...</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="by-price"
                          role="tabpanel"
                          aria-labelledby="by-price-tab"
                        >
                          <div className="price-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select
                                    onChange={e => {
                                      this.onChangeDropDown(e);
                                    }}
                                    value={this.state.fromPrice}
                                    name="fromPrice"
                                    className="form-control"
                                  >
                                    <option selected>From</option>
                                    {fromPriceList && fromPriceList.length ? (
                                      fromPriceList.map(price => {
                                        return (
                                          <option
                                            value={price.price}
                                            id={price.price}
                                          >
                                            {price.price}
                                          </option>
                                        );
                                      })
                                    ) : (
                                      <option>Loading...</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select
                                    onChange={e => {
                                      this.onChangeDropDown(e);
                                    }}
                                    value={this.state.toPrice}
                                    name="toPrice"
                                    className="form-control"
                                  >
                                    <option selected>To</option>
                                    {toPriceList && toPriceList.length ? (
                                      toPriceList.map(price => {
                                        return (
                                          <option
                                            value={price.price}
                                            id={price.price}
                                          >
                                            {price.price}
                                          </option>
                                        );
                                      })
                                    ) : (
                                      <option>Loading...</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select
                                    onChange={e => {
                                      this.onChangeCountry(e);
                                    }}
                                    className="form-control"
                                  >
                                    <option selected>Choose Country</option>
                                    {countryList && countryList.length ? (
                                      countryList.map(country => {
                                        return (
                                          <option
                                            value={country.country}
                                            id={country.countryId}
                                          >
                                            {country.country}
                                          </option>
                                        );
                                      })
                                    ) : (
                                      <option>Loading...</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="truck"
                      role="tabpanel"
                      aria-labelledby="truck-tab"
                    >
                      <ul
                        className="nav nav-pills"
                        id="pills-tab-two"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="by-models-tab-two"
                            data-toggle="pill"
                            href="#by-models-two"
                            role="tab"
                            aria-controls="by-models-two"
                            aria-selected="true"
                          >
                            By Make / Models
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="by-price-tab-two"
                            data-toggle="pill"
                            href="#by-price-two"
                            role="tab"
                            aria-controls="by-price-two"
                            aria-selected="false"
                          >
                            By Price
                          </a>
                        </li>
                      </ul>
                      <div
                        className="tab-content pills-tabContent"
                        id="pills-tabContent-two"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="by-models-two"
                          role="tabpanel"
                          aria-labelledby="by-models-tab-two"
                        >
                          <div className="model-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Makes</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Models</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="by-price-two"
                          role="tabpanel"
                          aria-labelledby="by-price-tab-two"
                        >
                          <div className="price-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    Price
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    To
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="bus"
                      role="tabpanel"
                      aria-labelledby="bus-tab"
                    >
                      <ul
                        className="nav nav-pills"
                        id="pills-tab-three"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="by-models-tab-three"
                            data-toggle="pill"
                            href="#by-models-three"
                            role="tab"
                            aria-controls="by-models-three"
                            aria-selected="true"
                          >
                            By Make / Models
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="by-price-tab-three"
                            data-toggle="pill"
                            href="#by-price-three"
                            role="tab"
                            aria-controls="by-price-three"
                            aria-selected="false"
                          >
                            By Price
                          </a>
                        </li>
                      </ul>
                      <div
                        className="tab-content pills-tabContent"
                        id="pills-tabContent-three"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="by-models-three"
                          role="tabpanel"
                          aria-labelledby="by-models-tab-three"
                        >
                          <div className="model-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Makes</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Models</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="by-price-three"
                          role="tabpanel"
                          aria-labelledby="by-price-tab-three"
                        >
                          <div className="price-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    Price
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    To
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="equipments"
                      role="tabpanel"
                      aria-labelledby="equipments-tab"
                    >
                      <ul
                        className="nav nav-pills"
                        id="pills-tab-four"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="by-models-tab-four"
                            data-toggle="pill"
                            href="#by-models-four"
                            role="tab"
                            aria-controls="by-models-four"
                            aria-selected="true"
                          >
                            By Make / Models
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="by-price-tab-four"
                            data-toggle="pill"
                            href="#by-price-four"
                            role="tab"
                            aria-controls="by-price-four"
                            aria-selected="false"
                          >
                            By Price
                          </a>
                        </li>
                      </ul>
                      <div
                        className="tab-content pills-tabContent"
                        id="pills-tabContent-four"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="by-models-four"
                          role="tabpanel"
                          aria-labelledby="by-models-tab-four"
                        >
                          <div className="model-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Makes</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="selectdd">
                                  <span className="caret">
                                    <i
                                      className="fa fa-angle-down"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <select>
                                    <option selected>All Models</option>
                                    <option>Loading...</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="by-price-four"
                          role="tabpanel"
                          aria-labelledby="by-price-tab-four"
                        >
                          <div className="price-filter">
                            <div className="row no-gutters align-items-center">
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    Price
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="form-group row align-items-center">
                                  <label className="col-sm-4 col-form-label text-center">
                                    To
                                  </label>
                                  <div className="col-sm-8">
                                    <div className="selectdd">
                                      <span className="caret">
                                        <i
                                          className="fa fa-angle-down"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <select>
                                        <option selected>----</option>
                                        <option>Loading...</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="inputtxt">
                                  <input
                                    type="text"
                                    value=""
                                    placeholder="Zipcode"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 colgrids">
                                <div className="btn-wrap">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                      this.handleSearch();
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </LoadingOverlay>
        <section className="search-showcase spacerTop spacerBottom">
          <div className="container">
            <div className="row">
              {ourLastSearchList && ourLastSearchList.length === 0 ? (
                <div className="col-md-4">
                  <div className="ss-cards">
                    <p className="head3 black">Your Last Search</p>
                    <div className="ss-img-wrap">
                      <div
                        className="ss-img"
                        style={{
                          backgroundImage: `url(${Background1})`
                        }}
                      >
                        {" "}
                      </div>
                      <div className="ss-title head3 white text-shadow">
                        2010 Ssangyong Actyon
                        <span>Sports Leather 5Seats 2WD AT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {savedRecentSearchList && savedRecentSearchList.length === 0 ? (
                <div className="col-md-4">
                  <div className="ss-cards">
                    <p className="head3 black">Saved & Recent Searches</p>
                    <div className="ss-img-wrap">
                      <div
                        className="ss-img"
                        style={{
                          backgroundImage: `url(${Background2})`
                        }}
                      ></div>
                      <div className="ss-title head3 white text-shadow">
                        2001 Hyundai Terracan
                        <span>JX250 INTERCOOLER 4WD</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {relatedSearchList && relatedSearchList.length === 0 ? (
                <div className="col-md-4">
                  <div className="ss-cards">
                    <p className="head3 black">Related Searches</p>
                    <div className="ss-img-wrap">
                      <div
                        className="ss-img"
                        style={{
                          backgroundImage: `url(${Background3})`
                        }}
                      ></div>
                      <div className="ss-title head3 white text-shadow">
                        2004 Kia Sorento NEW
                        <span> 4WD TLX SUNROOF A/T</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

        <section className="everything-know spacerTop spacerBottom hideForAni">
          <div className="container">
            <div className="head2 black medium text-center">
              Everything You Need To Know
            </div>
            <div className="row ">
              <div className="col-md-4">
                <div className="ek-cards text-center">
                  <div className="ek-img">
                    <img
                      src={require("../assets/img/everything/best-deals-mobile.png")}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="cardBody">
                    <h4 className="head3">Evaluation standard</h4>
                    <p className="desc para1">
                      By comparing price, detailed vehicle data and dealer
                      reviews, we give each used car a deal rating from great to
                      overpriced, and sort the best deals first
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="ek-cards text-center">
                  <div className="ek-img">
                    <img
                      src={require("../assets/img/everything/valuable-insights-mobile.png")}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="cardBody">
                    <h4 className="head3">Global A/S System</h4>
                    <p className="desc para1">
                      We provide free access to key info like dealer reviews,
                      market value, price drops and days on lot—all on one page
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="ek-cards text-center">
                  <div className="ek-img">
                    <img
                      src={require("../assets/img/everything/search-mobile.jpg")}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="cardBody">
                    <h4 className="head3">Contact us</h4>
                    <p className="desc para1">
                      Our powerful search makes it easy to refine and
                      personalize your results so you only see the cars and
                      features you care about
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-one-trading spacerTop hideForAni">
          <div className="container text-center">
            <div className="head1 white bold">
              Harasow is The No.1 Trading Platform for Korean Used Cars
            </div>
            <p className="head3 white mt-3">
              Harasow is the No.1 trading platform for cars, trucks, buses,
              equipment, spare parts and machinery in S.Korea. As a wholesale
              marketplace for professional autotraders, We offer the safest and
              the cheapest ways to buy items directly from South Korean Sellers.
            </p>
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini01.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                  <p className="head2 bold white mt-3">AUTO harasow Media</p>
                  <div className="btn-group">
                    <a href="" className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini02.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                  <p className="head2 bold white mt-3">Why AUTO harasow </p>
                  <div className="btn-group">
                    <a href="" className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini03.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                  <p className="head2 bold white mt-3">Harasow Transport</p>
                  <div className="btn-group">
                    <a href="" className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial spacerTop spacerBottom hideForAni">
          <div className="container">
            <div
              id="carouselExampleControls"
              className="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="video-holder">
                        <a href="" className="d-block">
                          <img
                            src={require("../assets/img/testimonials/video.png")}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="users-holder">
                        <div className="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote className="blockquote">
                          <div>
                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p className="mb-0">
                            {" "}
                            CarGurus exceeded my expectations because I met the
                            person that wanted to buy my vehicle at the highest
                            price in a very short period of time.
                          </p>
                          <footer className="blockquote-footer">Matt C</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="video-holder">
                        <a href="" className="d-block">
                          <img
                            src={require("../assets/img/testimonials/video2.png")}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="users-holder">
                        <div className="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote className="blockquote">
                          <div>
                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p className="mb-0">
                            CarGurus put everything in front of me so I could
                            figure out what the right price was for the car that
                            I was looking for.
                          </p>
                          <footer className="blockquote-footer">Alex M</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="video-holder">
                        <a href="" className="d-block">
                          <img
                            src={require("../assets/img/testimonials/video3.png")}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="users-holder">
                        <div className="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote className="blockquote">
                          <div>
                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p className="mb-0">
                            Using CarGurus made me feel empowered because I was
                            able to understand whether I had a good deal before
                            I walked into the dealership.
                          </p>
                          <footer className="blockquote-footer">Dave M</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>

        <section className="popularcars spacerTop">
          <div className="container">
            <div className="head2 black medium text-center">Popular New Cars</div>
            <ul className="list-group popularcars-staggering mt-3">
              {popularNewsList && popularNewsList.length ? (
                popularNewsList.map(vehicle => {
                  return (
                    <li
                      className="list-group-item" key={vehicle.vehicleId}
                      style={{ opacity: 1 }}
                      onClick={() => {
                        this.searchDetails(vehicle.vehicleId);
                      }}
                    >
                      <div className="head3">{vehicle.vehicleName}</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </li>
                  );
                })
              ) : (
                <ul className="list-group popularcars-staggering mt-3">
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </Link>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">New Buick Encore</div>
                      <p className="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </section>

        <section className="popularcars spacerTop spacerBottom">
          <div className="container">
            <div className="head2 black medium text-center">Popular Sedans</div>
            <ul className="list-group mt-3 popularcars-staggering">
              {popularSedansList && popularSedansList.length ? (
                popularSedansList.map(vehicle => {
                  return (
                    <li
                      className="list-group-item"
                      style={{ opacity: 1 }}
                      onClick={() => this.searchDetails(vehicle.vehicleId)}
                    >
                      <div className="head3">{vehicle.vehicleName}</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </li>
                  );
                })
              ) : (
                <ul className="list-group mt-3 popularcars-staggering">
                  <li
                    className="list-group-item"
                    style={{ opacity: 1 }}
                    style={{ opacity: 1 }}
                  >
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </Link>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </Link>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                  <li className="list-group-item" style={{ opacity: 1 }}>
                    <a href="">
                      <div className="head3">Used BMW 3 Series</div>
                      <p className="para1">
                        716 Great Deals out of 18,117 listings starting at
                        $1,500
                      </p>
                    </a>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDashboardDetails: (params, callback) => {
      dispatch(getDashboardDetails(params, callback));
    },
    getVehicleMasterData: (params, callback) => {
      dispatch(getVehicleMasterData(params, callback));
    },
    getVehicleModelList: (params, callback) => {
      dispatch(getVehicleModelList(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};
const translate = withTranslation()(Upload);

export default AppWrapper(translate, null, mapDispatchToProps);
