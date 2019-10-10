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
import { PATH } from '../utils/Constants';
import Background1 from "../assets/img/home/ssangyong_img.jpeg";
import Background2 from "../assets/img/home/hyundai_img.jpeg";
import Background3 from "../assets/img/home/kia_img.jpeg";
import { getDashboardDetails, getVehicleMasterData, getVehicleModelList } from '../actions/searchAction'
import { showNotification } from '../actions/NotificationAction'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
      country : null,
      modelList: [],
      modelisDisable: true,
      brandObject: {},
      modelObject: {},
      vehicleTypeId : 1
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Dashboard"
    let cookieData = Cookies.get();
    console.log(cookieData);
    this.getDashboardDetails();
    this.getVehicleMasterData();
  }

  getDashboardDetails = () => {
    this.props.getDashboardDetails({}, response => {
      console.log(response);
      if (response.response_code === 0) {
        this.setState({ dashboardDetails: response.response })
      }
    })
  }

  getVehicleMasterDataByVehicleTypeId= (vehicleTypeId) => {
    this.getVehicleMasterData(vehicleTypeId);
    this.setState({ vehicleTypeId : vehicleTypeId});
  }

  onChangeCountry = (event) =>{
    this.setState({ country : event.target.value});
  }

  onChangeFromPrice = (event) =>{
    this.setState({ fromPrice : event.target.value});
  }

  onChangeToPrice = (event) =>{
    this.setState({ toPrice : event.target.value});
  }

  onChangeBrand = (event) => {
    const object = JSON.parse(event.target.value)
    console.log(object)
    const { brandId, brand } = object
    this.setState({ brandId: brandId, brand: brand, brandObject: object }, () => {
      this.getVehicleModelList(this.state.brandId);
    })
  }


  onChangeModel = (event) => {
    const object = JSON.parse(event.target.value)
    console.log(object)
    const { modelId, modelName } = object
    this.setState({ modelId: modelId, modelName: modelName, modelObject: object }, () => {
      console.log(this.state.brandId, this.state.brandName, this.state.modelId, this.state.modelName)
    })
  }

  getVehicleMasterData = (vehicleTypeId) => {
    this.props.getVehicleMasterData({vehicleTypeId}, (response) => {
      if (response.response_code === 0) {
        this.setState({ masterData: response.response })
      }
    })
  }

  getVehicleModelList = (brandId) => {
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      if (response.response_code === 0) {
        this.setState({ modelList: response.response.modelList })
        this.setState({modelisDisable : false});
      }
    })
  }

  handleSearch = () => {
    const { brandName , modelName , country , brandId , modelId , vehicleTypeId} = this.state;
    this.props.history.push({
      pathname: PATH.ADVANCED_SEARCH,
      state: { brandName :  brandName , brandId : brandId , modelId : modelId ,
         modelName : modelName , country : country , vehicleTypeId : vehicleTypeId}
    })
  }

  render() {
    let { ourLastSearchList, popularNewCarsList, popularSedansList, relatedSearchList, savedRecentSearchList } = this.state.dashboardDetails
    let { brandList, countryList, priceList } = this.state.masterData;
    console.log(this.state.modelList)
    return (
      <React.Fragment>
        <section class="search-filter">
          <div class="container h-100">
            <div
              id="sf-content"
              class="row no-gutters h-100 align-items-center justify-content-center hideForAni"
            >
              <div class="col sfcol">
                <div class="head1 white text-center mb-3 text-shadow">
                  Find great deals from top-rated dealers{" "}
                  <sup class="sup">TM</sup>
                </div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" onClick={()=>{this.getVehicleMasterDataByVehicleTypeId(1)}}>
                    <a
                      class="nav-link active"
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
                  <li class="nav-item" onClick={()=>{this.getVehicleMasterDataByVehicleTypeId(2)}}>
                    <a
                      class="nav-link"
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
                  <li class="nav-item" onClick={()=>{this.getVehicleMasterDataByVehicleTypeId(3)}}>
                    <a
                      class="nav-link"
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
                  <li class="nav-item" onClick={()=>{this.getVehicleMasterDataByVehicleTypeId(4)}}>
                    <a
                      class="nav-link"
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
                  <li class="nav-item" onClick={()=>{this.getVehicleMasterDataByVehicleTypeId(5)}}>
                    <a
                      class="nav-link"
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
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="usedCar"
                    role="tabpanel"
                    aria-labelledby="usedCar-tab"
                  >
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
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
                      <li class="nav-item">
                        <a
                          class="nav-link"
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
                      class="tab-content pills-tabContent"
                      id="pills-tabContent"
                    >
                      <div
                        class="tab-pane fade show active"
                        id="by-models"
                        role="tabpanel"
                        aria-labelledby="by-models-tab"
                      >
                        <div class="model-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select onChange={this.onChangeBrand} class="form-control">
                                  <option value={null} selected>
                                    All Brands
                            </option>
                                  {brandList && brandList.length ?
                                    brandList.map((vehicle) => {
                                      return (
                                        <option id={vehicle.brandId}
                                          value={JSON.stringify({ brandId: vehicle.brandId, brand: vehicle.brand })}
                                        >{vehicle.brand}</option>
                                      )
                                    }) :
                                    ''}

                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select disabled={this.state.modelisDisable} onChange={this.onChangeModel} class="form-control">
                                  <option selecte={true} >All Models</option>
                                  {this.state.modelList && this.state.modelList.length ?
                                    this.state.modelList.map((model) => {
                                      return (
                                        <option id={model.modelId} value={JSON.stringify({ modelId: model.modelId, modelName: model.model })}>{model.model}</option>
                                      )
                                    }) : <option>NO Data Found</option>}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select onChange={(e)=>{this.onChangeCountry(e)}} class="form-control">
                                  <option selected>Choose Country</option>
                                  {countryList && countryList.length ?
                                    countryList.map((country) => {
                                      return (
                                        <option value={country.country} id={country.countryId}>{country.country}</option>
                                      )
                                    }) :
                                    <option>Loading...</option>}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="by-price"
                        role="tabpanel"
                        aria-labelledby="by-price-tab"
                      >
                        <div class="price-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                {/* <label class="col-sm-4 col-form-label text-center">
                                  Price
                                </label> */}
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <select onChange={(e)=>{this.onChangeFromPrice(e)}}>
                                      <option selected>From</option>
                                      {priceList && priceList.length ?
                                        priceList.map((price) => {
                                          return (
                                            <option value={price.price} id={price.price}>{price.price}</option>
                                          )
                                        }) :
                                        <option>Loading...</option>}
                                      </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                {/* <label class="col-sm-4 col-form-label text-center">
                                  To
                                </label> */}
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <select onChange={(e)=>{this.onChangeToPrice(e)}}>
                                      <option selected>To</option>
                                      {priceList && priceList.length ?
                                        priceList.map((price) => {
                                          return (
                                            <option value={price.price} id={price.price}>{price.price}</option>
                                          )
                                        }) :
                                        <option>Loading...</option>}
                                      </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div> */}
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select onChange={(e)=>{this.onChangeCountry(e)}}>
                                  <option selected>Choose Country</option>
                                  {countryList && countryList.length ?
                                    countryList.map((country) => {
                                      return (
                                        <option value={country.country} id={country.countryId}>{country.country}</option>
                                      )
                                    }) :
                                    <option>Loading...</option>}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
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
                    class="tab-pane fade"
                    id="truck"
                    role="tabpanel"
                    aria-labelledby="truck-tab"
                  >
                    <ul class="nav nav-pills" id="pills-tab-two" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
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
                      <li class="nav-item">
                        <a
                          class="nav-link"
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
                      class="tab-content pills-tabContent"
                      id="pills-tabContent-two"
                    >
                      <div
                        class="tab-pane fade show active"
                        id="by-models-two"
                        role="tabpanel"
                        aria-labelledby="by-models-tab-two"
                      >
                        <div class="model-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Makes</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Models</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="by-price-two"
                        role="tabpanel"
                        aria-labelledby="by-price-tab-two"
                      >
                        <div class="price-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  Price
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  To
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
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
                    class="tab-pane fade"
                    id="bus"
                    role="tabpanel"
                    aria-labelledby="bus-tab"
                  >
                    <ul
                      class="nav nav-pills"
                      id="pills-tab-three"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
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
                      <li class="nav-item">
                        <a
                          class="nav-link"
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
                      class="tab-content pills-tabContent"
                      id="pills-tabContent-three"
                    >
                      <div
                        class="tab-pane fade show active"
                        id="by-models-three"
                        role="tabpanel"
                        aria-labelledby="by-models-tab-three"
                      >
                        <div class="model-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Makes</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Models</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="by-price-three"
                        role="tabpanel"
                        aria-labelledby="by-price-tab-three"
                      >
                        <div class="price-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  Price
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  To
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
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
                    class="tab-pane fade"
                    id="equipments"
                    role="tabpanel"
                    aria-labelledby="equipments-tab"
                  >
                    <ul
                      class="nav nav-pills"
                      id="pills-tab-four"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
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
                      <li class="nav-item">
                        <a
                          class="nav-link"
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
                      class="tab-content pills-tabContent"
                      id="pills-tabContent-four"
                    >
                      <div
                        class="tab-pane fade show active"
                        id="by-models-four"
                        role="tabpanel"
                        aria-labelledby="by-models-tab-four"
                      >
                        <div class="model-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Makes</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="selectdd">
                                <span class="caret">
                                  <i
                                    class="fa fa-angle-down"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <select>
                                  <option selected>All Models</option>
                                  <option>Loading...</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="by-price-four"
                        role="tabpanel"
                        aria-labelledby="by-price-tab-four"
                      >
                        <div class="price-filter">
                          <div class="row no-gutters align-items-center">
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  Price
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="form-group row align-items-center">
                                <label class="col-sm-4 col-form-label text-center">
                                  To
                                </label>
                                <div class="col-sm-8">
                                  <div class="selectdd">
                                    <span class="caret">
                                      <i
                                        class="fa fa-angle-down"
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
                            <div class="col-md-3 colgrids">
                              <div class="inputtxt">
                                <input
                                  type="text"
                                  value=""
                                  placeholder="Zipcode"
                                />
                              </div>
                            </div>
                            <div class="col-md-3 colgrids">
                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn btn-primary w-100"
                                  onClick={() => { this.handleSearch() }}
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

        <section class="search-showcase spacerTop spacerBottom">
          <div class="container">
            <div class="row">
              {ourLastSearchList && ourLastSearchList.length === 0 ?
                <div class="col-md-4">
                  <div class="ss-cards">
                    <p class="head3 black">Your Last Search</p>
                    <div class="ss-img-wrap">
                      <div
                        class="ss-img"
                        style={{
                          backgroundImage: `url(${Background1})`
                        }}
                      >
                        {" "}
                      </div>
                      <div class="ss-title head3 white text-shadow">
                        2010 Ssangyong Actyon
                      <span>Sports Leather 5Seats 2WD AT</span>
                      </div>
                    </div>
                  </div>
                </div> : ""}

              {savedRecentSearchList && savedRecentSearchList.length === 0 ?
                <div class="col-md-4">
                  <div class="ss-cards">
                    <p class="head3 black">Saved & Recent Searches</p>
                    <div class="ss-img-wrap">
                      <div
                        class="ss-img"
                        style={{
                          backgroundImage: `url(${Background2})`
                        }}
                      ></div>
                      <div class="ss-title head3 white text-shadow">
                        2001 Hyundai Terracan
                      <span>JX250 INTERCOOLER 4WD</span>
                      </div>
                    </div>
                  </div>
                </div>
                : ""}

              {relatedSearchList && relatedSearchList.length === 0 ?
                <div class="col-md-4">
                  <div class="ss-cards">
                    <p class="head3 black">Related Searches</p>
                    <div class="ss-img-wrap">
                      <div
                        class="ss-img"
                        style={{
                          backgroundImage: `url(${Background3})`
                        }}
                      ></div>
                      <div class="ss-title head3 white text-shadow">
                        2004 Kia Sorento NEW
                      <span> 4WD TLX SUNROOF A/T</span>
                      </div>
                    </div>
                  </div>
                </div>
                : ""}
            </div>
          </div>
        </section>

        <section class="everything-know spacerTop spacerBottom hideForAni">
          <div class="container">
            <div class="head2 black medium text-center">
              Everything You Need To Know
            </div>
            <div class="row ">
              <div class="col-md-4">
                <div class="ek-cards text-center">
                  <div class="ek-img">
                    <img
                      src={require("../assets/img/everything/best-deals-mobile.png")}
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="cardBody">
                    <h4 class="head3">Evaluation standard</h4>
                    <p class="desc para1">
                      By comparing price, detailed vehicle data and dealer
                      reviews, we give each used car a deal rating from great to
                      overpriced, and sort the best deals first
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="ek-cards text-center">
                  <div class="ek-img">
                    <img
                      src={require("../assets/img/everything/valuable-insights-mobile.png")}
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="cardBody">
                    <h4 class="head3">Global A/S System</h4>
                    <p class="desc para1">
                      We provide free access to key info like dealer reviews,
                      market value, price drops and days on lot—all on one page
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="ek-cards text-center">
                  <div class="ek-img">
                    <img
                      src={require("../assets/img/everything/search-mobile.jpg")}
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="cardBody">
                    <h4 class="head3">Contact us</h4>
                    <p class="desc para1">
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

        <section class="no-one-trading spacerTop hideForAni">
          <div class="container text-center">
            <div class="head1 white bold">
              Harasow is The No.1 Trading Platform for Korean Used Cars
            </div>
            <p class="head3 white mt-3">
              Harasow is the No.1 trading platform for cars, trucks, buses,
              equipment, spare parts and machinery in S.Korea. As a wholesale
              marketplace for professional autotraders, We offer the safest and
              the cheapest ways to buy items directly from South Korean Sellers.
            </p>
            <div class="row mt-5">
              <div class="col-md-4">
                <div class="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini01.jpg")}
                    class="img-fluid"
                    alt=""
                  />
                  <p class="head2 bold white mt-3">AUTO harasow Media</p>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini02.jpg")}
                    class="img-fluid"
                    alt=""
                  />
                  <p class="head2 bold white mt-3">Why AUTO harasow </p>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="no1-cards">
                  <img
                    src={require("../assets/img/no1/img_autowini03.jpg")}
                    class="img-fluid"
                    alt=""
                  />
                  <p class="head2 bold white mt-3">Harasow Transport</p>
                  <div class="btn-group">
                    <a href="javascript:;" class="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonial spacerTop spacerBottom hideForAni">
          <div class="container">
            <div
              id="carouselExampleControls"
              class="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="row">
                    <div class="col-md-7">
                      <div class="video-holder">
                        <a href="javascript:;" class="d-block">
                          <img
                            src={require("../assets/img/testimonials/video.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="users-holder">
                        <div class="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote class="blockquote">
                          <div>
                            <i class="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p class="mb-0">
                            {" "}
                            CarGurus exceeded my expectations because I met the
                            person that wanted to buy my vehicle at the highest
                            price in a very short period of time.
                          </p>
                          <footer class="blockquote-footer">Matt C</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-md-7">
                      <div class="video-holder">
                        <a href="javascript:;" class="d-block">
                          <img
                            src={require("../assets/img/testimonials/video2.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="users-holder">
                        <div class="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote class="blockquote">
                          <div>
                            <i class="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p class="mb-0">
                            CarGurus put everything in front of me so I could
                            figure out what the right price was for the car that
                            I was looking for.
                          </p>
                          <footer class="blockquote-footer">Alex M</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-md-7">
                      <div class="video-holder">
                        <a href="javascript:;" class="d-block">
                          <img
                            src={require("../assets/img/testimonials/video3.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="users-holder">
                        <div class="heading text-uppercase head3">
                          what our users say
                        </div>
                        <blockquote class="blockquote">
                          <div>
                            <i class="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p class="mb-0">
                            Using CarGurus made me feel empowered because I was
                            able to understand whether I had a good deal before
                            I walked into the dealership.
                          </p>
                          <footer class="blockquote-footer">Dave M</footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>

        <section class="popularcars spacerTop">
          <div class="container">
            <div class="head2 black medium text-center">Popular New Cars</div>
            <ul class="list-group popularcars-staggering mt-3">
              {popularNewCarsList && popularNewCarsList.length ?
                popularNewCarsList.map((car) => {
                  return (
                    <li class="list-group-item" style={{ opacity: 1 }}>
                      <Link to={PATH.SEARCH_DETAIL}>
                        <div class="head3">New Buick Encore</div>
                        <p class="para1">39,042 listings starting at $13,990</p>
                      </Link>
                    </li>
                  )
                })
                :
                <ul class="list-group popularcars-staggering mt-3">
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </Link>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">New Buick Encore</div>
                      <p class="para1">39,042 listings starting at $13,990</p>
                    </a>
                  </li>
                </ul>
              }
            </ul>

          </div>
        </section>

        <section class="popularcars spacerTop spacerBottom">
          <div class="container">
            <div class="head2 black medium text-center">Popular Sedans</div>
            <ul class="list-group mt-3 popularcars-staggering">
              {popularSedansList && popularSedansList.length ?
                popularSedansList.map((sedan) => {
                  return (
                    <li class="list-group-item" style={{ opacity: 1 }} style={{ opacity: 1 }}>
                      <Link to={PATH.SEARCH_DETAIL}>
                        <div class="head3">Used BMW 3 Series</div>
                        <p class="para1">
                          716 Great Deals out of 18,117 listings starting at $1,500
                  </p>
                      </Link>                    </li>
                  )
                }) :
                <ul class="list-group mt-3 popularcars-staggering">
                  <li class="list-group-item" style={{ opacity: 1 }} style={{ opacity: 1 }}>
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </Link>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <Link to={PATH.SEARCH_DETAIL}>
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </Link>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                  <li class="list-group-item" style={{ opacity: 1 }}>
                    <a href="javascript:;">
                      <div class="head3">Used BMW 3 Series</div>
                      <p class="para1">
                        716 Great Deals out of 18,117 listings starting at $1,500
                </p>
                    </a>
                  </li>
                </ul>
              }
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


export default AppWrapper(Upload, null, mapDispatchToProps);
