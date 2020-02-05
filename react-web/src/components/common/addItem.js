import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { AppWrapper } from "../public/AppWrapper";
import { logInUser, userRegistration } from "../../actions/userAction";
import {
  getVehicleMasterData,
  getVehicleModelList,
  getVehicleDetailedModelList
} from "../../actions/searchAction";
import { showNotification } from "../../actions/NotificationAction";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { productRegistration } from "../../actions/userAction";

class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isdisable: false,
      input_object: {
        files: [],
        vehicleTypeId: 1,
      },
      master: {}
    };
  }

  componentDidMount() {
    document.title = "Auto Harasow | Add New Item";
    // this.getVehicleMasterData();
    this.getAllMasterByvehicleTypeId();
  }

  getAllMasterByvehicleTypeId = () => {
    this.props.getVehicleMasterData(
      { vehicleTypeId: this.state.input_object.vehicleTypeId },
      response => {
        console.log(response);
        if (response && response.response_code === 0) {
          this.setState({ master: response.response }, () => {
            this.setState({ fromYearList: this.state.master.yearList });
            this.setState({ toYearList: this.state.master.yearList });
            this.setState({ fromPriceList: this.state.master.priceList });
            this.setState({ toPriceList: this.state.master.priceList });
            this.setState({ toMileageList: this.state.master.mileageList });
          });
        }
      }
    );
  };

  getVehicleMasterData = () => {
    this.props.getVehicleMasterData({}, response => {
      if (response && response.response_code === 0) {
        this.setState({ countryList: response.response.countryList });
      }
    });
  };

  handleImageRead = e => {
    e.preventDefault();
    let input_object = this.state.input_object;
    let files = input_object.files ? input_object.files : [];
    const reader = new FileReader();
    const file = e.target.files[0];

    files.push(file);
    input_object.files = files;
    this.setState(
      {
        input_object: input_object
      },
      () => {
        console.log(this.state);
      }
    );

    // reader.onloadend = () => {
    //   files.push(reader.result);
    //   input_object.files = files;
    //   this.setState(
    //     {
    //       input_object: input_object
    //     },
    //     () => {
    //       console.log(this.state);
    //     }
    //   );
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  handleOnChange = e => {
    let { target } = e;
    let { input_object } = this.state;
    let { name, value } = target;
    if (name === "image") {
      this.handleImageRead(e);
    }
    input_object[name] = value;
    this.setState({ input_object: input_object }, () => {
      console.log(this.state);
    });
  };

  getFormData = object => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  };

  submit = e => {
    e.preventDefault();
    const item = this.state.input_object;
    let formData = this.getFormData(item);
    //When logging a formData object with just console.log(formData) it always returns empty,
    //as you can't log formData.
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    this.props.productRegistration(formData, response => {
      console.log(response.response.response_code);
      if(response && response.response_code === 0){
        this.props.showNotification(response.response_message,'success')
      }else{
        this.props.showNotification(response.response_message,'error')
      }
    });
  };

  handleChangeBrand = e => {
    let { target } = e;
    let { input_object } = this.state;
    let { name, value } = target;
    input_object[name] = value;

    this.setState({ [e.target.name]: e.target.value, input_object });
    let { brandList, modelList } = this.state.master;

    let found = brandList.find(car => {
      return car.brand === e.target.value;
    });
    if (found && modelList) {
      this.getVehicleModelList(found.brandId);
    }
  };

  getVehicleModelList = brandId => {
    this.setState({ isLoading: true });
    this.props.getVehicleModelList({ brandId: brandId }, response => {
      this.setState({ isLoading: false });
      if (response.response_code === 0) {
        let master = this.state.master;
        master.modelList = response.response.modelList;
        this.setState({ master: master });
      }
    });
  };

  handleChange = e => {
    let { target } = e;
    let { input_object } = this.state;
    let { name, value } = target;
    if (name === "image") {
      this.handleImageRead(e);
    }
    input_object[name] = value;

    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value, input_object });
    if (e.target.name === "model") {
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

  onChangeDropDown = e => {
    let { target } = e;
    let { input_object } = this.state;
    let { name, value } = target;
    input_object[name] = value;
    this.setState({ [e.target.name]: e.target.value, input_object });
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

  render() {
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
    return (
      <section class="">
        <div class="container">
          <div class="row">
            <div class="col-md-12 form-wrap">
              <h1 class="form-header">ADD NEW ITEM</h1>
              <p class="lead">
                Joinfree at Harasow, the No.1 Trading Platform for Korean Used
                Cars.
              </p>
            </div>
            <form class="row col-md-12">
              <div class="col-md-3">
                <div class="col-lg-12">
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Type</label>
                    <div class="form-right">
                      <select
                        class="form-control"
                        name="type"
                        disabled
                        value={this.state.input_object.vehicleTypeId}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      >
                        <option value="1">Car</option>
                        <option value="2">Truck</option>
                        <option value="3">Equipment</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Brand</label>
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
                          name="brand"
                          id="brand"
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
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Country</label>
                    {countryList ? (
                      <div class="form-group">
                        <select
                          name="country"
                          id="country"
                          disabled={
                            countryList && countryList.length ? false : true
                          }
                          value={this.state.country}
                          onChange={e => {
                            this.onChangeDropDown(e);
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
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Transmission Type</label>
                    {transmissionTypeList ? (
                      <div class="form-group">
                        <select
                          className="form-control"
                          name="transmission"
                          onChange={e => {
                            this.handleChange(e);
                          }}
                          disabled={
                            transmissionTypeList && transmissionTypeList.length
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
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group align-items-center">
                    <label class="bold form-left">Deals</label>
                    <select
                      className="form-control"
                      name="dealsType"
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      disabled={
                        dealsTypeList && dealsTypeList.length ? false : true
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

                  <div class="form-group align-items-center">
                    <label class="bold form-left">Condition Type</label>
                    {conditionTypeList ? (
                      <div class="form-right">
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
                          <option>All Condition</option>
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
                    ) : (
                      " "
                    )}
                  </div>

                  <div class="form-group align-items-center">
                    <label class="bold form-left">Location</label>
                    <div class="form-right">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="location"
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group align-items-center">
                  <label class="bold form-left">Name</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="name"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Model</label>
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
                        name="model"
                        id="model"
                        disabled={modelList && modelList.length ? false : true}
                        onChange={this.handleChange}
                        value={this.state.models}
                      >
                        <option value="">All Models</option>
                        {modelList &&
                          modelList.map(model => {
                            return (
                              <option id={model.modelId} value={model.model}>
                                {model.model}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Price</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="price"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
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
                              fuelTypeList && fuelTypeList.length ? false : true
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

                <div class="form-group align-items-center">
                  <label class="bold form-left">Memberships</label>
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

                <div class="form-group align-items-center">
                  <label class="bold form-left">Interior color</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="interiorcolor"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group align-items-center">
                  <label class="bold form-left">Engine Type</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="engineType"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>

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
                          engineTypeList && engineTypeList.length ? false : true
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
              </div>

              <div class="col-md-3">
                <div class="form-group align-items-center">
                  <label class="bold form-left">Description</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="description"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Model Details</label>
                  <select
                    className="form-control"
                    name="modelDetail"
                    onChange={e => {
                      this.handleChange(e);
                    }}
                    disabled={
                      modelDetailList && modelDetailList.length ? false : true
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
                <div class="form-group align-items-center">
                  <label class="bold form-left">Year</label>
                  <div class="form-right">
                    <select
                      class="form-control"
                      name="year"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    >
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Mileage</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="mileage"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Steering Type</label>
                  <div class="form-right">
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

                <div class="form-group align-items-center">
                  <label class="bold form-left">Exterior Color</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="exteriorcolor"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group align-items-center">
                  <label class="bold form-left">Seat Type</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="seatsType"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group align-items-center">
                  <label class="bold form-left">Image</label>
                  <div class="form-right">
                    <input
                      type="file"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="image"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                    <div className="mt-5">
                      <img
                        src={
                          this.state.input_object.files[0]
                            ? this.state.input_object.files[0]
                            : ""
                        }
                        style={{ height: "50%", width: "50%" }}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 mb-5 ml-3">
                <button
                  className="btn btn-primary text-center"
                  onClick={e => {
                    this.submit(e);
                  }}
                >
                  submit
                </button>
                <button className="btn btn-primary text-center ml-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

addItem.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    productRegistration: (params, callback) => {
      dispatch(productRegistration(params, callback));
    },
    getVehicleMasterData: (params, callback) => {
      dispatch(getVehicleMasterData(params, callback));
    },
    getVehicleModelList: (params, callback) => {
      dispatch(getVehicleModelList(params, callback));
    },
    getVehicleDetailedModelList: (params, callback) => {
      dispatch(getVehicleDetailedModelList(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    },
  };
};

export default AppWrapper(addItem, null, mapDispatchToProps);
