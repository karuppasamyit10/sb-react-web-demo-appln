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
import { PATH } from '../utils/Constants';
import { getSearchResult, getMasterData } from '../actions/searchAction';
import acura from "../assets/img/acura.jpeg";
import { showNotification } from "../actions/NotificationAction";

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      master: {},
      isSubscribed: false
    };
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    let params = {};
    this.props.getSearchResult(params, (response) => {
      console.log(response);
    });
    this.props.getMasterData({}, (response) => {
      console.log(response);
      if (response && response.response_code === 0) {
        this.setState({ master: response.response });
      }
    })
  }

  subscribe = () => {
    this.setState({ isSubscribed: true })
    this.props.showNotification('Successfully Subscribed', 'success');
  }
  searchDetails = () => {
    this.props.history.push(PATH.SEARCH_DETAIL)
  }

  render() {
    let { carBrandList } = this.state.master
    return (
      <React.Fragment>
        <section class="adv_search_wrap">
          <div class="container">
            <div class="mt-5">
              {/* <p class="head2">
                Used <strong> Acura ILX</strong> for Sale in{" "}
                <strong> Manitowish Waters,</strong> WI
              </p> */}
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div class="filters_wrap">
                  <div class="filters filter_1">
                    <ul
                      class="nav nav-pills mb-3 justify-content-center"
                      id="pills-tab"
                      role="tablist"
                    >
                      {/*<li class="nav-item">
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
                      </li> */}
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="pills-bycar"
                        role="tabpanel"
                        aria-labelledby="pills-bycar-tab"
                      >
                        <div class="form-group">
                          <select name="" id="" class="form-control">
                            <option value="" selected>
                              All Brands
                            </option>
                            {carBrandList && carBrandList.length ?
                              carBrandList.map((car) => {
                                return (
                                  <option id={car.carBrandId} value="">{car.carBrand}</option>
                                )
                              }) :
                              ''}

                          </select>
                        </div>
                        <div class="form-group">
                          <select name="" id="" class="form-control">
                            <option value="" selected>
                              Select Model
                            </option>
                            <option value="">ILX</option>
                            <option value="">MDX</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <div class="row align-items-center">
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  All Years
                                </option>
                                <option value="">2019</option>
                                <option value="">2018</option>
                              </select>
                            </div>
                            <div class="col-2">to</div>
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  All Years
                                </option>
                                <option value="">2019</option>
                                <option value="">2018</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="row align-items-center">
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  All
                                </option>
                                <option value="">2019</option>
                                <option value="">2018</option>
                              </select>
                            </div>
                            <div class="col-2">to</div>
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  All
                                </option>
                                <option value="">2019</option>
                                <option value="">2018</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <select name="" id="" class="form-control">
                            <option value="" selected>
                              Select Car
                            </option>
                            <option value="">Audi</option>
                            <option value="">BMW</option>
                          </select>
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
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">$ 1000</option>
                                <option value="">$ 2000</option>
                              </select>
                            </div>
                            <div class="col-2">to</div>
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">$ 1000</option>
                                <option value="">$ 2000</option>
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
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">50,000</option>
                                <option value="">80,000</option>
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
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  Any
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio2"
                                >
                                  Automatic
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio3"
                                  value="option3"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio3"
                                >
                                  Manual
                                </label>
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
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">$ 1000</option>
                                <option value="">$ 2000</option>
                              </select>
                            </div>
                            <div class="col-2">to</div>
                            <div class="col-5">
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">$ 1000</option>
                                <option value="">$ 2000</option>
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
                              <select name="" id="" class="form-control">
                                <option value="" selected>
                                  ---{" "}
                                </option>
                                <option value="">50,000</option>
                                <option value="">80,000</option>
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
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="option1"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  Any
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="option2"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio2"
                                >
                                  Automatic
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio3"
                                  value="option3"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio3"
                                >
                                  Manual
                                </label>
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
                    </div>
                  </div>
                  <div class="filters filter_2">
                    <div class="head3 mb-2">Filter Results</div>
                    <div class="form-group">
                      <label for="">Price</label>
                      <div id="price_slider"></div>
                      <input
                        type="text"
                        id="price_slider_value"
                        value="$1000 - $5000"
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
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
                      <label for="">Mileage</label>
                      <div id="mileage_slider"></div>
                      <input
                        type="text"
                        id="mileage_slider_value"
                        value="$1000 - $5000"
                        readonly
                        style={{
                          border: "0px",
                          color: "#000",
                          fontWeight: "bold",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%"
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Transmission</label>
                      <ol id="selectable_transmission" class="selectable">
                        <li class="ui-widget-content">Any</li>
                        <li class="ui-widget-content">Manual</li>
                        <li class="ui-widget-content">Automatic</li>
                      </ol>
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
                      <label for="">Days on Market</label>
                      <div id="days_slider"></div>
                      <input
                        type="text"
                        id="days_slider_value"
                        value="0 days - 80 days"
                        readonly
                        style={{
                          border: "0px",
                          color: "#000",
                          fontWeight: "bold",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%"
                        }}
                      />
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
                      <div class="row align-items-center justify-content-between">
                        <div class="col-6">
                          <label for="">Deal Ratings</label>
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
                            id="deal_checkbox1"
                          />
                          <label class="form-check-label" for="deal_checkbox1">
                            <span class="fair">
                              <i class="fas fa-arrow-circle-right"></i>
                            </span>{" "}
                            Fair Deal (1)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="deal_checkbox2"
                          />
                          <label class="form-check-label" for="deal_checkbox2">
                            <span class="high">
                              <i class="fas fa-arrow-circle-down"></i>
                            </span>{" "}
                            High Price (0)
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="deal_checkbox3"
                          />
                          <label class="form-check-label" for="deal_checkbox3">
                            <span class="over">
                              <i class="fas fa-arrow-circle-down"></i>
                            </span>{" "}
                            Overpriced (2)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
                      <label for="">Fuel Efficiency</label>
                      <div id="fuel_slider"></div>
                      <input
                        type="text"
                        id="fuel_slider_value"
                        value=""
                        readonly
                        style={{
                          border: "0px",
                          color: "#000",
                          fontWeight: "bold",
                          background: "transparent",
                          textAlign: "center",
                          width: "100%"
                        }}
                      />
                    </div>
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
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
                    </div>
                  </div>
                  <div class="filters filter_3">
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
                  </div>
                </div>
              </div>
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
                {!this.state.isSubscribed ?
                  <div class="emailbox">
                    <div class="row">
                      <div class="col-12 medium text-center">
                        Email me price drops and new listings for these results.
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
                  </div> : ''}
                <div class="totalresults text-right py-3 mt-3">
                  <span class="bold">1 - 6</span> out of{" "}
                  <span class="bold">6</span> listings
                </div>
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left" onClick={() => { this.searchDetails() }}>
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left">
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left">
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left">
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left">
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
                <div class="row searched_cards align-items-center">
                  <div class="col-md-3 text-center">
                    <img src={acura} class="w-100 img-fluid" alt="" />
                  </div>
                  <div class="col-md-9 text-left">
                    <div class="row no-gutters align-items-center">
                      <div class="col pr-3">
                        <div class="head3 bold mb-2">
                          2017 Acura ILX FWD with AcuraWatch Plus Package
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
                                <a class="blue small" href="javascript:;">
                                  $286/mo est.
                                </a>
                                <div class="blue">Includes $338 delivery.</div>
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
    getSearchResult: (params, callback) => {
      dispatch(getSearchResult(params, callback));
    },
    getMasterData: (params, callback) => {
      dispatch(getMasterData(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default AppWrapper(AdvancedSearch, null, mapDispatchToProps);
