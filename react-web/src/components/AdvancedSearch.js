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
  getVehicleDetailedModelList,
  getVehicleSearchList,
  getVehicleDetails,
  getCategory2
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
      modelList: null,
      pageNo: 1,
      itemsPerPage: 5,
      total: 0,
      vehicleList: [],
      category1: null,
      category2: null,
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
      toMileageList: null,

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
      partsType: [],
      modelDetailList: null,
      modelDetails: null,

      engineType: null,
      loadingWeightType: null,
      truckCategory: null,
      conditionType: null,

      limit: 5,
      todosPerPage: 5,
      offset: 1
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
    }
    this.getVehicleSearchList();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected + 1);
    this.setState({ offset: offset }, () => {
      this.getVehicleSearchList();
    });
  };

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
            this.setState({ toMileageList: this.state.master.mileageList });
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
    this.props.history.push({
      pathname: PATH.SEARCH_DETAIL,
      state: {
        vehicleTypeId: this.state.vehicleType
      }
    });
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
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "models") {
      let { modelList } = this.state.master;
      let found = modelList.find(model => {
        return model.model === e.target.value;
      });
      if (found) {
        this.getVehicleDetailedModelList(found.modelId);
      }
    }
    if (e.target.name === "category1") {
      let { category1List } = this.state.master;
      let found = category1List.find(category1 => {
        return category1.category1 === e.target.value;
      });
      if (found) {
        this.getCategory2(found.category1Id);
      }
    }
  };

  getCategory2 = category1Id => {
    this.props.getCategory2({ category1Id }, response => {
      console.log(response);
      if (response && response.response_code === 0) {
        let master = this.state.master;
        master.category2List = response.response.category2List;
        this.setState({ master: master });
      }
    });
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
    this.setState({ isLoading: true });
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      this.setState({ isLoading: false });
      if (response.response_code === 0) {
        let master = this.state.master;
        master.modelList = response.response.modelList;
        this.setState({ master: master }, () => {
          this.setCarModel();
        });
      }
    });
  };

  getVehicleDetailedModelList = modelId => {
    this.setState({ isLoading: true });
    this.props.getVehicleDetailedModelList({ modelId: modelId }, response => {
      this.setState({ isLoading: false });
      console.log(response);
      if (response.response_code === 0) {
        let master = this.state.master;
        master.modelDetailList = response.response.modelDetailList;
        this.setState({ master: master });
      }
    });
  };

  saveFavorite = (vehicleId, index) => {
    let vehicleList = this.state.vehicleList;
    vehicleList[index].isFavorite = vehicleList[index].isFavorite === 0 ? 1 : 0;
    this.setState({ vehicleList: vehicleList });
    this.props.showNotification("Added to favourites", "success");
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
      toMileage,
      offset,
      limit,
      modelDetails,
      conditionType,
      engineType,
      category1,
      category2,
      loadingWeightType,
      truckCategory,
      country 
    } = this.state;
    console.log(this.state);
    const {
      brands,
      models,
      vehicleType,
      // transmissionType,
      // fuelType,
      // steeringType,
      // dealsType,
      membershipType
    } = this.state;
    const SearchData = new FormData();
    SearchData.set("vehicleTypeId", vehicleType);
    SearchData.set("pageNo", offset);
    SearchData.set("", offset);
    SearchData.set("itemsPerPage", limit);
    SearchData.set("brands", brands ? brands : []);
    SearchData.set("models", models ? models : []);
    SearchData.set("modelDetails", modelDetails ? modelDetails : []);
    SearchData.set(
      "transmissionType",
      transmissionType ? transmissionType : []
    );
    SearchData.set("steeringType", steeringType ? steeringType : []);
    SearchData.set("fuelType", fuelType ? fuelType : []);
    SearchData.set("dealsType", dealsType ? dealsType : []);
    SearchData.set("membershipType", membershipType ? membershipType : []);
    SearchData.set("fromYear", fromYear ? fromYear : "");
    SearchData.set("toYear", toYear ? toYear : "");
    SearchData.set("fromPrice", fromPrice ? fromPrice : "");
    SearchData.set("toPrice", toPrice ? toPrice : "");
    SearchData.set("fromMileage", fromMileage ? fromMileage : "");
    SearchData.set("toMileage", toMileage ? toMileage : "");

    SearchData.set("engineType", engineType ? engineType : "");
    SearchData.set(
      "loadingWeightType",
      loadingWeightType ? loadingWeightType : ""
    );
    SearchData.set("truckCategory", truckCategory ? truckCategory : "");
    SearchData.set("conditionType", conditionType ? conditionType : "");
    SearchData.set("category1", category1 ? category1 : "");
    SearchData.set("category2", category2 ? category2 : "");
    SearchData.set("country", country ? country : "");

    this.setState({ isLoading: true });
    this.props.getVehicleSearchList(SearchData, response => {
      console.log(response);
      this.setState({ isLoading: false });
      if (response && response.response_code === 0) {
        const { totalRecords, vehicleDetailList } = response.response;
        vehicleDetailList.map(i => {
          return (i.isFavorite = 0);
        });
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
      let toPriceList = this.state.master.priceList;
      let filteredArray = toPriceList.filter(
        price => parseInt(price.price) > parseInt(e.target.value)
      );
      this.setState({ toPriceList: filteredArray });
    }
    if (e.target.name === "fromMileage") {
      let toMileageList = this.state.master.mileageList;
      let filteredArray = toMileageList.filter(
        mileage => parseInt(mileage.mileage) > parseInt(e.target.value)
      );
      this.setState({ toMileageList: filteredArray });
    }
  };

  onChangeVehicleType = vehicleType => {
    this.setState({ vehicleType: vehicleType }, () =>
      this.getAllMasterByvehicleTypeId()
    );
    this.setState({ vehicleType: vehicleType }, () =>
      this.getVehicleSearchList()
    );
  };

  render() {
    // console.log(this.props);
    let {
      countryList,
      brandList,
      category2List,
      category1List,
      transmissionTypeList,
      steeringTypeList,
      fuelTypeList,
      dealsTypeList,
      memberShipTypeList,
      mileageList,
      priceList,
      yearList,
      modelList,
      truckCategoryList,
      loadingWeightTypeList,
      engineTypeList,
      modelDetailList,
      conditionTypeList
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
      toPriceList,
      toMileageList,
      todosPerPage
    } = this.state;
    // console.log(vehicleType, "lllllllllllllll");
    // this.getAllMasterByvehicleTypeId();
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    const pageDisplayCount = Math.ceil(total / todosPerPage);
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
              <div class="row mt-5">
                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                  <ul class="nav nav-pills justify-content-end rightlinks">
                    <li
                      class="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(1);
                      }}
                    >
                      <a
                        class={`nav-link ${vehicleType === 1 ? "active" : ""}`}
                      >
                        Cars
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(2);
                      }}
                    >
                      <a
                        class={`nav-link ${vehicleType === 2 ? "active" : ""}`}
                      >
                        Truck
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(3);
                      }}
                    >
                      <a
                        class={`nav-link ${vehicleType === 3 ? "active" : ""}`}
                      >
                        Bus
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(4);
                      }}
                    >
                      <a
                        class={`nav-link ${vehicleType === 4 ? "active" : ""}`}
                      >
                        Equipments
                      </a>
                    </li>
                    <li
                      class="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(5);
                      }}
                    >
                      <a
                        class={`nav-link ${vehicleType === 5 ? "active" : ""}`}
                      >
                        Parts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                {/* start */}
                <div class="col-lg-4">
                  <div class="filters_wrap">
                    <div class="filters filter_1">
                      {/* <div class="head3 mb-2">Filter Results</div> */}
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
                          {brandList ? (
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
                                disabled={
                                  brandList && brandList.length ? false : true
                                }
                                onChange={e => {
                                  this.handleChangeBrand(e);
                                }}
                                value={this.state.brands}
                              >
                                <option id="all">All Brands</option>
                                {brandList &&
                                  brandList.map((brand, i) => {
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
                          ) : (
                            ""
                          )}
                          {modelList ? (
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
                                id="models"
                                disabled={
                                  modelList && modelList.length ? false : true
                                }
                                onChange={this.handleChange}
                                value={this.state.models}
                              >
                                <option>All Models</option>
                                {modelList &&
                                  modelList.map(model => {
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
                          ) : (
                            ""
                          )}
                          {category1List ? (
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
                                name="category1"
                                id="category1"
                                disabled={
                                  category1List && category1List.length
                                    ? false
                                    : true
                                }
                                onChange={e => {
                                  this.handleChange(e);
                                }}
                                value={this.state.category1}
                              >
                                <option id="all">All Category1</option>
                                {category1List &&
                                  category1List.map((category1, i) => {
                                    return (
                                      <option
                                        id={`${i}${category1.category1Id}`}
                                        value={category1.category1}
                                      >
                                        {category1.category1}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          ) : (
                            ""
                          )}
                          {category2List ? (
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
                                disabled={
                                  category2List && category2List.length
                                    ? false
                                    : true
                                }
                                onChange={e => {
                                  this.handleChange(e);
                                }}
                                value={this.state.category2}
                              >
                                <option id="all">All Category2</option>
                                {category2List &&
                                  category2List.map((category2, i) => {
                                    return (
                                      <option
                                        id={`${i}${category2.category2Id}`}
                                        value={category2.category2}
                                      >
                                        {category2.category2}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          ) : (
                            ""
                          )}

                          {truckCategoryList ? (
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
                                name="truckCategoryList"
                                id="truckCategory"
                                disabled={
                                  truckCategoryList && truckCategoryList.length
                                    ? false
                                    : true
                                }
                                onChange={this.handleChange}
                                value={this.state.truckCategory}
                              >
                                <option>All Truck Category</option>
                                {truckCategoryList &&
                                  truckCategoryList.map(category1 => {
                                    return (
                                      <option
                                        id={category1.category1Id}
                                        value={category1.category1}
                                      >
                                        {category1.category1}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          ) : (
                            ""
                          )}

                          <div class="form-group">
                            <div class="row align-items-center">
                              {fromYearList ? (
                                <div class="col-5">
                                  <select
                                    name="fromYear"
                                    id=""
                                    disabled={
                                      fromYearList && fromYearList.length
                                        ? false
                                        : true
                                    }
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
                              ) : (
                                " "
                              )}
                              <div class="col-2">to</div>
                              {toYearList ? (
                                <div class="col-5">
                                  <select
                                    name="toYear"
                                    id=""
                                    value={this.state.toYear}
                                    disabled={
                                      toYearList && toYearList.length
                                        ? false
                                        : true
                                    }
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
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          {countryList ? (
                            <div class="form-group">
                              <select
                                name="country"
                                id=""
                                disabled={
                                  countryList && countryList.length
                                    ? false
                                    : true
                                }
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
                          ) : (
                            ""
                          )}
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
                              {fromPriceList ? (
                                <div class="col-5">
                                  <select
                                    name="fromPrice"
                                    id="fromPrice"
                                    value={this.state.fromPrice}
                                    disabled={
                                      fromPriceList && fromPriceList.length
                                        ? false
                                        : true
                                    }
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
                              ) : (
                                ""
                              )}
                              <div class="col-2">to</div>
                              {toPriceList ? (
                                <div class="col-5">
                                  <select
                                    name="toPrice"
                                    id="toPrice"
                                    value={this.state.toPrice}
                                    disabled={
                                      toPriceList && toPriceList.length
                                        ? false
                                        : true
                                    }
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
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-12">
                                <label for="">Maximum Mileage</label>
                              </div>
                              {mileageList ? (
                                <div class="col-6">
                                  <select
                                    name=""
                                    value={this.state.mileage}
                                    id=""
                                    disabled={
                                      mileageList && mileageList.length
                                        ? false
                                        : true
                                    }
                                    onChange={e => {
                                      this.setState({
                                        mileage: e.target.value
                                      });
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
                              ) : (
                                ""
                              )}
                              <div class="col-2">Miles</div>
                            </div>
                          </div>
                          {transmissionTypeList ? (
                            <div class="form-group">
                              <div class="row align-items-center">
                                <div class="col-12">
                                  <label for="">Transmission</label>
                                </div>
                                <div class="col-12">
                                  (
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
                                      disabled={
                                        transmissionTypeList &&
                                        transmissionTypeList.length
                                          ? false
                                          : true
                                      }
                                      value={this.state.transmissionType}
                                    >
                                      <option>All Transmission</option>
                                      {transmissionTypeList &&
                                        transmissionTypeList.map(
                                          transmission => {
                                            return (
                                              <option
                                                id={
                                                  transmission.transmissionTypeId
                                                }
                                                value={
                                                  transmission.transmissionType
                                                }
                                              >
                                                {transmission.transmissionType}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </div>
                                  )
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {fuelTypeList ? (
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
                                      disabled={
                                        fuelTypeList && fuelTypeList.length
                                          ? false
                                          : true
                                      }
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
                          ) : (
                            ""
                          )}
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
                          {fromPriceList ? (
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
                                    disabled={
                                      fromPriceList && fromPriceList.length
                                        ? false
                                        : true
                                    }
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
                                {toPriceList ? (
                                  <div class="col-5">
                                    <select
                                      name="toPrice"
                                      id="toPrice"
                                      value={this.state.toPrice}
                                      disabled={
                                        toPriceList && toPriceList.length
                                          ? false
                                          : true
                                      }
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
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {mileageList ? (
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
                                    disabled={
                                      mileageList && mileageList.length
                                        ? false
                                        : true
                                    }
                                    onChange={e => {
                                      this.setState({
                                        mileage: e.target.value
                                      });
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
                          ) : (
                            ""
                          )}
                          {transmissionTypeList ? (
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
                                      disabled={
                                        transmissionTypeList &&
                                        transmissionTypeList.length
                                          ? false
                                          : true
                                      }
                                      value={this.state.transmissionType}
                                    >
                                      <option>All Transmission</option>
                                      {transmissionTypeList &&
                                        transmissionTypeList.map(
                                          transmission => {
                                            return (
                                              <option
                                                id={
                                                  transmission.transmissionTypeId
                                                }
                                                value={
                                                  transmission.transmissionType
                                                }
                                              >
                                                {transmission.transmissionType}
                                              </option>
                                            );
                                          }
                                        )}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
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
                      {fromPriceList ? (
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
                                disabled={
                                  fromPriceList && fromPriceList.length
                                    ? false
                                    : true
                                }
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
                            {toPriceList ? (
                              <div class="col-5">
                                <select
                                  name="toPrice"
                                  id="toPrice"
                                  value={this.state.toPrice}
                                  disabled={
                                    toPriceList && toPriceList.length
                                      ? false
                                      : true
                                  }
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
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
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
                      {mileageList ? (
                        <div class="form-group">
                          <label for="">Mileage</label>
                          <div class="form-group">
                            <div class="row align-items-center">
                              <div class="col-5">
                                <select
                                  name="fromMileage"
                                  id=""
                                  value={this.state.fromMileage}
                                  onChange={e => {
                                    this.onChangeDropDown(e);
                                  }}
                                  disabled={
                                    mileageList && mileageList.length
                                      ? false
                                      : true
                                  }
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
                              {toMileageList ? (
                                <div class="col-5">
                                  <select
                                    name="toMileage"
                                    id=""
                                    value={this.state.toMileage}
                                    onChange={e => {
                                      this.onChangeDropDown(e);
                                    }}
                                    disabled={
                                      toMileageList && toMileageList.length
                                        ? false
                                        : true
                                    }
                                    class="form-control"
                                  >
                                    <option value="" selected>
                                      All Mileage
                                    </option>
                                    {toMileageList && toMileageList.length
                                      ? toMileageList.map(mileage => {
                                          return (
                                            <option value={mileage.mileage}>
                                              {mileage.mileage}
                                            </option>
                                          );
                                        })
                                      : ""}
                                  </select>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {modelDetailList ? (
                        <div class="form-group">
                          <label for="">Model details</label>

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
                              name="modelDetails"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              disabled={
                                modelDetailList && modelDetailList.length
                                  ? false
                                  : true
                              }
                              value={this.state.modelDetails}
                            >
                              <option>All Model Details</option>
                              {modelDetailList &&
                                modelDetailList.map(modelDetail => {
                                  return (
                                    <option
                                      id={modelDetail.modelId}
                                      value={modelDetail.model}
                                    >
                                      {modelDetail.model}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {transmissionTypeList ? (
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
                              disabled={
                                transmissionTypeList &&
                                transmissionTypeList.length
                                  ? false
                                  : true
                              }
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
                      ) : (
                        ""
                      )}
                      {fuelTypeList ? (
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
                                  disabled={
                                    fuelTypeList && fuelTypeList.length
                                      ? false
                                      : true
                                  }
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
                      ) : (
                        ""
                      )}
                      {steeringTypeList ? (
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
                              disabled={
                                steeringTypeList && steeringTypeList.length
                                  ? false
                                  : true
                              }
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
                      ) : (
                        ""
                      )}
                      {loadingWeightTypeList ? (
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
                              name="loadingWeightType"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              disabled={
                                loadingWeightTypeList &&
                                loadingWeightTypeList.length
                                  ? false
                                  : true
                              }
                              value={this.state.loadingWeightType}
                            >
                              <option>All Loading Weight Type</option>
                              {loadingWeightTypeList &&
                                loadingWeightTypeList.map(loadingWeightType => {
                                  return (
                                    <option
                                      id={loadingWeightType.loadingWeightTypeId}
                                      value={
                                        loadingWeightType.loadingWeightType
                                      }
                                    >
                                      {loadingWeightType.loadingWeightType}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {engineTypeList ? (
                        <div class="form-group">
                          <label for="">Engine Type</label>

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
                              name="engineType"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              disabled={
                                engineTypeList && engineTypeList.length
                                  ? false
                                  : true
                              }
                              value={this.state.engineType}
                            >
                              <option>All Engine Type</option>
                              {engineTypeList &&
                                engineTypeList.map(engineType => {
                                  return (
                                    <option
                                      id={engineType.engineTypeId}
                                      value={engineType.engineType}
                                    >
                                      {engineType.engineType}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
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
                      {conditionTypeList ? (
                        <div class="form-group">
                          <label for="">Condition Type</label>
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
                              name="conditionType"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              disabled={
                                conditionTypeList && conditionTypeList.length
                                  ? false
                                  : true
                              }
                              value={this.state.conditionType}
                            >
                              <option>All Deals</option>
                              {conditionTypeList &&
                                conditionTypeList.map(conditionType => {
                                  return (
                                    <option
                                      id={conditionType.conditionTypeId}
                                      value={conditionType.conditionType}
                                    >
                                      {conditionType.conditionType}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {dealsTypeList ? (
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
                              disabled={
                                dealsTypeList && dealsTypeList.length
                                  ? false
                                  : true
                              }
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
                      ) : (
                        ""
                      )}
                      {memberShipTypeList ? (
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
                              disabled={
                                memberShipTypeList && memberShipTypeList.length
                                  ? false
                                  : true
                              }
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
                      ) : (
                        ""
                      )}
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
                  {this.state.vehicleType === 5 ? (
                    <div class="premiumlist">
                      <div class="head3 text-uppercase bold border-bottom py-3">
                        premium list
                      </div>
                      <div class="row mt-4 mb-4">
                        <div class="col-md-4">
                          <div class="plgrid">
                            <div class="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                class="img-fluid w-100"
                                alt=""
                              />
                              <div class="premium_bade">Premium</div>
                              <div class="ratingplus">37+</div>
                            </div>
                            <div class="content">
                              <div class="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p class="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div class="text-right redprice head3 bold">
                                USD *,***
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="plgrid">
                            <div class="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                class="img-fluid w-100"
                                alt=""
                              />
                              <div class="premium_bade">Premium</div>
                              <div class="ratingplus">37+</div>
                            </div>
                            <div class="content">
                              <div class="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p class="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div class="text-right redprice head3 bold">
                                USD *,***
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="plgrid">
                            <div class="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                class="img-fluid w-100"
                                alt=""
                              />
                              <div class="premium_bade">Premium</div>
                              <div class="ratingplus">37+</div>
                            </div>
                            <div class="content">
                              <div class="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p class="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div class="text-right redprice head3 bold">
                                USD *,***
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

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
                  {pageDisplayCount > 1 ? (
                    <div class="totalresults py-3 mt-3">
                      <div class="row align-items-center">
                        <div class="col-md-6">
                          <span class="bold">
                            {this.state.offset} - {pageDisplayCount}
                          </span>{" "}
                          out of <span class="bold">{pageDisplayCount}</span>{" "}
                          listings
                        </div>
                        <div class="col-md-6">
                          <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageDisplayCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={
                              "pagination justify-content-end"
                            }
                            subContainerClassName={"page-item"}
                            activeClassName={"page-item active"}
                            pageLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            previousClassName={"page-item"}
                            disabledClassName={"disabled"}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.vehicleType !== 5 &&
                  this.state.vehicleList &&
                  this.state.vehicleList.length ? (
                    this.state.vehicleList.map((vehicle, index) => {
                      return (
                        <div class="row searched_cards align-items-center">
                          <div
                            class="col-md-3 text-center"
                            onClick={() => {
                              this.vehicleDetails(vehicle.vehicleId);
                            }}
                          >
                            <img
                              src={
                                vehicle.parentImageUrl == ""
                                  ? acura
                                  : vehicle.parentImageUrl
                              }
                              class="w-100 img-fluid"
                              alt=""
                            />
                          </div>
                          <div class="col-md-9 text-left">
                            <div class="row no-gutters align-items-center">
                              <div
                                class="col pr-3"
                                onClick={() => {
                                  this.vehicleDetails(vehicle.vehicleId);
                                }}
                              >
                                <div class="head3 bold mb-2">
                                  {vehicle.vehicleName}
                                </div>
                              </div>
                              <div
                                class="col whishlist"
                                style={{ cursor: "pointer" }}
                              >
                                <span>
                                  <i
                                    class={
                                      vehicle.isFavorite
                                        ? `fa fa-heart`
                                        : `fa fa-heart-o`
                                    }
                                    onClick={() => {
                                      this.saveFavorite(
                                        vehicle.vehicleId,
                                        index
                                      );
                                    }}
                                  ></i>
                                </span>
                              </div>
                            </div>
                            <div
                              class="row"
                              onClick={() => {
                                this.vehicleDetails(vehicle.vehicleId);
                              }}
                            >
                              <div class="col-sm-5">
                                <div class="head4 mb-4 text-uppercase bold">
                                  <span>
                                    <span class="fair">
                                      <i class="fas fa-arrow-circle-right"></i>
                                    </span>
                                  </span>{" "}
                                  {vehicle.dealsType}
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
                  ) : this.state.vehicleType === 5 ? (
                    <div class="row">
                      <div class="col-12 ">
                        <div class="head2 text-center">Search by Category</div>
                        <div class="row mt-3">
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-6">
                            <div class="parts_grid shadow">
                              <div class="head3">Engine Parts</div>
                              <div class="row mt-2 no-gutters">
                                <div class="col-12">
                                  <div class="form-group">
                                    <select name="" id="" class="form-control">
                                      <option selected value="">
                                        Select Category
                                      </option>
                                      <option value="0">Loading...</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12 text-right">
                                  <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                      this.props.history.push(
                                        PATH.PARTS_DETAIL
                                      );
                                    }}
                                  >
                                    Go
                                  </button>
                                </div>
                              </div>
                              <div class="row no-gutters">
                                <div class="col-12 text-center">
                                  <img
                                    src={require("../assets/img/engine.png")}
                                    class="img-fluid mx-auto"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {/* {this.state.isLoading ? (
                        <Spinner color="black" />
                      )  */}
                      {/* : ( */}
                      No Data Found
                      {/* )} */}
                    </div>
                  )}
                  {pageDisplayCount > 1 ? (
                    <div class="totalresults py-3 mt-3">
                      <div class="row align-items-center">
                        <div class="col-md-6">
                          <span class="bold">
                            {this.state.offset} - {pageDisplayCount}
                          </span>{" "}
                          out of <span class="bold">{pageDisplayCount}</span>{" "}
                          listings
                        </div>
                        <div class="col-md-6">
                          <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageDisplayCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={
                              "pagination justify-content-end"
                            }
                            subContainerClassName={"page-item"}
                            activeClassName={"page-item active"}
                            pageLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            previousClassName={"page-item"}
                            disabledClassName={"disabled"}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
    getVehicleDetailedModelList: (params, callback) => {
      dispatch(getVehicleDetailedModelList(params, callback));
    },
    getVehicleDetails: (params, callback) => {
      dispatch(getVehicleDetails(params, callback));
    },
    getCategory2: (params, callback) => {
      dispatch(getCategory2(params, callback));
    }
  };
};

export default AppWrapper(AdvancedSearch, null, mapDispatchToProps);
