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
// import Background1 from "../assets/img/search/ssangyong.jpg";
// import Background2 from "../assets/img/search/hyundai.jpg";
// import Background3 from "../assets/img/search/kia2.jpg";
import { PATH } from "../utils/Constants";
import ReactPaginate from "react-paginate";
import Login from '../components/common/login'
import {
  getSearchResult,
  getVehicleMasterData,
  getVehicleModelList,
  getVehicleDetailedModelList,
  getVehicleSearchList,
  getVehicleDetails,
  getCategory2,
  addToSavedSearch,
  deleteSavedSearch
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
      isFirst: 0,
      isSubscribed: false,
      vehicleType:
        this.props.location.state && this.props.location.state.vehicleTypeId
          ? this.props.location.state.vehicleTypeId
          : 1,
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
      offset: 1,
      isModelOpen: 0,
      pageNo: 1,
      itemsPerPage: 5,
      total: 0,
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Advanced Search";
    let params = {};
    this.props.getSearchResult(params, response => {
      console.log(response);
    });
    this.getVehicleSearchList();
    this.getAllMasterByvehicleTypeId();
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
    let { modelList } = this.state.master;
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

  modelClose = () => {
    document.body.classList.remove('modal-open');
    this.setState({ isModelOpen: false });
  }

  modelOpen = () => {
    document.body.classList.add('modal-open');
    this.setState({ isModelOpen: true });
  }

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
    let { brandList, modelList } = this.state.master;

    let found = brandList.find(car => {
      return car.brand === e.target.value;
    });
    if (found && modelList) {
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
    this.setState({ modelId: modelId, model: model }, () => { });
  };

  getVehicleModelList = brandId => {
    this.setState({ isLoading: true });
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      this.setState({ isLoading: false });
      if (response.response_code === 0) {
        let master = this.state.master;
        master.modelList = response.response.modelList;
        this.setState({ master: master }, () => {
          console.log(this.state.master);
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

  addToSavedSearch = (vehicleId) => {
    this.props.addToSavedSearch({ vehicleId: vehicleId }, (response) => {
      console.log(response)
    })
  }

  deleteSavedSearch = (savedSearchId) => {
    // let params  = new FormData();
    // params.append("savedSearchId",savedSearchId)
    this.props.deleteSavedSearch({savedSearchId}, (response) => {
      console.log(response)
    })
  }

  saveFavorite = (isFavorite, savedSearchId, vehicleId,  index) => {
    console.log(isFavorite);
    console.log(savedSearchId);
    console.log(vehicleId);
    let userSession = store.get("userSession");
    if (userSession) {
      let vehicleList = this.state.vehicleList;
      // vehicleList[index].isFavorite =
      //   vehicleList[index].isFavorite === 0 ? 1 : 0;
      if (!isFavorite) {
        this.addToSavedSearch(vehicleId);
        this.setState({ vehicleList: vehicleList });
        this.props.showNotification("Added to favourites", "success");
        vehicleList[index].isFavorite = true;
      } else {
        this.deleteSavedSearch(savedSearchId);
        this.setState({ vehicleList: vehicleList });
        vehicleList[index].isFavorite = false;
        this.props.showNotification("Removed to favourites", "success");
      }
      
    } else {
      // this.props.history.push(PATH.SIGIN);
      // let redirectPage = PATH.ADVANCED_SEARCH;
      // store.set("redirectPage", redirectPage);
      this.modelOpen();
    }
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
        // vehicleDetailList.map(i => {
        //   return (i.isFavorite = 0);
        // });
        this.setState({ total: totalRecords, vehicleList: vehicleDetailList });
      }
      if (this.state.brandId && this.state.isFirst === 0) {
        this.getVehicleModelList(this.state.brandId);
        this.setState({ isFirst: 1 });
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
    this.setState({
      brands: "",
      models: "",
      modelDetails: "",
      transmissionType: "",
      steeringType: "",
      fuelType: "",
      dealsType: "",
      membershipType: "",
      fromYear: "",
      toYear: "",
      fromPrice: "",
      toPrice: "",
      fromMileage: "",
      toMileage: "",
      engineType: "",
      loadingWeightType: "",
      truckCategory: "",
      conditionType: "",
      category1: "",
      category2: "",
      country: "",
      limit: 5,
      todosPerPage: 5,
      offset: 1,
      isModelOpen: 0,
      pageNo: 1,
      itemsPerPage: 5,
      total: 0,
    });
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
      todosPerPage,
      vehicleList,
      country
    } = this.state;
    console.log(this.state.country, "lllllllllllllll");
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
          <section className="adv_search_wrap">
            <div className="container">
              <div className="row mt-5">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <ul className="nav nav-pills justify-content-end rightlinks">
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(1);
                      }}
                    >
                      <a
                        className={`nav-link ${vehicleType === 1 ? "active" : ""}`}
                      >
                        Cars
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(2);
                      }}
                    >
                      <a
                        className={`nav-link ${vehicleType === 2 ? "active" : ""}`}
                      >
                        Truck
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(3);
                      }}
                    >
                      <a
                        className={`nav-link ${vehicleType === 3 ? "active" : ""}`}
                      >
                        Bus
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(4);
                      }}
                    >
                      <a
                        className={`nav-link ${vehicleType === 4 ? "active" : ""}`}
                      >
                        Equipments
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.onChangeVehicleType(5);
                      }}
                    >
                      <a
                        className={`nav-link ${vehicleType === 5 ? "active" : ""}`}
                      >
                        Parts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                {/* start */}
                <div className="col-lg-4">
                  <div className="filters_wrap">
                    <div className="filters filter_1">
                      {/* <div className="head3 mb-2">Filter Results</div> */}
                      {/* <ul
                      className="nav nav-pills mb-3 justify-content-center"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active "
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
                      <li className="nav-item">
                        <a
                          className="nav-link "
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
                      <li className="nav-item">
                        <a
                          className="nav-link  border-0"
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
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-bycar"
                          role="tabpanel"
                          aria-labelledby="pills-bycar-tab"
                        >
                          {brandList ? (
                            <div className="form-group">
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
                                <option id="all" value="">
                                  All Brands
                                </option>
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
                            <div className="form-group">
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
                                <option value="">All Models</option>
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
                            <div className="form-group">
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
                                <option id="all" value="">
                                  All Category1
                                </option>
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
                            <div className="form-group">
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
                                name="category2"
                                id="category2"
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
                                <option id="all" value="">
                                  All Category2
                                </option>
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
                            <div className="form-group">
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
                                <option value="">All Truck Category</option>
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

                          <div className="form-group">
                            <div className="row align-items-center">
                              {fromYearList ? (
                                <div className="col-5">
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
                                    className="form-control"
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
                              <div className="col-2">to</div>
                              {toYearList ? (
                                <div className="col-5">
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
                                    className="form-control"
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
                            <div className="form-group">
                              <select
                                name="country"
                                id="country"
                                disabled={
                                  countryList && countryList.length
                                    ? false
                                    : true
                                }
                                value={country}
                                onChange={e => {
                                  this.onChangeDropDown(e);
                                }}
                                className="form-control"
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
                          <div className="form-group">
                            <input
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={e => {
                                this.getVehicleSearchList();
                              }}
                              value="Search"
                            />
                          </div>
                          {/* <div className="form-group">
                          <input
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={e => {
                              this.getVehicleSearchList();
                            }}
                            value="Search"
                          />
                        </div> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-bybodystyle"
                          role="tabpanel"
                          aria-labelledby="pills-bybodystyle-tab"
                        >
                          <div className="form-group">
                            <label>Body Style</label>
                            <select name="" id="" className="form-control">
                              <option value="" selected>
                                Select Body Style
                              </option>
                              <option value="">Sedan</option>
                              <option value="">SUV</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-5">
                                <label htmlFor="">ZIP</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value=""
                                />
                              </div>
                              <div className="col-2">to</div>
                              <div className="col-5">
                                <label htmlFor="">Radius</label>
                                <select name="" id="" className="form-control">
                                  <option value="" selected>
                                    100mi{" "}
                                  </option>
                                  <option value="">10mi</option>
                                  <option value="">20mi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-12">
                                <label htmlFor="">Years</label>
                              </div>
                              <div className="col-5">
                                <select name="" id="" className="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                              <div className="col-2">to</div>
                              <div className="col-5">
                                <select name="" id="" className="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-12">
                                <label htmlFor="">Price</label>
                              </div>
                              {fromPriceList ? (
                                <div className="col-5">
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
                                    className="form-control"
                                  >
                                    <option value="">From Price</option>
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
                              <div className="col-2">to</div>
                              {toPriceList ? (
                                <div className="col-5">
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
                                    className="form-control"
                                  >
                                    <option value="">To Price</option>
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
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-12">
                                <label htmlFor="">Maximum Mileage</label>
                              </div>
                              {mileageList ? (
                                <div className="col-6">
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
                                    className="form-control"
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
                              <div className="col-2">Miles</div>
                            </div>
                          </div>
                          {transmissionTypeList ? (
                            <div className="form-group">
                              <div className="row align-items-center">
                                <div className="col-12">
                                  <label htmlFor="">Transmission</label>
                                </div>
                                <div className="col-12">
                                  (
                                  <div className="form-group">
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
                            <div className="form-group">
                              <div className="row align-items-center">
                                <div className="col-12">
                                  <label htmlFor="">Fuel Type</label>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
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
                          <div className="form-group">
                            <input
                              type="button"
                              className="btn btn-primary w-100"
                              value="Search"
                            />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-byprice"
                          role="tabpanel"
                          aria-labelledby="pills-byprice-tab"
                        >
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-5">
                                <label htmlFor="">ZIP</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value=""
                                />
                              </div>
                              <div className="col-2">to</div>
                              <div className="col-5">
                                <label htmlFor="">Radius</label>
                                <select name="" id="" className="form-control">
                                  <option value="" selected>
                                    100mi{" "}
                                  </option>
                                  <option value="">10mi</option>
                                  <option value="">20mi</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-12">
                                <label htmlFor="">Years</label>
                              </div>
                              <div className="col-5">
                                <select name="" id="" className="form-control">
                                  <option value="" selected>
                                    All{" "}
                                  </option>
                                  <option value="">2019</option>
                                  <option value="">2018</option>
                                </select>
                              </div>
                              <div className="col-2">to</div>
                              <div className="col-5">
                                <select name="" id="" className="form-control">
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
                            <div className="form-group">
                              <div className="row align-items-center">
                                <div className="col-12">
                                  <label htmlFor="">Price</label>
                                </div>

                                <div className="col-5">
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
                                    className="form-control"
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

                                <div className="col-2">to</div>
                                {toPriceList ? (
                                  <div className="col-5">
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
                                      className="form-control"
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
                            <div className="form-group">
                              <div className="row align-items-center">
                                <div className="col-12">
                                  <label htmlFor="">Maximum Mileage</label>
                                </div>

                                <div className="col-6">
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
                                    className="form-control"
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

                                <div className="col-2">Miles</div>
                              </div>
                            </div>
                          ) : (
                              ""
                            )}
                          {transmissionTypeList ? (
                            <div className="form-group">
                              <div className="row align-items-center">
                                <div className="col-12">
                                  <label htmlFor="">Transmission</label>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
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
                          <div className="form-group">
                            <input
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={e => {
                                this.getVehicleSearchList();
                              }}
                              value="Search"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="filters filter_2">
                      <div className="head3 mb-2">Filter Results</div>
                      {fromPriceList ? (
                        <div className="form-group">
                          <div className="row align-items-center">
                            <div className="col-12">
                              <label htmlFor="">Price</label>
                            </div>

                            <div className="col-5">
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
                                className="form-control"
                              >
                                <option value="">From Price</option>
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

                            <div className="col-2">to</div>
                            {toPriceList ? (
                              <div className="col-5">
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
                                  className="form-control"
                                >
                                  <option value="">To Price</option>
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
                      {/* <div className="form-group">
                      <label htmlFor="">Financing</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="finance_checkbox"
                        />
                        <label className="form-check-label" htmlFor="finance_checkbox">
                          Show online financing only (1)
                        </label>
                      </div>
                    </div> */}
                      {mileageList ? (
                        <div className="form-group">
                          <label htmlFor="">Mileage</label>
                          <div className="form-group">
                            <div className="row align-items-center">
                              <div className="col-5">
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
                                  className="form-control"
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

                              <div className="col-2">to</div>
                              {toMileageList ? (
                                <div className="col-5">
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
                                    className="form-control"
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
                        <div className="form-group">
                          <label htmlFor="">Model details</label>

                          <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Transmission</label>

                          <div className="form-group">
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
                        <div className="form-group">
                          <div className="row align-items-center">
                            <div className="col-12">
                              <label htmlFor="">Fuel Type</label>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Steering</label>

                          <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Steering</label>

                          <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Engine Type</label>

                          <div className="form-group">
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
                      {/* <div className="form-group">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-6">
                          <label htmlFor="">Trim</label>
                        </div>
                        <div className="col-6 text-right">
                          <button className="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="checkboxgroup">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox1"
                          />
                          <label className="form-check-label" htmlFor="checkbox1">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox2"
                          />
                          <label className="form-check-label" htmlFor="checkbox2">
                            FWD
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox3"
                          />
                          <label className="form-check-label" htmlFor="checkbox3">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox4"
                          />
                          <label className="form-check-label" htmlFor="checkbox4">
                            FWD
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox5"
                          />
                          <label className="form-check-label" htmlFor="checkbox5">
                            2.0L FWD with Premium Package(0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox6"
                          />
                          <label className="form-check-label" htmlFor="checkbox6">
                            FWD
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="">Days on Market</label>
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
                      {/* <div className="form-group">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-6">
                          <label htmlFor="">Color</label>
                        </div>
                        <div className="col-6 text-right">
                          <button className="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="checkboxgroup hauto">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="color_checkbox1"
                          />
                          <label className="form-check-label" htmlFor="color_checkbox1">
                            Black (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="color_checkbox2"
                          />
                          <label className="form-check-label" htmlFor="color_checkbox2">
                            Blue (0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="color_checkbox3"
                          />
                          <label className="form-check-label" htmlFor="color_checkbox3">
                            Gray (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="color_checkbox4"
                          />
                          <label className="form-check-label" htmlFor="color_checkbox4">
                            Red (0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="color_checkbox5"
                          />
                          <label className="form-check-label" htmlFor="color_checkbox5">
                            White (0)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-6">
                          <label htmlFor="">Options</label>
                        </div>
                        <div className="col-6 text-right">
                          <button className="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="checkboxgroup">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox1"
                          >
                            Adaptive Cruise Control (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox2"
                          >
                            Alloy Wheels (2)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox3"
                          >
                            Backup Camera (2)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox4"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox4"
                          >
                            Bluetooth (2)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox5"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox5"
                          >
                            Heat Package (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox6"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox6"
                          >
                            LE Package (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox7"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox7"
                          >
                            Leather Seats (2)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox8"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox8"
                          >
                            Navigation System (0)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox9"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox9"
                          >
                            Premium Package (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="option_checkbox10"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="option_checkbox10"
                          >
                            Sunroof/Moonroof (2)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {conditionTypeList ? (
                        <div className="form-group">
                          <label htmlFor="">Condition Type</label>
                          <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Deals</label>

                          <div className="form-group">
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
                        <div className="form-group">
                          <label htmlFor="">Memberships</label>

                          <div className="form-group">
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
                      <div className="form-group">
                        <input
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={e => {
                            this.getVehicleSearchList();
                          }}
                          value="Search"
                        />
                      </div>
                      {/* <div className="form-group">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-6">
                          <label htmlFor="">New / Used / CPO</label>
                        </div>
                        <div className="col-6 text-right">
                          <button className="btn btn-outline-dark btn-sm">
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="checkboxgroup hauto">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="cpo_checkbox1"
                          />
                          <label className="form-check-label" htmlFor="cpo_checkbox1">
                            {" "}
                            Certified Pre-Owned (1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="cpo_checkbox2"
                          />
                          <label className="form-check-label" htmlFor="cpo_checkbox2">
                            {" "}
                            Used (0)
                          </label>
                        </div>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="">Vehicle History</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="owner_check"
                        />
                        <label className="form-check-label" htmlFor="owner_check">
                          {" "}
                          Single Owner (1)
                        </label>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="">Hide Vehicles with:</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="hide_check1"
                        />
                        <label className="form-check-label" htmlFor="hide_check1">
                          {" "}
                          Accidents Reported (0)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="hide_check2"
                        />
                        <label className="form-check-label" htmlFor="hide_check2">
                          {" "}
                          Fleet (e.g. rental or corporate) (0)
                        </label>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="">Fuel Efficiency</label>
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
                      {/* <div className="form-group">
                      <label htmlFor="">Price Drops</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="price_drops_check"
                        />
                        <label className="form-check-label" htmlFor="price_drops_check">
                          {" "}
                          Only show recent price drops (0)
                        </label>
                      </div>
                    </div> */}
                      {/* <div className="form-group">
                      <label htmlFor="">Text Search</label>
                      <div className="row align-items-center">
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            placeholder="(eg. diesel, sunroof)"
                          />
                        </div>
                        <div className="col-4 text-left">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                          >
                            <i className="fas fa-times-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div> */}
                    </div>
                    {/* <div className="filters filter_3">
                    <div className="head3 mb-2">Add Similar Cars</div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="similar_checkbox1"
                        />
                        <label className="form-check-label" htmlFor="similar_checkbox1">
                          Acura TLX
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="similar_checkbox2"
                        />
                        <label className="form-check-label" htmlFor="similar_checkbox2">
                          Honda Accord
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="similar_checkbox3"
                        />
                        <label className="form-check-label" htmlFor="similar_checkbox3">
                          {" "}
                          Honda Civic
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn btn-primary btn-sm">
                        More cars
                      </button>
                    </div>
                  </div> */}
                  </div>
                </div>
                {/* end */}
                <div className="col-lg-8">
                  {this.state.vehicleType === 5 ? (
                    <div className="premiumlist">
                      <div className="head3 text-uppercase bold border-bottom py-3">
                        premium list
                      </div>
                      <div className="row mt-4 mb-4">
                        <div className="col-md-4">
                          <div className="plgrid">
                            <div className="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                className="img-fluid w-100"
                                alt=""
                              />
                              <div className="premium_bade">Premium</div>
                              <div className="ratingplus">37+</div>
                            </div>
                            <div className="content">
                              <div className="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p className="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div className="text-right redprice head3 bold">
                                USD *,***
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="plgrid">
                            <div className="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                className="img-fluid w-100"
                                alt=""
                              />
                              <div className="premium_bade">Premium</div>
                              <div className="ratingplus">37+</div>
                            </div>
                            <div className="content">
                              <div className="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p className="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div className="text-right redprice head3 bold">
                                USD *,***
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="plgrid">
                            <div className="position-relative">
                              <img
                                src={require("../assets/img/about/image2.png")}
                                className="img-fluid w-100"
                                alt=""
                              />
                              <div className="premium_bade">Premium</div>
                              <div className="ratingplus">37+</div>
                            </div>
                            <div className="content">
                              <div className="head4 bold mt-2">
                                2020 Harasow Excavator Inspection
                              </div>
                              <p className="para1 mt-2">
                                Item details are only provided to overseas
                                buyers and Domestic Sellers with membership
                              </p>
                              <div className="text-right redprice head3 bold">
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

                  <div className="resultbox">
                    <div className="row align-items-center justify-content-between">
                      <div className="col-md-8">
                        <div className="head2 bold">Acura ILX</div>
                      </div>
                      <div className="col-md-4 text-right">
                        <button type="button" className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {!this.state.isSubscribed ? (
                    <div className="emailbox">
                      <div className="row">
                        <div className="col-12 medium text-center">
                          Email me price drops and new listings for these
                          results.
                          <div className="row mt-3 justify-content-center">
                            <div className="col-md-5 text-right">
                              <input
                                type="text"
                                className="form-control"
                                value=""
                                placeholder="email"
                              />
                            </div>
                            <div className="col-md-3 text-left">
                              <input
                                type="submit"
                                onClick={() => this.subscribe()}
                                className="btn btn-primary w-100"
                                value="Subscribe"
                              />
                            </div>
                          </div>
                          <p className="small mt-3">
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
                    <div className="totalresults py-3 mt-3">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <span className="bold">
                            {this.state.offset} - {pageDisplayCount}
                          </span>{" "}
                          out of <span className="bold">{pageDisplayCount}</span>{" "}
                          listings
                        </div>
                        <div className="col-md-6">
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
                          <div className="row searched_cards align-items-center">
                            <div
                              className="col-md-3 text-center"
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
                                className="w-100 img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="col-md-9 text-left">
                              <div className="row no-gutters align-items-center">
                                <div
                                  className="col pr-3"
                                  onClick={() => {
                                    this.vehicleDetails(vehicle.vehicleId);
                                  }}
                                >
                                  <div className="head3 bold mb-2">
                                    {vehicle.vehicleName}
                                  </div>
                                </div>
                                <div
                                  className="col whishlist"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span>
                                    <i
                                      className={
                                        vehicle.isFavorite
                                          ? `fa fa-heart`
                                          : `fa fa-heart-o`
                                      }
                                      onClick={() => {
                                        this.saveFavorite(vehicle.isFavorite,vehicle.savedSearchId,
                                          vehicle.vehicleId,
                                          index
                                        );
                                      }}
                                    ></i>
                                  </span>
                                </div>
                              </div>
                              <div
                                className="row"
                                onClick={() => {
                                  this.vehicleDetails(vehicle.vehicleId);
                                }}
                              >
                                <div className="col-sm-5">
                                  <div className="head4 mb-4 text-uppercase bold">
                                    <span>
                                      <span className="fair">
                                        <i className="fas fa-arrow-circle-right"></i>
                                      </span>
                                    </span>{" "}
                                    {vehicle.dealsType}
                                  </div>
                                  <div className="para2">$509 Below.</div>
                                  <div className="para2">Harasow IMV of $15,000</div>
                                </div>
                                <div className="col-sm-7">
                                  <table className="para1">
                                    <tbody>
                                      <tr>
                                        <td className="medium">Price:</td>
                                        <td>
                                          $15,000{" "}
                                          <a
                                            className="blue small"
                                            href="javascript:;"
                                          >
                                            $286/mo est.
                                        </a>
                                          <div className="blue">
                                            Includes $338 delivery.
                                        </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="medium">Mileage:</td>
                                        <td>62,150 mi</td>
                                      </tr>
                                      <tr>
                                        <td className="medium">Location:</td>
                                        <td>Highland, IN 338 mi</td>
                                      </tr>
                                      <tr>
                                        <td className="medium">Dealer rating:</td>
                                        <td>
                                          <span className="Ratings">
                                            <i className="fas fa-star cg-star"></i>
                                            <i className="fas fa-star cg-star"></i>
                                            <i className="fas fa-star cg-star"></i>
                                            <i className="fas fa-star cg-star"></i>
                                            <i className="fas fa-star cg-star empty"></i>
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
                      <div className="row">
                        <div className="col-12 ">
                          <div className="head2 text-center">Search by Category</div>
                          <div className="row mt-3">
                            {vehicleList && vehicleList.length ? (
                              vehicleList.map(vehicle => {
                                return (
                                  <div className="col-lg-4 col-md-6">
                                    <div className="parts_grid shadow">
                                      <div className="head3">Engine Parts</div>
                                      <div className="row mt-2 no-gutters">
                                        <div className="col-12">
                                          <div className="form-group">
                                            <select
                                              name=""
                                              id=""
                                              className="form-control"
                                            >
                                              <option selected value="">
                                                Select Category
                                            </option>
                                              <option value="0">
                                                Loading...
                                            </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-12 text-right">
                                          <button
                                            className="btn btn-primary"
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
                                      <div className="row no-gutters">
                                        <div className="col-12 text-center">
                                          <img
                                            src={
                                              vehicle.parentImageUrl
                                                ? vehicle.parentImageUrl
                                                : require("../assets/img/engine.png")
                                            }
                                            className="img-fluid mx-auto"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
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
                    <div className="totalresults py-3 mt-3">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <span className="bold">
                            {this.state.offset} - {pageDisplayCount}
                          </span>{" "}
                          out of <span className="bold">{pageDisplayCount}</span>{" "}
                          listings
                        </div>
                        <div className="col-md-6">
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
            <div className="modal fade bd-example-modal-lg show" style={{ display: this.state.isModelOpen ? 'block' : 'none' }} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle"></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                      this.modelClose()
                    }}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container-fluid p-3">
                      <Login needRedirection={false} modelClose={this.modelClose}/>
                    </div>
                  </div>
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
    addToSavedSearch: (params, callback) => {
      dispatch(addToSavedSearch(params, callback));
    },
    deleteSavedSearch: (params, callback) => {
      dispatch(deleteSavedSearch(params, callback));
    },
    getCategory2: (params, callback) => {
      dispatch(getCategory2(params, callback));
    }
  };
};

export default AppWrapper(AdvancedSearch, null, mapDispatchToProps);
