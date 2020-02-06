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

class ProductRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: store.get("userSession"),
      isdisable: false,
      input_object: {
        files: [],
        vehicleTypeId: 1,
      },
      preview: [],
      master: {}
    };
  }

  componentDidMount() {
    console.log(this.state.userInfo);
    // if(!this.state.userInfo || !this.state.userInfo.memberShipId || this.state.userInfo.memberShipId==0){
    //   this.props.history.push("/");
    // }
    document.title = "Auto Harasow | Add New Car";
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
    let preview = this.state.preview;
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

    reader.onloadend = () => {
      preview.push(reader.result);
      this.setState({
        preview: preview
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  removePhoto = (index) => {
    let preview = this.state.preview ? this.state.preview : [];
    let input_object = this.state.input_object;
    let files = input_object.files ? input_object.files : []; 
    files.splice(index,1);
    preview.splice(index,1);
    input_object.files = files;
    this.setState({preview, input_object});
  }

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
    const user = store.get('userSession');
    item.userId = user && user.userInfo && user.userInfo.userId ? user.userInfo.userId : null;
    let formData = this.getFormData(item);
    //When logging a formData object with just console.log(formData) it always returns empty,
    //as you can't log formData.
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    this.props.productRegistration(formData, response => {
      console.log(response.response.response_code);
      if (response && response.response_code === 0) {
        this.props.showNotification(response.response_message, "success");
        this.props.history.push(PATH.MEMBERSHIPFEE);
      } else {
        this.props.showNotification(response.response_message, "error");
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
      <React.Fragment>
        <section class="container_shipping">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="sidelinks">
                  <div class="slhead text-center medium head3">Sell</div>
                  <ul class="sllinks medium">
                    <li>
                      <a href="javascript:;">
                        Place an AD
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="membership-fee.html">
                        Membership Fee
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li class="active">
                      <a href="register-items.html">
                        Register items
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                      <ul class="sidebarsubmenu">
                        <li class="active">
                          <a href="register-form.html">Car</a>
                        </li>
                        <li>
                          <a href="register-form.html">
                            Trucks / Special vehicle
                          </a>
                        </li>
                        <li>
                          <a href="register-form.html">Bus</a>
                        </li>
                        <li>
                          <a href="register-form.html">Equipment / Part</a>
                        </li>
                        <li>
                          <a href="register-form.html">Parts / Accessories</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9">
                <div class="head1 medium">Register Card Details</div>

                <div class="registerbox mt-5">
                  <p class="para1">Please fill out the form.</p>
                  <div class="row rbform no-gutters mt-4">
                    <div class="col-12">
                      <div class="row mb-4 ">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">Select Brand</label>
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
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">Select Model</label>
                            <select
                              className="form-control"
                              name="model"
                              id="model"
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
                        </div>
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">
                              Select Model Details
                            </label>
                            <select
                              className="form-control"
                              name="modelDetail"
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
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">Title</label>
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
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">Description</label>
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
                        <div class="col-lg-4 col-md-4">
                          <div class="form-grop">
                            <label class="label bold">Price</label>
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
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Country</label>
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
                        </div>

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Year</label>
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Mileage</label>
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
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Transmission Type</label>
                            <select
                              className="form-control"
                              name="transmission"
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Fuel Type</label>
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Steering Type</label>
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
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Condition Type</label>
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
                        </div>

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Deals</label>
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Memberships</label>
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
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Interior Color</label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="interiorcolor"
                              onChange={e => {
                                this.handleOnChange(e);
                              }}
                            />{" "}
                          </div>
                        </div>

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Exterior Color</label>
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Location</label>
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

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Engine Type</label>
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

                        <div class="col-lg-4 col-md-4">
                          <div class="form-group">
                            <label class="label bold">Seat Type</label>
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

                      <div class="row mb-4">
                        <div class="col-12">
                          <div class="form-grop">
                            <label class="label bold">File Upload</label>
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="image"
                                onChange={e => {
                                  this.handleOnChange(e);
                                }}
                              />
                              <label class="custom-file-label" for="customFile">
                                Choose file
                              </label>
                            </div>
                          </div>
                          <div class="imgpreview row no-gutters">
                            {this.state.preview && this.state.preview.length
                              ? this.state.preview.map((item,index) => {
                                  return (
                                    <div class="prevfile col">
                                      <a href="javascript:;" class="removefile" onClick={()=>{this.removePhoto(index)}}>
                                        <i class="fas fa-times-circle"></i>
                                      </a>
                                      <img
                                        src={item}
                                        class="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                  );
                                })
                              : " "}
                          </div>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col-12">
                          <div class="form-grop">
                            <label class="label bold">Details</label>
                            <textarea
                              name=""
                              id=""
                              rows="5"
                              class="form-control"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col-lg-4 col-md-6">
                          <div class="form-grop">
                            <input
                              type="submit"
                              value="Submit"
                              class="btn btn-primary btn-block"
                              onClick={(e)=>{this.submit(e)}}
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div class="form-grop">
                            <input
                              type="submit"
                              value="Cancel"
                              class="btn btn-secondary btn-block"
                            />
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
      </React.Fragment>
    );
  }
}

ProductRegistrationForm.propTypes = {};

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
    }
  };
};

export default AppWrapper(ProductRegistrationForm, null, mapDispatchToProps);
