import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { AppWrapper } from "../public/AppWrapper";
import { logInUser, userRegistration } from "../../actions/userAction";
import { getVehicleMasterData } from "../../actions/searchAction";
import { showNotification } from "../../actions/NotificationAction";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isdisable: false,
      input_object: {
        files: []
      }
    };
  }

  componentDidMount() {
    document.title = "Auto Harasow | Add New Item";
    this.getVehicleMasterData();
  }

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

    reader.onloadend = () => {
      files.push(reader.result);
      input_object.files = files;
      this.setState(
        {
          input_object: input_object
        },
        () => {
          console.log(this.state);
        }
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
  };

  render() {
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
                    <div class="form-right">
                      <select
                        class="form-control"
                        name="brand"
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      >
                        <option value="1">Audi</option>
                        <option value="2">BMW</option>
                        <option value="3">Ford</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Country</label>
                    <div class="form-right">
                      <select
                        class="form-control"
                        name="country"
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      >
                        <option value="1">Tamilnadu</option>
                        <option value="2">Malasia</option>
                        <option value="3">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Transmission Type</label>
                    <div class="form-right">
                      <select
                        class="form-control"
                        name="transmission"
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      >
                        <option value="1">Automatic</option>
                        <option value="2">Manual</option>
                        <option value="3">CVT</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group align-items-center">
                    <label class="bold form-left">Condition Type</label>
                    <div class="form-right">
                      <select
                        class="form-control"
                        name="condition"
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      >
                        <option value="1">New</option>
                        <option value="2">User</option>
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
                        name="ecolor"
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
                  <div class="form-right">
                    <select
                      class="form-control"
                      name="model"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    >
                      <option value="1">A1</option>
                      <option value="2">A2</option>
                      <option value="3">A3</option>
                    </select>
                  </div>
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
                <div class="form-group align-items-center">
                  <label class="bold form-left">Fuel Type</label>
                  <div class="form-right">
                    <select
                      class="form-control"
                      name="fuel"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    >
                      <option value="1">Petrol</option>
                      <option value="2">Diesel</option>
                      <option value="3">Electric</option>
                    </select>
                  </div>
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
                <div class="form-group align-items-center">
                  <label class="bold form-left">Engine</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="engine"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    />
                  </div>
                </div>
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
                      class="form-control"
                      name="steering"
                      onChange={e => {
                        this.handleOnChange(e);
                      }}
                    >
                      <option value="1">LHD</option>
                      <option value="2">RHD</option>
                    </select>
                  </div>
                </div>
                <div class="form-group align-items-center">
                  <label class="bold form-left">Interior color</label>
                  <div class="form-right">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="icolor"
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
    logInUser: (username, password, callback) => {
      dispatch(logInUser(username, password, callback));
    },
    registration: (inputObject, callback) => {
      dispatch(userRegistration(inputObject, callback));
    },
    getVehicleMasterData: (params, callback) => {
      dispatch(getVehicleMasterData(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default AppWrapper(addItem, null, mapDispatchToProps);
