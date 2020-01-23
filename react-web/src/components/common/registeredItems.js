import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class registeredItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Registered Items";
  }

  render() {
    return (
      <React.Fragment>
        <div class="floatingbox">
          <div class="links">
            <a href="javascript:;">My Inquiry</a>
            <a href="javascript:;">My Order</a>
            <a href="javascript:;">My Parts Cart</a>
            <a href="javascript:;">My Parts Order</a>
          </div>
        </div>
        <section class="breadcrumb_wrap">
          <div class="container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to={PATH.DASHBOARD}>Home</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to={PATH.ABOUT_US}>About Us</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to={PATH.WHAT_WE_DO}>What we do</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Container Shipping
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="container_shipping">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="sidelinks">
                  <div class="slhead text-center medium head3">Sell</div>
                  <ul class="sllinks medium">
                    <li>
                      <a href="#">
                        Place an AD
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <Link to={PATH.MEMBERSHIP}>
                        Membership Fee
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li class="active">
                      <Link to={PATH.REGISTEREDITEMS}>
                        Register items
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9">
                <div class="head1 medium">Register Items</div>

                <div class="registerbox mt-5">
                  <p class="para1">Please select the category of item.</p>
                  <div class="row no-gutters mt-4">
                    <div class="col-md">
                      <a
                        href="javascript:;"
                        class="vehiclegrid d-block text-center"
                      >
                        <div class="row no-gutters align-items-center position-relative h-100">
                          <div class="col-12">
                            <div class="img">
                              <img
                                src={require("../../assets/img/sell/img_cars.png")}
                                class="img-fluid"
                                alt=""
                              />
                            </div>
                            <div class="para1 mt-3">Car</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md">
                      <a
                        href="javascript:;"
                        class="vehiclegrid d-block text-center"
                      >
                        <div class="row no-gutters align-items-center position-relative h-100">
                          <div class="col-12">
                            <div class="img">
                              <img
                                src={require("../../assets/img/sell/img_cars.png")}
                                class="img-fluid"
                                alt=""
                              />
                            </div>
                            <div class="para1 mt-3">
                              Truck / Special Vehicle
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md">
                      <a
                        href="javascript:;"
                        class="vehiclegrid d-block text-center"
                      >
                        <div class="row no-gutters align-items-center position-relative h-100">
                          <div class="col-12">
                            <div class="img">
                              <img
                                src={require("../../assets/img/sell/img_cars.png")}
                                class="img-fluid"
                                alt=""
                              />
                            </div>
                            <div class="para1 mt-3">Bus</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md">
                      <a
                        href="javascript:;"
                        class="vehiclegrid d-block text-center"
                      >
                        <div class="row no-gutters align-items-center position-relative h-100">
                          <div class="col-12">
                            <div class="img">
                              <img
                                src={require("../../assets/img/sell/img_cars.png")}
                                class="img-fluid"
                                alt=""
                              />
                            </div>
                            <div class="para1 mt-3">Equipment / Part</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="col-md">
                      <a
                        href="javascript:;"
                        class="vehiclegrid d-block text-center"
                      >
                        <div class="row no-gutters align-items-center position-relative h-100">
                          <div class="col-12">
                            <div class="img">
                              <img
                                src={require("../../assets/img/sell/img_cars.png")}
                                class="img-fluid"
                                alt=""
                              />
                            </div>
                            <div class="para1 mt-3">Parts / Accessories</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Contact Us</div>
                    <div class="greybox mt-4">
                      <p class="para1">Email : help@harasow.com</p>
                      <p class="para1">Tel. : +82-2-576-5533</p>
                      <p class="para1">Fax. : +82-2-576-5599</p>
                      <p class="para1">
                        Office hours : Mon – Fri 9:00 AM ~ 7:00 PM (Korea Local
                        Time)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="spacer1"></div>
      </React.Fragment>
    );
  }
}

export default AppWrapper(registeredItems, null, null);
