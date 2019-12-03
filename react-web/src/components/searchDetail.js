import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "./public/AppWrapper";
import { formatDate } from "../utils/utils";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import store from "store";
import { Link } from "react-router-dom";
import Background1 from "../assets/img/search/ssangyong.jpg";
import Background2 from "../assets/img/search/hyundai.jpg";
import Background3 from "../assets/img/search/kia2.jpg";
import $ from "jquery";
import { PATH } from "../utils/Constants";
import { getVehicleDetails } from "../actions/searchAction";
import { showNotification } from "../actions/NotificationAction";

class searchDetail extends Component {
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
    document.title = "Auto Harasow | Search Detail";
    const slick = window.slick;
    console.log(slick);
    this.getVehicleDetails();
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
                        vehicleTypeId: this.state.vehicleId
                      }
                    }}
                  >
                    Used Cars
                  </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Jeep
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="search_detail">
          <div class="container">
            <div class="row mt-5 align-items-center">
              {/* <div class="col-md-3">
                                <a href="javascript:;" class="d-block text-center allresults">
                                    <span class="d-block"><i class="fas fa-arrow-left"></i></span>
                                    All Results
          </a>
                            </div> */}
              {/* <div class="col-md-9">
                                <div class="allcars">
                                    <div>
                                        <div class="thumbs text-center">
                                            <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="thumbs text-center">
                                             <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="thumbs text-center">
                                        <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="thumbs text-center">
                                        <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="thumbs text-center">
                                        <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="thumbs text-center">
                                        <img src={require("../assets/img/detail/thumb.jpeg")} class="img-fluid" alt="" />
                                            <div class="price bold">
                                                <span class="green d-inline-block align-middle"><i class="fas fa-arrow-circle-up"></i></span>
                                                <span class="d-inline-block align-middle">$15,999</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> */}
            </div>
            <div class="carname mt-5 text-center">
              <div class="head1">
                {this.state.vehicleDetails &&
                this.state.vehicleDetails.vehicleName
                  ? this.state.vehicleDetails.vehicleName
                  : ""}
              </div>
              <div class="head3">Neenah, WI · 33 miles away</div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-7">
                <div class="cargallery">
                  <div class="carsbig">
                    <Carousel>
                      <div class="imgs">
                        <iframe
                          class="frameVideo"
                          src="https://www.youtube.com/embed/V7OY0tQ_PeA"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big2.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big3.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big4.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big6.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big3.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big5.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                      <div class="imgs zoomit">
                        <img
                          src={require("../assets/img/detail/big/big6.jpeg")}
                          class="img-fluid"
                          alt=""
                        />
                        <div class="clickdrag">
                          <i class="fas fa-mouse"></i> Click and drag to zoom
                          image
                        </div>
                      </div>
                    </Carousel>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="detail_right">
                  <div class="greatdeal">
                    <div class="head3 text-uppercase medium">
                      <span class="green d-inline-block align-middle">
                        <i class="fas fa-arrow-circle-up"></i>
                      </span>
                      <span class="d-inline-block align-middle ml-1">
                        great deal
                      </span>
                    </div>
                    <div class="row para2 mt-3">
                      <div class="col-md-4 text-center">
                        <div class="text-uppercase">below market</div>
                        <div>$2,140</div>
                      </div>
                      <div class="col-md-4 text-center">
                        <div class="text-uppercase">dealer rating</div>
                        <div>
                          <div class="ratings">
                            <a href="javascript:;" class="fill">
                              <i class="fas fa-star"></i>
                            </a>
                            <a href="javascript:;" class="fill">
                              <i class="fas fa-star"></i>
                            </a>
                            <a href="javascript:;" class="fill">
                              <i class="fas fa-star"></i>
                            </a>
                            <a href="javascript:;" class="fill">
                              <i class="fas fa-star"></i>
                            </a>
                            <a href="javascript:;" class="empty">
                              <i class="fas fa-star"></i>
                            </a>
                          </div>
                        </div>
                        <div>
                          <a href="javascript:;">15 Reviews</a>
                        </div>
                      </div>
                      <div class="col-md-4 text-center">
                        <div class="text-uppercase">EST. Payment</div>
                        <div>
                          <a href="javascript:;" class="blue">
                            $295
                          </a>
                        </div>
                        <div>
                          <a href="javascript:;">Payment Calculator</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="contact_dealer mt-4">
                    <div class="row no-gutters">
                      <div class="col">
                        <div class="para1 medium">Contact Dealer</div>
                      </div>
                      <div class="col text-right">
                        <div class="para1 medium">(920) 000-0000</div>
                      </div>
                    </div>
                    <div class="para_form">
                      Hi, my name is
                      <input
                        type="text"
                        name="firstName"
                        maxlength="50"
                        value=""
                        id="firstName"
                        placeholder="First name"
                        class="form-control"
                      />
                      <input
                        type="text"
                        name="lastName"
                        maxlength="50"
                        value=""
                        id="lastName"
                        placeholder="Last name"
                        class="form-control"
                      />{" "}
                      and
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        class="form-control"
                      >
                        <option value="">I'm interested in this</option>
                        <option value="I'd like to know your best price for this">
                          I'd like to know your best price for this
                        </option>
                        <option value="I'd like to test drive this">
                          I'd like to test drive this
                        </option>
                        <option value="I'm interested in this" selected="">
                          I'm interested in this
                        </option>
                        <option value="I'd like a history report for this vehicle">
                          I'd like a history report for this vehicle
                        </option>
                      </select>
                      <strong>2016 Jeep Compass</strong>. I'm in the
                      <input
                        type="text"
                        name="postalCode"
                        maxlength="7"
                        value="54324"
                        id="postalCode"
                        class="form-control"
                        placeholder="ZIP"
                      />{" "}
                      area. You can reach me by email at
                      <input
                        type="text"
                        name="emailAddress"
                        maxlength="200"
                        value=""
                        id="emailAddress"
                        placeholder="Email Address"
                        class="form-control"
                      />{" "}
                      or phone at
                      <input
                        type="tel"
                        name="phoneNumber"
                        maxlength="16"
                        value=""
                        id="phoneNumber"
                        class="form-control"
                        title="Please enter 10 digits for the phone number"
                        phonenumber=""
                      />
                      . <span id="lead-ty-signature">Thank you!</span>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="option_checkbox3"
                      />
                      <label class="form-check-label" for="option_checkbox3">
                        Email me price drops and new listings for my search
                      </label>
                    </div>
                    <div class="form-group mt-4">
                      <button type="button" class="btn btn-primary w-100">
                        Send Message
                      </button>
                    </div>
                  </div>
                  <div class="disclaimer">
                    *By clicking "Send Message" or "Chat", I agree to CarGurus
                    providing my contact information and conversation
                    transcript, including all details provided therein, to the
                    dealer and to receiving calls and text messages about
                    vehicles from the dealer selling this car at the number
                    provided (including via autodial or prerecorded calls) or
                    via my other contact information provided above. This
                    consent does not require me to buy anything. I also
                    acknowledge that I have read and agree to the Terms of Use
                    and Privacy Policy. Standard message and data rates may
                    apply.
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3 mb-5">
              <div class="col-lg-7">
                <div class="summary">
                  <div class="head3 medium">Listing Summary</div>
                  <table class="table table-striped mt-3">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Dealer's Price:</strong>
                        </td>
                        <td>
                          <strong>$15,999</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Location:</strong>
                        </td>
                        <td>Neenah, WI · 33 miles away</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mileage:</strong>
                        </td>
                        <td>9,313 miles</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Transmission:</strong>
                        </td>
                        <td>Automatic</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Exterior Color:</strong>
                        </td>
                        <td>Gray</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Interior Color:</strong>
                        </td>
                        <td>Black</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Engine:</strong>
                        </td>
                        <td>14</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Drivetrain:</strong>
                        </td>
                        <td>Four-Wheel Drive</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>VIN:</strong>
                        </td>
                        <td>1C4NJDEB4GD793424</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Stock #:</strong>
                        </td>
                        <td>12118</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Major Options:</strong>
                        </td>
                        <td>
                          Bluetooth, Backup Camera, Sunroof/Moonroof, Remote
                          Start, Navigation System
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="negotiation border-bottom pt-5 pb-5">
                  <div class="head3 medium">Negotiation</div>
                  <div class="row mt-3">
                    <div class="col para1">
                      <span class="blue">
                        <i class="fas fa-calendar-day"></i>
                      </span>{" "}
                      10 days on CarGurus 13 saves{" "}
                      <span class="green">
                        <i class="fas fa-heart"></i>
                      </span>
                    </div>
                    <div class="col para1">
                      <span class="blue">
                        <i class="fas fa-tags"></i>
                      </span>{" "}
                      No price changes
                    </div>
                  </div>
                </div>
                <div class="vehicle pt-5 pb-5">
                  <div class="head3 medium">Vehicle History</div>
                  <div class="row mt-3">
                    <div class="col-md-4 para1">
                      <div class="row no-gutters align-items-center">
                        <div class="col icon">
                          <span class="blue head1">
                            <i class="fas fa-check-circle"></i>
                          </span>
                        </div>
                        <div class="col">
                          <div class="bold">Title Check</div>
                          <div>No issues reported</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 para1">
                      <div class="row no-gutters align-items-center">
                        <div class="col icon">
                          <span class="blue head1">
                            <i class="fas fa-car-crash"></i>
                          </span>
                        </div>
                        <div class="col">
                          <div class="bold">Accident Check</div>
                          <div>No issues reported</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 para1">
                      <div class="row no-gutters align-items-center">
                        <div class="col icon">
                          <span class="blue head1">
                            <i class="fas fa-user"></i>
                          </span>
                        </div>
                        <div class="col">
                          <div class="bold">One Owner</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="detailright2">
                  <div class="sellerinfo">
                    <div class="head3 mb-2">
                      <a href="javascript:;">Mighty Auto Sales</a>
                    </div>
                    <div class="para1">
                      <div>Today 9:00 AM - 8:00 PM (Open Now)</div>
                      <div>
                        <span class="d-inline-block align-middle">
                          <i class="fas fa-phone"></i>
                        </span>
                        <span class="d-inline-block align-middle">
                          (920) 000-0000
                        </span>
                      </div>
                      <div>
                        <span class="d-inline-block align-middle">
                          <i class="fas fa-home"></i>
                        </span>
                        <span class="d-inline-block align-middle">
                          988 S Green Bay Rd Neenah, WI 54956
                        </span>
                      </div>
                      <div>
                        <a href="javascript:;">
                          <span class="d-inline-block align-middle">
                            <i class="fas fa-map-marker-alt"></i>
                          </span>
                          <span class="d-inline-block align-middle">
                            Map & Directions
                          </span>
                        </a>
                      </div>
                      <div>
                        <a href="javascript:;">
                          <span class="d-inline-block align-middle">
                            <i class="fas fa-eye"></i>
                          </span>
                          <span class="d-inline-block align-middle">
                            View Inventory
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="dealer_desc">
                    <div class="head3 mb-2">Dealer's Description</div>
                    <div class="para1">
                      1-Owner vehicle! Features: 2.4L,​ 4 cyl,​ 4X4,​ Remote
                      Start,​ Navigation,​ Rearview Camera,​ Power Moonroof,​
                      Heated Leather,​ bluetooth,​ USB port,​ AUX jack,​ CD
                      player,​ power windows and locks,​ heated auto dimming
                      power mirrors,​ fog lights,​ ABS,​ autostick,​ rear
                      wiper/defrost,​ keyless remote entry. ** Remaining Factory
                      Powertrain Warranty until 7/20/2021 or 60,​000 miles**
                      Please call us at 920-720-5100 to get more information!
                      All of our vehicles have been through a full safety and
                      mechanical inspection. Make sure to take advantage of
                      financing options. We will work with all credits. Our
                      inventory changes weekly,​ so please call ahead to make
                      sure this vehicle is still available. All inventories are
                      subject to prior sale,​ and all vehicle prices are subject
                      to change without notice and do not include taxes,​ title
                      and fees.
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
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    },
    getVehicleDetails: (params, callback) => {
      dispatch(getVehicleDetails(params, callback));
    }
  };
};

export default AppWrapper(searchDetail, null, mapDispatchToProps);
