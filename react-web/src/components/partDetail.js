import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "./public/AppWrapper";
import { formatDate } from "../utils/utils";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { Link } from "react-router-dom";
import Background1 from "../assets/img/search/ssangyong.jpg";
import Background2 from "../assets/img/search/hyundai.jpg";
import Background3 from "../assets/img/search/kia2.jpg";
import $ from "jquery";
import { PATH } from "../utils/Constants";
import { getVehicleDetails } from "../actions/searchAction";
import { showNotification } from "../actions/NotificationAction";

class partDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleDetails: {},
      vehicleId:
        this.props.location.state && this.props.location.state.vehicleId
          ? this.props.location.state.vehicleId
          : null
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Parts Detail";
    const slick = window.slick;
    console.log(slick);
    // this.getVehicleDetails();
  }

  getVehicleDetails = () => {
    const { vehicleId } = this.state;
    this.props.getVehicleDetails({ vehicleId: vehicleId }, response => {
      console.log(response);
      if (response && response.response_code === 0) {
        this.setState({ vehicleDetails: response.response });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <section class="breadcrumb_wrap">
          <div class="container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to={PATH.DASHBOARD}>Home</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link
                    to={{
                      pathname: PATH.ADVANCED_SEARCH,
                      state: {
                        vehicleTypeId: 5
                      }
                    }}
                  >
                    Parts
                  </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Details
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="search_detail">
          <div class="container">
            <div class="carname mt-5 text-left">
              <div class="head1">
                Alternator (Rebuilt) Hyundai Accent 1.3 SOHC
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-7">
                <div class="cargallery">
                  <div class="carsbig">
                    <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    {/* <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div class="imgs">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </div>
                    </div> */}
                  </div>
                  {/* <div class="carssmall">
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="javascript:;" class="d-block">
                        <img
                          src={require("../assets/img/engine.png")}
                          class="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
              <div class="col-lg-5">
                <div class="detail_right">
                  <div class="greatdeal">
                    <div class="head3 text-uppercase medium">
                      <span class="d-inline-block align-middle ml-1">
                        Fitting Model
                      </span>
                    </div>
                    <div class="row para2 mt-3">
                      <div class="col-12">
                        <ul class="para1 partslists">
                          <li>
                            <a href="javascript:;">
                              Car Hyundai Accent 1994 1.3 SOHC
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;">
                              Car Hyundai Accent 1995 1.5 SOHC
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;">
                              Car Hyundai Accent 1996 1.3 SOHC
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;">
                              Car Hyundai Accent 1997 1.5 SOHC
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-12 text-right">
                        <a href="javascript:;" class="btn btn-secondary btn-sm">
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="contact_dealer mt-4">
                    <div class="row no-gutters">
                      <div class="col">
                        <div class="para1 medium">Unit Weight</div>
                      </div>
                      <div class="col text-right">
                        <div class="para1 medium">5.5 kg</div>
                      </div>
                    </div>
                    <hr />
                    <div class="row no-gutters">
                      <div class="col-xl-9 col-lg-8 col-6">
                        <div class="para1 medium">Quantity</div>
                      </div>
                      <div class="col-xl-3 col-lg-4 col-6 text-right">
                        <div class="para1 medium">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <button type="button" class="quantity_btn">
                                <i class="fas fa-minus-circle"></i>
                              </button>
                            </div>
                            <input
                              type="text"
                              class="form-control text-center"
                              value="1"
                            />
                            <div class="input-group-append">
                              <button type="button" class="quantity_btn">
                                <i class="fas fa-plus-circle"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row no-gutters">
                      <div class="col-12">
                        <div class="para1 medium">Your Country</div>
                      </div>
                      <div class="col-12 text-right">
                        <div class="para1 medium mt-2">
                          <select name="" id="" class="form-control">
                            <option value="">S. Korea</option>
                            <option value="">N. Korea</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row no-gutters">
                      <div class="col-12">
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="customRadioInline1"
                          >
                            DHL
                          </label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline2"
                            name="customRadioInline1"
                            checked
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="customRadioInline2"
                          >
                            FedEx
                          </label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline3"
                            name="customRadioInline1"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="customRadioInline3"
                          >
                            IMS
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="row no-gutters">
                      <div class="col">
                        <div class="para1 medium">Shipping Charges</div>
                      </div>
                      <div class="col text-right">
                        <div class="para1 medium">Not Support</div>
                      </div>
                    </div>
                    <hr />
                    <div class="row no-gutters">
                      <div class="col">
                        <div class="head3 medium red">Total Price</div>
                      </div>
                      <div class="col text-right">
                        <div class="head2 medium red">USD 85.6</div>
                      </div>
                    </div>
                    <div class="form-group mt-4">
                      <button type="button" class="btn btn-primary w-100">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="spacer1"></div>
            <div class="spacer1"></div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    },
    getVehicleDetails: (params, callback) => {
      dispatch(getVehicleDetails(params, callback));
    }
  };
};

export default AppWrapper(partDetail, null, mapDispatchToProps);
