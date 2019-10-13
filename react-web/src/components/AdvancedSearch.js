import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "./public/AppWrapper";
import { formatDate } from "../utils/utils";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import Select from "react-select";
import { connect } from "react-redux";
import store from "store";
import { Link } from "react-router-dom";
import Background1 from "../assets/img/search/ssangyong.jpg";
import Background2 from "../assets/img/search/hyundai.jpg";
import Background3 from "../assets/img/search/kia2.jpg";
import { PATH } from "../utils/Constants";
import ReactPaginate from "react-paginate";
import {
  getSearchResult,
  getVehicleMasterData,
  getVehicleModelList,
  getVehicleSearchList,
  getVehicleDetails
} from "../actions/searchAction";
import acura from "../assets/img/acura.jpeg";
import LoadingOverlay from "react-loading-overlay";
import { showNotification } from "../actions/NotificationAction";

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      master: {},
      isSubscribed: false,
      vehicleType:
        this.props.location.state && this.props.location.state.vehicleTypeId
          ? this.props.location.state.vehicleTypeId
          : null,
      brandId:
        this.props.location.state && this.props.location.state.brandId
          ? this.props.location.state.brandId
          : null,
      brands:
        this.props.location.state && this.props.location.state.brandName
          ? this.props.location.state.brandName
          : null,
      modelId:
        this.props.location.state && this.props.location.state.modelId
          ? this.props.location.state.modelId
          : null,
      models:
        this.props.location.state && this.props.location.state.modelName
          ? this.props.location.state.modelName
          : null,
      country:
        this.props.location.state && this.props.location.state.country
          ? this.props.location.state.country
          : null,
      modelList: [],
      pageNo: 1,
      itemsPerPage: 10,
      total: 0,
      vehicleList: [],
      brandObject: {},
      modelObject: {},
      isLoading: false,
      fuelType: null,
      fuelTypeId: null,
      fuelTypeObject: null,
      transmissionId: null,
      transmissionType: null,
      transmissionObject: {},
      steeringTypeId: null,
      steeringType: null,
      fromYear: null,
      toYear: null,
      fromPrice: null,
      toPrice: null,
      fromMileage: null,
      toMileage: null,
      dealsType: null,
      fromYearList: null,
      toYearList: null,
      fromPriceList: null,
      toPriceList: null,

      //newly added for multiselect
      selectedBrandOptions: null,
      selectedModelOptions: null,
      selectedTransmissionOptions: null,
      selectedFuelTypeOptions: null,
      selectedSteeringOptions: null,
      selectedDealOptions: null,
      selectedMemberShipOptions: null,
      carBrandOptions: [],
      carModelOptions: [],
      transmissionOptions: [],
      fuelTypeOptions: [],
      steeringOptions: [],
      dealOptions: [],
      memberShipOptions: [],
      // brands: [],
      // models: [],
      transmissionType: [],
      fuelType: [],
      steeringType: [],
      dealsType: [],
      membershipType: [],
      partsType: []
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    console.log(
      this.state.brands,
      this.state.models,
      this.state.country,
      "llllllllllllllllllllllllllll"
    );
    document.title = "Auto Harasow | Advanced Search";
    let params = {};
    this.props.getSearchResult(params, response => {
      console.log(response);
    });
    this.getAllMasterByvehicleTypeId();
    if (this.state.brandId) {
      this.getVehicleModelList(this.state.brandId);
      this.getVehicleSearchList();
    }
  }

  getAllMasterByvehicleTypeId = () => {
    this.props.getVehicleMasterData(
      { vehicleTypeId: this.state.vehicleType },
      response => {
        console.log(response);
        if (response && response.response_code === 0) {
          this.setState({ master: response.response }, () => {
            this.setState({ fromYearList: this.state.master.yearList });
            this.setState({ toYearList: this.state.master.yearList });
            this.setState({ fromPriceList: this.state.master.priceList });
            this.setState({ toPriceList: this.state.master.priceList });
            this.setCarBrand();
            this.setTransmissionType();
            this.setFuelType();
            this.setSteeringType();
            this.setDealsType();
            this.setMembershipType();
          });
        }
      }
    );
  };

  setSelectDropDownData = (name, data) => {
    if (data && data.length) {
      let dataArray = [];
      data.forEach(dataObject => {
        dataArray.push({
          value: dataObject.value,
          label: dataObject.name,
          id: dataObject.id
        });
      });
      this.setState({ [name]: dataArray });
    }
  };

  setCarBrand = () => {
    let { brandList } = this.state.master;
    let carBrandOptions = [];
    if (brandList && brandList.length) {
      brandList.forEach(car => {
        carBrandOptions.push({
          value: car.brand,
          label: car.brand,
          id: car.brandId
        });
      });
      this.setState({ carBrandOptions: carBrandOptions });
    }
  };
  setCarModel = () => {
    let { modelList } = this.state;
    let carModelOptions = [];
    if (modelList && modelList.length) {
      modelList.forEach(car => {
        carModelOptions.push({
          value: car.model,
          label: car.model,
          id: car.modelId
        });
      });
      this.setState({ carModelOptions: carModelOptions });
    }
  };
  setTransmissionType = () => {
    let { transmissionTypeList } = this.state.master;
    let transmissionOptions = [];
    if (transmissionTypeList && transmissionTypeList.length) {
      transmissionTypeList.forEach(transmission => {
        transmissionOptions.push({
          value: transmission.transmissionType,
          label: transmission.transmissionType,
          id: transmission.transmissionTypeId
        });
      });
      this.setState({ transmissionOptions: transmissionOptions });
    }
  };
  setFuelType = () => {
    let { fuelTypeList } = this.state.master;
    let fuelTypeOptions = [];
    if (fuelTypeList && fuelTypeList.length) {
      fuelTypeList.forEach(fuelType => {
        fuelTypeOptions.push({
          value: fuelType.fuelType,
          label: fuelType.fuelType,
          id: fuelType.fuelTypeId
        });
      });
      this.setState({ fuelTypeOptions: fuelTypeOptions });
    }
  };
  setSteeringType = () => {
    let { steeringTypeList } = this.state.master;
    let steeringOptions = [];
    if (steeringTypeList && steeringTypeList.length) {
      steeringTypeList.forEach(steering => {
        steeringOptions.push({
          value: steering.steeringType,
          label: steering.steeringType,
          id: steering.steeringTypeId
        });
      });
      this.setState({ steeringOptions: steeringOptions });
    }
  };
  setDealsType = () => {
    let { dealsTypeList } = this.state.master;
    let dealOptions = [];
    if (dealsTypeList && dealsTypeList.length) {
      dealsTypeList.forEach(deal => {
        dealOptions.push({
          value: deal.dealsType,
          label: deal.dealsType,
          id: deal.dealId
        });
      });
      this.setState({ dealOptions: dealOptions });
    }
  };
  setMembershipType = () => {
    let { memberShipTypeList } = this.state.master;
    let memberShipOptions = [];
    if (memberShipTypeList && memberShipTypeList.length) {
      memberShipTypeList.forEach(membership => {
        memberShipOptions.push({
          value: membership.membershipType,
          label: membership.membershipType,
          id: membership.membershipTypeId
        });
      });
      this.setState({ memberShipOptions: memberShipOptions });
    }
  };

  subscribe = () => {
    this.setState({ isSubscribed: true });
    this.props.showNotification("Successfully Subscribed", "success");
  };
  searchDetails = () => {
    this.props.history.push(PATH.SEARCH_DETAIL);
  };

  // handleChangeBrand = selectedOption => {
  //   let result = [];
  //   if (selectedOption && selectedOption.length) {
  //     result = selectedOption.map(obj => obj.value);
  //   }
  //   this.setState({ selectedBrandOptions: selectedOption, brands: result });
  //   if (result && result.length) {
  //     this.getVehicleModelList(selectedOption[0].id);
  //   }
  //   console.log(`Option selected:`, selectedOption);
  // };

  handleChangeBrand = e => {
    this.setState({ brands: e.target.value });
    let { brandList } = this.state.master;

    let found = brandList.find(car => {
      return car.brand === e.target.value;
    });
    if (found) {
      this.getVehicleModelList(found.brandId);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleChangeModel = selectedOption => {
  //   let result = selectedOption.map(obj => obj.value);
  //   this.setState({ selectedModelOptions: selectedOption, models: result });
  // };

  handleChangeTransmission = selectedOption => {
    let result = selectedOption.map(obj => obj.value);
    this.setState({
      selectedTransmissionOptions: selectedOption,
      transmissionType: result
    });
    console.log(`Option selected:`, selectedOption);
  };

  handleChangeFuel = selectedOption => {
    let result = selectedOption.map(obj => obj.value);
    this.setState({
      selectedFuelTypeOptions: selectedOption,
      fuelType: result
    });
    console.log(`Option selected:`, selectedOption);
  };

  handleChangeSteering = selectedOption => {
    let result = selectedOption.map(obj => obj.value);
    this.setState({
      selectedSteeringOptions: selectedOption,
      steeringType: result
    });
    console.log(`Option selected:`, selectedOption);
  };

  handleChangeMembership = selectedOption => {
    let result = selectedOption.map(obj => obj.value);
    this.setState({
      selectedMemberShipOptions: selectedOption,
      membershipType: result
    });
    console.log(`Option selected:`, selectedOption);
  };

  handleChangeDeal = selectedOption => {
    let result = selectedOption.map(obj => obj.value);
    this.setState({ selectedDealOptions: selectedOption, dealsType: result });
    console.log(`Option selected:`, selectedOption);
  };

  onChangeBrand = event => {
    const object = JSON.parse(event.target.value);
    console.log(object);
    const { brandId, brand } = object;
    this.setState({ brandId: brandId, brand: brand }, () => {
      this.getVehicleModelList(this.state.brandId);
    });
  };

  onChangeModel = event => {
    const object = JSON.parse(event.target.value);
    console.log(object);
    const { modelId, model } = object;
    this.setState({ modelId: modelId, model: model }, () => {});
  };

  getVehicleModelList = brandId => {
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      if (response.response_code === 0) {
        this.setState({ modelList: response.response.modelList }, () => {
          this.setCarModel();
        });
      }
    });
  };

  getVehicleSearchList = () => {
    const {
      pageNo,
      itemsPerPage,
      brandId,
      modelId,
      brand,
      model,
      transmissionType,
      steeringType,
      fuelType,
      dealsType,
      fromYear,
      toYear,
      fromPrice,
      toPrice,
      fromMileage,
      toMileage
    } = this.state;
    console.log(this.state);
    const {
      brands,
      models,
      // transmissionType,
      // fuelType,
      // steeringType,
      // dealsType,
      membershipType
    } = this.state;
    const SearchData = new FormData();
    SearchData.set("pageNo", pageNo);
    SearchData.set("itemsPerPage", itemsPerPage);
    SearchData.set("brands", brands ? brands : []);
    SearchData.set("models", models ? models : []);
    SearchData.set("transmissionType", transmissionType ? transmissionType : []);
    SearchData.set("steeringType", steeringType ? steeringType : []);
    SearchData.set("fuelType", fuelType ? fuelType : []);
    SearchData.set("dealsType", dealsType ? dealsType : []);
    SearchData.set("membershipType", membershipType ? membershipType : []);
    SearchData.set("fromYear", fromYear);
    SearchData.set("toYear", toYear);
    SearchData.set("fromPrice", fromPrice);
    SearchData.set("toPrice", toPrice);
    SearchData.set("fromMileage", fromMileage);
    SearchData.set("toMileage", toMileage);
    this.setState({ isLoading: true });
    this.props.getVehicleSearchList(SearchData, response => {
      console.log(response);
      this.setState({ isLoading: false });
      if (response && response.response_code === 0) {
        const { totalRecords, vehicleDetailList } = response.response;
        this.setState({ total: totalRecords, vehicleList: vehicleDetailList });
      }
    });
  };

  vehicleDetails = vehicleId => {
    this.props.history.push({
      pathname: PATH.SEARCH_DETAIL,
      state: { vehicleId: vehicleId }
    });
  };

  onChangeDropDown = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "fromYear") {
      let toYearList = this.state.master.yearList;
      let filteredArray = toYearList.filter(
        year => parseInt(year.year) > parseInt(e.target.value)
      );
      this.setState({ toYearList: filteredArray });
    }
    if (e.target.name === "fromPrice") {
      console.log('jjjjjjjjjjjjjjjjjjjjj')
      let toPriceList = this.state.master.priceList;
      let filteredArray = toPriceList.filter(
        price => parseInt(price.price) > parseInt(e.target.value)
      );
      console.log(filteredArray ,'lllllllllllllllllllll')
      this.setState({ toPriceList: filteredArray });
    }
  };

  render() {
    let {
      countryList,
      brandList,
      transmissionTypeList,
      steeringTypeList,
      fuelTypeList,
      dealsTypeList,
      memberShipTypeList,
      mileageList,
      priceList,
      yearList
    } = this.state.master;
    const {
      carBrandOptions,
      carModelOptions,
      transmissionOptions,
      fuelTypeOptions,
      steeringOptions,
      memberShipOptions,
      dealOptions,
      vehicleType,
      total,
      fromYearList,
      toYearList,
      fromPriceList,
      toPriceList
    } = this.state;
    console.log(vehicleType, "lllllllllllllll");
    // this.getAllMasterByvehicleTypeId();
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        style={{ marginTop: "1px" }}
        text="Loading ..."
      >
        <React.Fragment>
          <section class="adv_search_wrap">
            <div class="container">
              <div class="mt-5">
                {/* <p class="head2">
                Used <strong> Acura ILX</strong> for Sale in{" "}
                <strong> Manitowish Waters,</strong> WI
              </p> */}
              </div>

              <ul
                class="nav nav-pills mb-3 text-right"
                id="pills-tab"
                role="tablist"
              >
                <li
                  class="nav-item"
                  onClick={() => {
                    this.setState({ vehicleType: 1 });
                  }}
                >
                  <a
                    class={`nav-link ${vehicleType === 1 ? "active" : ""}`}
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Car
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    this.setState({ vehicleType: 2 });
                  }}
                >
                  <a
                    class={`nav-link ${vehicleType === 2 ? "active" : ""}`}
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Truck
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    this.setState({ vehicleType: 3 });
                  }}
                >
                  <a
                    class={`nav-link ${vehicleType === 3 ? "active" : ""}`}
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Bus
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    this.setState({ vehicleType: 4 });
                  }}
                >
                  <a
                    class={`nav-link ${vehicleType === 4 ? "active" : ""}`}
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Equipments
                  </a>
                </li>
                <li
                  class="nav-item"
                  onClick={() => {
                    this.setState({ vehicleType: 5 });
                  }}
                >
                  <a
                    class={`nav-link ${vehicleType === 5 ? "active" : ""}`}
                    id="pills-contact-tab"
                    data-toggle="pill"
                    href="#pills-contact"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Parts
                  </a>
                </li>
              </ul>

              <div class="row">
                {/* start */}
                <div class="col-lg-4">
                  <div class="filters_wrap">
                    <div class="filters filter_1">
                      <div class="head3 mb-2">Filter Results</div>
                      {/* <ul
                      class="nav nav-pills mb-3 justify-content-center"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active "
                          id="pills-bycar-tab"
                          data-toggle="pill"
                          href="#pills-bycar"
                          role="tab"
                          aria-controls="pills-bycar"
                          aria-selected="true"
                        >
                          By Car
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link "
                          id="pills-bybodystyle-tab"
                          data-toggle="pill"
                          href="#pills-bybodystyle"
                          role="tab"
                          aria-controls="pills-bybodystyle"
                          aria-selected="false"
                        >
                          By Body Style
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link  border-0"
                          id="pills-byprice-tab"
                          data-toggle="pill"
                          href="#pills-byprice"
                          role="tab"
                          aria-controls="pills-byprice"
                          aria-selected="false"
                        >
                          By Price
                        </a>
                      </li>
                    </ul> */}
                      <div class="tab-content" id="pills-tabContent">
                        <div
                          class="tab-pane fade show active"
                          id="pills-bycar"
                          role="tabpanel"
                          aria-labelledby="pills-bycar-tab"
                        >
                          <div class="form-group">
                            {/* <Select
                            value={this.state.selectedBrandOptions}
                            onChange={this.handleChangeBrand}
                            options={carBrandOptions}
                            name="carBrand"
                            isMulti={true}
                            isSearchable={true}
                          /> */}
                            <select
                              className="form-control"
                              name="brands"
                              id="brands"
                              onChange={e => {
                                this.handleChangeBrand(e);
                              }}
                              value={this.state.brands}
                            >
                              <option id="all">All Brands</option>
                              {brandList &&
                                brandList.map((brand , i) => {
                                  return (
                                    <option
                                      id={`${i}${brand.brandId}`}
                                      value={brand.brand}
                                    >
                                      {brand.brand}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div class="form-group">
                            {/* <Select
                            value={this.state.selectedModelOptions}
                            onChange={this.handleChangeModel}
                            options={carModelOptions}
                            name="carModel"
                            isMulti={true}
                            isSearchable={true}
                          /> */}
                            <select
                              className="form-control"
                              name="models"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              value={this.state.models}
                            >
                              <option>All Models</option>
                              {this.state.modelList &&
                                this.state.modelList.map(model => {
                                  return (
                                    <option
                                      id={model.modelId}
                                      value={model.model}
                                    >
                                      {model.model}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-5">
                                <select
                                  name="fromYear"
                                  id=""
                                  value={this.state.fromYear}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  <option value="" selected>
                                    All Years
                                  </option>
                                  {fromYearList && fromYearList.length
                                    ? fromYearList.map(year => {
                                        return (
                                          <option value={year.year}>
                                            {year.year}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select
                                  name="toYear"
                                  id=""
                                  value={this.state.toYear}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  <option value="" selected>
                                    All Years
                                  </option>
                                  {toYearList && toYearList.length
                                    ? toYearList.map(year => {
                                        return (
                                          <option value={year.year}>
                                            {year.year}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <select
                              name=""
                              id=""
                              value={this.state.country}
                              onChange={e => {
                                this.setState({ country: e.target.value });
                              }}
                              class="form-control"
                            >
                              <option value="" selected>
                                Select Country
                              </option>
                              {countryList && countryList.length
                                ? countryList.map(country => {
                                    return (
                                      <option value={country.country}>
                                        {country.country}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                          </div>
                          <div class="form-group">
                            <input
                              type="button"
                              class="btn btn-primary w-100"
                              onClick={e => {
                                this.getVehicleSearchList();
                              }}
                              value="Search"
                            />
                          </div>
                          {/* <div class="form-group">
                          <input
                            type="button"
                            class="btn btn-primary w-100"
                            onClick={e => {
                              this.getVehicleSearchList();
                            }}
                            value="Search"
                          />
                        </div> */}
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-bybodystyle"
                          role="tabpanel"
                          aria-labelledby="pills-bybodystyle-tab"
                        >
                          <div class="form-group">
                            <label>Body Style</label>
                            <select name="" id="" class="form-control">
                              <option value="" selected>
                                Select Body Style
                              </option>
                              <option value="">Sedan</option>
                              <option value="">SUV</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-5">
                                <label for="">ZIP</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value=""
                                />
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <label for="">Radius</label>
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    100mi{" "}
                                  </option>
                                  <option value="">10mi</option>
                                  <option value="">20mi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Years</label>
                              </div>
                              <div class="col-5">
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Price</label>
                              </div>
                              <div class="col-5">
                                <select
                                  name="fromPrice"
                                  id="fromPrice"
                                  value={this.state.fromPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {fromPriceList && fromPriceList.length
                                    ? fromPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select
                                  name="toPrice"
                                  id="toPrice"
                                  value={this.state.toPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {toPriceList && toPriceList.length
                                    ? toPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Maximum Mileage</label>
                              </div>
                              <div class="col-6">
                                <select
                                  name=""
                                  value={this.state.mileage}
                                  id=""
                                  onChange={e => {
                                    this.setState({ mileage: e.target.value });
                                  }}
                                  class="form-control"
                                >
                                  {mileageList && mileageList.length
                                    ? mileageList.map(mileage => {
                                        return (
                                          <option value={mileage.mileage}>
                                            $ {mileage.mileage}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">Miles</div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Transmission</label>
                              </div>
                              <div class="col-12">
                                <div class="form-group">
                                  {/* <Select
                                  value={this.state.selectedTransmissionOptions}
                                  onChange={this.handleChangeTransmission}
                                  options={transmissionOptions}
                                  name="transmission"
                                  isMulti={true}
                                  isSearchable={true}
                                /> */}

                                  <select
                                    className="form-control"
                                    name="transmissionType"
                                    onChange={e => {
                                      this.handleChange(e);
                                    }}
                                    value={this.state.transmissionType}
                                  >
                                    <option>All Transmission</option>
                                    {transmissionTypeList &&
                                      transmissionTypeList.map(transmission => {
                                        return (
                                          <option
                                            id={transmission.transmissionTypeId}
                                            value={
                                              transmission.transmissionType
                                            }
                                          >
                                            {transmission.transmissionType}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Fuel Type</label>
                              </div>
                              <div class="col-12">
                                <div class="form-group">
                                  {/* <Select
                                  value={this.state.selectedFuelTypeOptions}
                                  onChange={this.handleChangeFuel}
                                  options={fuelTypeOptions}
                                  name="transmission"
                                  isMulti={true}
                                  isSearchable={true}
                                /> */}
                                  <select
                                    className="form-control"
                                    name="fuelType"
                                    onChange={e => {
                                      this.handleChange(e);
                                    }}
                                    value={this.state.fuelType}
                                  >
                                    <option>All Fuel Type</option>
                                    {fuelTypeList &&
                                      fuelTypeList.map(fuelType => {
                                        return (
                                          <option
                                            id={fuelType.fuelTypeId}
                                            value={fuelType.fuelType}
                                          >
                                            {fuelType.fuelType}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <input
                              type="button"
                              class="btn btn-primary w-100"
                              value="Search"
                            />
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="pills-byprice"
                          role="tabpanel"
                          aria-labelledby="pills-byprice-tab"
                        >
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-5">
                                <label for="">ZIP</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  value=""
                                />
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <label for="">Radius</label>
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    100mi{" "}
                                  </option>
                                  <option value="">10mi</option>
                                  <option value="">20mi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Years</label>
                              </div>
                              <div class="col-5">
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select name="" id="" class="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                          <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Price</label>
                              </div>
                              <div class="col-5">
                                <select
                                  name="fromPrice"
                                  id="fromPrice"
                                  value={this.state.fromPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {fromPriceList && fromPriceList.length
                                    ? fromPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select
                                  name="toPrice"
                                  id="toPrice"
                                  value={this.state.toPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {toPriceList && toPriceList.length
                                    ? toPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Maximum Mileage</label>
                              </div>
                              <div class="col-6">
                                <select
                                  name=""
                                  id=""
                                  value={this.state.mileage}
                                  onChange={e => {
                                    this.setState({ mileage: e.target.value });
                                  }}
                                  class="form-control"
                                >
                                  {mileageList && mileageList.length
                                    ? mileageList.map(mileage => {
                                        return (
                                          <option value={mileage.mileage}>
                                            $ {mileage.mileage}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">Miles</div>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Transmission</label>
                              </div>
                              <div class="col-12">
                                <div class="form-group">
                                  {/* <Select
                                  value={this.state.selectedTransmissionOptions}
                                  onChange={this.handleChangeTransmission}
                                  options={transmissionOptions}
                                  name="transmission"
                                  isMulti={true}
                                  isSearchable={true}
                                /> */}
                                  <select
                                    className="form-control"
                                    name="transmissionType"
                                    onChange={e => {
                                      this.handleChange(e);
                                    }}
                                    value={this.state.transmissionType}
                                  >
                                    <option>All Transmission</option>
                                    {transmissionTypeList &&
                                      transmissionTypeList.map(transmission => {
                                        return (
                                          <option
                                            id={transmission.transmissionTypeId}
                                            value={
                                              transmission.transmissionType
                                            }
                                          >
                                            {transmission.transmissionType}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <input
                              type="button"
                              class="btn btn-primary w-100"
                              onClick={e => {
                                this.getVehicleSearchList();
                              }}
                              value="Search"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="filters filter_2">
                      <div class="head3 mb-2">Filter Results</div>
                      <div class="form-group">
                      <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Price</label>
                              </div>
                              <div class="col-5">
                                <select
                                  name="fromPrice"
                                  id="fromPrice"
                                  value={this.state.fromPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {fromPriceList && fromPriceList.length
                                    ? fromPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                              <div class="col-2">to</div>
                              <div class="col-5">
                                <select
                                  name="toPrice"
                                  id="toPrice"
                                  value={this.state.toPrice}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  class="form-control"
                                >
                                  {toPriceList && toPriceList.length
                                    ? toPriceList.map(price => {
                                        return (
                                          <option value={price.price}>
                                            $ {price.price}
                                          </option>
                                        );
                                      })
                                    : ""}
                                </select>
                              </div>
                            </div>
                      </div>
                      {/* <div class="form-group">
                      <label for="">Financing</label>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="finance_checkbox"
                        />
                        <label class="form-check-label" for="finance_checkbox">
                          Show online financing only (1)
                        </label>
                      </div>
                    </div> */}
                      <div class="form-group">
                        <label for="">Mileage</label>
                        <div class="form-group">
                          <div class="row align-items-center">
                            <div class="col-5">
                              <select
                                name=""
                                id=""
                                value={this.state.fromMileage}
                                onChange={e => {
                                  this.setState({
                                    fromMileage: e.target.value
                                  });
                                }}
                                class="form-control"
                              >
                                <option value="" selected>
                                  All Mileage
                                </option>
                                {mileageList && mileageList.length
                                  ? mileageList.map(mileage => {
                                      return (
                                        <option value={mileage.mileage}>
                                          {mileage.mileage}
                                        </option>
                                      );
                                    })
                                  : ""}
                              </select>
                            </div>
                            <div class="col-2">to</div>
                            <div class="col-5">
                              <select
                                name=""
                                id=""
                                value={this.state.toMileage}
                                onChange={e => {
                                  this.setState({ toMileage: e.target.value });
                                }}
                                class="form-control"
                              >
                                <option value="" selected>
                                  All Mileage
                                </option>
                                {mileageList && mileageList.length
                                  ? mileageList.map(mileage => {
                                      return (
                                        <option value={mileage.mileage}>
                                          {mileage.mileage}
                                        </option>
                                      );
                                    })
                                  : ""}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Transmission</label>
                        <div class="form-group">
                          {/* <Select
                          value={this.state.selectedTransmissionOptions}
                          onChange={this.handleChangeTransmission}
                          options={transmissionOptions}
                          name="transmission"
                          isMulti={true}
                          isSearchable={true}
                        /> */}
                          <select
                            className="form-control"
                            name="transmissionType"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                            value={this.state.transmissionType}
                          >
                            <option>All Transmission</option>
                            {transmissionTypeList &&
                              transmissionTypeList.map(transmission => {
                                return (
                                  <option
                                    id={transmission.transmissionTypeId}
                                    value={transmission.transmissionType}
                                  >
                                    {transmission.transmissionType}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row align-items-center">
                          <div class="col-12">
                            <label for="">Fuel Type</label>
                          </div>
                          <div class="col-12">
                            <div class="form-group">
                              {/* <Select
                              value={this.state.selectedFuelTypeOptions}
                              onChange={this.handleChangeFuel}
                              options={fuelTypeOptions}
                              name="fuelType"
                              isMulti={true}
                              isSearchable={true}
                            /> */}
                              <select
                                className="form-control"
                                name="fuelType"
                                onChange={e => {
                                  this.handleChange(e);
                                }}
                                value={this.state.fuelType}
                              >
                                <option>All Fuel Type</option>
                                {fuelTypeList &&
                                  fuelTypeList.map(fuelType => {
                                    return (
                                      <option
                                        id={fuelType.fuelTypeId}
                                        value={fuelType.fuelType}
                                      >
                                        {fuelType.fuelType}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Steering</label>
                        <div class="form-group">
                          {/* <Select
                          value={this.state.selectedSteeringOptions}
                          onChange={this.handleChangeSteering}
                          options={steeringOptions}
                          name="steering"
                          isMulti={true}
                          isSearchable={true}
                        /> */}

                          <select
                            className="form-control"
                            name="steeringType"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                            value={this.state.steeringType}
                          >
                            <option>All Steering</option>
                            {steeringTypeList &&
                              steeringTypeList.map(steer => {
                                return (
                                  <option
                                    id={steer.steeringTypeId}
                                    value={steer.steeringType}
                                  >
                                    {steer.steeringType}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      {/* <div class="form-group">
                      <div class="row align-items-center justify-content-between">
                        <div class="col-6">
                          <label for="">Trim</label>
                        </div>
                        <div class="col-6 text-right">
                          <button class="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div class="checkboxgroup">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox1"
                          />
                          <label class="form-check-label" for="checkbox1">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox2"
                          />
                          <label class="form-check-label" for="checkbox2">
                            FWD
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox3"
                          />
                          <label class="form-check-label" for="checkbox3">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox4"
                          />
                          <label class="form-check-label" for="checkbox4">
                            FWD
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox5"
                          />
                          <label class="form-check-label" for="checkbox5">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="checkbox6"
                          />
                          <label class="form-check-label" for="checkbox6">
                            FWD
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Days on Market</label>
                      <div id="days_slider"></div>
                      <input
                        type="text"
                        id="days_slider_value"
                        value="0 days - 80 days"
                        readonly
                        style={{
                          border: "0",
                          color: "#000",
                          fontWeight: "bold",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%"
                        }}
                      />
                    </div> */}
                      {/* <div class="form-group">
                      <div class="row align-items-center justify-content-between">
                        <div class="col-6">
                          <label for="">Color</label>
                        </div>
                        <div class="col-6 text-right">
                          <button class="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div class="checkboxgroup hauto">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="color_checkbox1"
                          />
                          <label class="form-check-label" for="color_checkbox1">
                            Black (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="color_checkbox2"
                          />
                          <label class="form-check-label" for="color_checkbox2">
                            Blue (0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="color_checkbox3"
                          />
                          <label class="form-check-label" for="color_checkbox3">
                            Gray (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="color_checkbox4"
                          />
                          <label class="form-check-label" for="color_checkbox4">
                            Red (0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="color_checkbox5"
                          />
                          <label class="form-check-label" for="color_checkbox5">
                            White (0)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <div class="row align-items-center justify-content-between">
                        <div class="col-6">
                          <label for="">Options</label>
                        </div>
                        <div class="col-6 text-right">
                          <button class="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div class="checkboxgroup">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox1"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox1"
                          >
                            Adaptive Cruise Control (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox2"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox2"
                          >
                            Alloy Wheels (2)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox3"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox3"
                          >
                            Backup Camera (2)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox4"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox4"
                          >
                            Bluetooth (2)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox5"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox5"
                          >
                            Heat Package (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox6"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox6"
                          >
                            LE Package (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox7"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox7"
                          >
                            Leather Seats (2)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox8"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox8"
                          >
                            Navigation System (0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox9"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox9"
                          >
                            Premium Package (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="option_checkbox10"
                          />
                          <label
                            class="form-check-label"
                            for="option_checkbox10"
                          >
                            Sunroof/Moonroof (2)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      <div class="form-group">
                        <label for="">Deals</label>
                        <div class="form-group">
                          {/* <Select
                          value={this.state.selectedDealOptions}
                          onChange={this.handleChangeDeal}
                          options={dealOptions}
                          name="dealOptions"
                          isMulti={true}
                          isSearchable={true}
                        /> */}

                          <select
                            className="form-control"
                            name="dealsType"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                            value={this.state.dealsType}
                          >
                            <option>All Deals</option>
                            {dealsTypeList &&
                              dealsTypeList.map(deal => {
                                return (
                                  <option
                                    id={deal.dealsTypeId}
                                    value={deal.dealsType}
                                  >
                                    {deal.dealsType}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="">Memberships</label>
                        <div class="form-group">
                          {/* <Select
                          value={this.state.selectedMemberShipOptions}
                          onChange={this.handleChangeMembership}
                          options={memberShipOptions}
                          name="membershipOptions"
                          isMulti={true}
                          isSearchable={true}
                        /> */}
                          <select
                            className="form-control"
                            name="membershipType"
                            onChange={e => {
                              this.handleChange(e);
                            }}
                            value={this.state.membershipType}
                          >
                            <option>All Memberships</option>
                            {memberShipTypeList &&
                              memberShipTypeList.map(memberShip => {
                                return (
                                  <option
                                    id={memberShip.membershipTypeId}
                                    value={memberShip.membershipType}
                                  >
                                    {memberShip.membershipType}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          type="button"
                          class="btn btn-primary w-100"
                          onClick={e => {
                            this.getVehicleSearchList();
                          }}
                          value="Search"
                        />
                      </div>
                      {/* <div class="form-group">
                      <div class="row align-items-center justify-content-between">
                        <div class="col-6">
                          <label for="">New / Used / CPO</label>
                        </div>
                        <div class="col-6 text-right">
                          <button class="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div class="checkboxgroup hauto">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cpo_checkbox1"
                          />
                          <label class="form-check-label" for="cpo_checkbox1">
                            {" "}
                            Certified Pre-Owned (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cpo_checkbox2"
                          />
                          <label class="form-check-label" for="cpo_checkbox2">
                            {" "}
                            Used (0)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Vehicle History</label>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="owner_check"
                        />
                        <label class="form-check-label" for="owner_check">
                          {" "}
                          Single Owner (1)
                        </label>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Hide Vehicles with:</label>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="hide_check1"
                        />
                        <label class="form-check-label" for="hide_check1">
                          {" "}
                          Accidents Reported (0)
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="hide_check2"
                        />
                        <label class="form-check-label" for="hide_check2">
                          {" "}
                          Fleet (e.g. rental or corporate) (0)
                        </label>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Fuel Efficiency</label>
                      <div id="fuel_slider"></div>
                      <input
                        type="text"
                        id="fuel_slider_value"
                        value=""
                        readonly
                        style={{
                          border: "0",
                          color: "#000",
                          fontWeight: "bold",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%"
                        }}
                      />
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Price Drops</label>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="price_drops_check"
                        />
                        <label class="form-check-label" for="price_drops_check">
                          {" "}
                          Only show recent price drops (0)
                        </label>
                      </div>
                    </div> */}
                      {/* <div class="form-group">
                      <label for="">Text Search</label>
                      <div class="row align-items-center">
                        <div class="col-8">
                          <input
                            type="text"
                            class="form-control"
                            value=""
                            placeholder="(eg. diesel, sunroof)"
                          />
                        </div>
                        <div class="col-4 text-left">
                          <button
                            type="button"
                            class="btn btn-outline-dark btn-sm"
                          >
                            <i class="fas fa-search"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-dark btn-sm"
                          >
                            <i class="fas fa-times-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div> */}
                    </div>
                    {/* <div class="filters filter_3">
                    <div class="head3 mb-2">Add Similar Cars</div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="similar_checkbox1"
                        />
                        <label class="form-check-label" for="similar_checkbox1">
                          Acura TLX
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="similar_checkbox2"
                        />
                        <label class="form-check-label" for="similar_checkbox2">
                          Honda Accord
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="similar_checkbox3"
                        />
                        <label class="form-check-label" for="similar_checkbox3">
                          {" "}
                          Honda Civic
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <button type="button" class="btn btn-primary btn-sm">
                        More cars
                      </button>
                    </div>
                  </div> */}
                  </div>
                </div>
                {/* end */}
                <div class="col-lg-8">
                  <div class="resultbox">
                    <div class="row align-items-center justify-content-between">
                      <div class="col-md-8">
                        <div class="head2 bold">Acura ILX</div>
                      </div>
                      <div class="col-md-4 text-right">
                        <button type="button" class="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {!this.state.isSubscribed ? (
                    <div class="emailbox">
                      <div class="row">
                        <div class="col-12 medium text-center">
                          Email me price drops and new listings for these
                          results.
                          <div class="row mt-3 justify-content-center">
                            <div class="col-md-5 text-right">
                              <input
                                type="text"
                                class="form-control"
                                value=""
                                placeholder="email"
                              />
                            </div>
                            <div class="col-md-3 text-left">
                              <input
                                type="submit"
                                onClick={() => this.subscribe()}
                                class="btn btn-primary w-100"
                                value="Subscribe"
                              />
                            </div>
                          </div>
                          <p class="small mt-3">
                            By clicking "Subscribe," you agree to our{" "}
                            <a href="javascript:;">Privacy Policy</a> and{" "}
                            <a href="javascript:;">Terms of Use.</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="totalresults text-right py-3 mt-3">
                    {/* <span class="bold">1 - 6</span> out of{" "} */}
                    {/* <span class="bold">6</span> listings */}
                  </div>
                  {this.state.vehicleList && this.state.vehicleList.length ? (
                    this.state.vehicleList.map(vehicle => {
                      return (
                        <div class="row searched_cards align-items-center">
                          <div class="col-md-3 text-center">
                            <img src={acura} class="w-100 img-fluid" alt="" />
                          </div>
                          <div
                            class="col-md-9 text-left"
                            onClick={() => {
                              this.vehicleDetails(vehicle.vehicleId);
                            }}
                          >
                            <div class="row no-gutters align-items-center">
                              <div class="col pr-3">
                                <div class="head3 bold mb-2">
                                  {vehicle.vehicleName}
                                </div>
                              </div>
                              <div class="col whishlist">
                                <span>
                                  <i class="fas fa-heart"></i>
                                </span>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-5">
                                <div class="head4 mb-4 text-uppercase bold">
                                  <span>
                                    <span class="fair">
                                      <i class="fas fa-arrow-circle-right"></i>
                                    </span>
                                  </span>{" "}
                                  Good Deal
                                </div>
                                <div class="para2">$509 Below.</div>
                                <div class="para2">Harasow IMV of $15,000</div>
                              </div>
                              <div class="col-sm-7">
                                <table class="para1">
                                  <tbody>
                                    <tr>
                                      <td class="medium">Price:</td>
                                      <td>
                                        $15,000{" "}
                                        <a
                                          class="blue small"
                                          href="javascript:;"
                                        >
                                          $286/mo est.
                                        </a>
                                        <div class="blue">
                                          Includes $338 delivery.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="medium">Mileage:</td>
                                      <td>62,150 mi</td>
                                    </tr>
                                    <tr>
                                      <td class="medium">Location:</td>
                                      <td>Highland, IN 338 mi</td>
                                    </tr>
                                    <tr>
                                      <td class="medium">Dealer rating:</td>
                                      <td>
                                        <span class="Ratings">
                                          <i class="fas fa-star cg-star"></i>
                                          <i class="fas fa-star cg-star"></i>
                                          <i class="fas fa-star cg-star"></i>
                                          <i class="fas fa-star cg-star"></i>
                                          <i class="fas fa-star cg-star empty"></i>
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center">
                      {this.state.isLoading ? (
                        <Spinner color="black" />
                      ) : (
                        "No Data Found"
                      )}
                    </div>
                  )}
                </div>
              </div>
              {total > 1 ? (
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={10}
                  // pageCount={total}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination justify-content-end"}
                  subContainerClassName={"page-item"}
                  activeClassName={"page-item active"}
                  pageLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  previousClassName={"page-item"}
                  disabledClassName={"disabled"}
                />
              ) : (
                ""
              )}
            </div>
          </section>
        </React.Fragment>
      </LoadingOverlay>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSearchResult: (params, callback) => {
      dispatch(getSearchResult(params, callback));
    },
    getVehicleMasterData: (params, callback) => {
      dispatch(getVehicleMasterData(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    },
    getVehicleModelList: (params, callback) => {
      dispatch(getVehicleModelList(params, callback));
    },
    getVehicleSearchList: (params, callback) => {
      dispatch(getVehicleSearchList(params, callback));
    },
    getVehicleDetails: (params, callback) => {
      dispatch(getVehicleDetails(params, callback));
    }
  };
};

export default AppWrapper(AdvancedSearch, null, mapDispatchToProps);
