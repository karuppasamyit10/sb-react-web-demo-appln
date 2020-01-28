import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class membershipFee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Koreaautonet | Membership Fee";
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
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
                      <Link to={PATH.REGISTEREDITEMS}>Place an AD<span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li class="active">
                      <Link to={PATH.MEMBERSHIPFEE}>Membership Fee<span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={PATH.REGISTEREDITEMS}>Register items<span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9">
                <div class="head1 medium">Membership Fee</div>

                <div class="stepsbox mt-5">
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="stepsgrid text-center">
                        <div class="icon">
                          <img
                            src={require("../../assets/img/sell/iconStep1.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </div>
                        <div class="small mt-2">1 Step</div>
                        <div class="head3 bold mt-2">Application</div>
                        <p class="para1 mt-2">
                          Apply Koreaautonet’s memebership service you want to use.
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="stepsgrid text-center">
                        <div class="icon">
                          <img
                            src={require("../../assets/img/sell/iconStep2.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </div>
                        <div class="small mt-2">2 Step</div>
                        <div class="head3 bold mt-2">Consultation</div>
                        <p class="para1 mt-2">
                          Koreaautonet’s staff will contact you by email or mobile.
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="stepsgrid text-center">
                        <div class="icon">
                          <img
                            src={require("../../assets/img/sell/iconStep3.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </div>
                        <div class="small mt-2">3 Step</div>
                        <div class="head3 bold mt-2">Payment</div>
                        <p class="para1 mt-2">
                          Choose how to pay your service fee & make a payment.
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="stepsgrid text-center">
                        <div class="icon">
                          <img
                            src={require("../../assets/img/sell/iconStep4.png")}
                            class="img-fluid"
                            alt=""
                          />
                        </div>
                        <div class="small mt-2">4 Step</div>
                        <div class="head3 bold mt-2">Complete</div>
                        <p class="para1 mt-2">
                          Start to advertise with Koreaautonet & reach the global
                          market!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dotspacer"></div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Koreaautonet Membership Service</div>
                    <p class="para1 mt-3">
                      Koreaautonet Membership service requires a 1 year commitment.
                    </p>
                    <div class="table-responsive membershiptable">
                      <table class="table table-bordered text-center addColors">
                        <thead class="thead-light">
                          <tr>
                            <th>Class</th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_pw3.png")}
                                alt="Power Member"
                              />{" "}
                              <br /> Power Member 10
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ex3.png")}
                                alt="Expert Company"
                              />
                              <br /> Expert Company
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ss3.png")}
                                alt="Super Seller"
                              />
                              <br /> Super Seller
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Service Fee / month</th>
                            <td class="power10Bg">-</td>
                            <td class="expertBg">-</td>
                            <td class="superBg">-</td>
                          </tr>
                          <tr>
                            <th scope="row">Service Fee / year</th>
                            <td class="power10Bg">
                              <strong class="price">USD 1,500</strong>/ year
                            </td>
                            <td class="expertBg">
                              <strong class="price">USD 4,800</strong>/ year
                            </td>
                            <td class="superBg">
                              <strong class="price">USD 11,000 </strong>/ year
                            </td>
                          </tr>
                          <tr class="title">
                            <th colspan="5">Item Listing</th>
                          </tr>
                          <tr>
                            <th scope="row">View right to Item’s price</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Listing Priority</th>
                            <td class="power10Bg">3rd</td>
                            <td class="expertBg">2nd</td>
                            <td class="superBg">1st</td>
                          </tr>
                          <tr>
                            <th scope="row">Posting Items</th>
                            <td class="power10Bg">100 Units</td>
                            <td class="expertBg">500 Units</td>
                            <td class="superBg">1,000 Units</td>
                          </tr>
                          <tr>
                            <th scope="row">Photos &amp; Videos</th>
                            <td class="power10Bg">
                              Upload max 40 photos,
                              <br />1 video per each item
                            </td>
                            <td class="expertBg">
                              Upload max 50 photos,
                              <br />1 video per each item
                            </td>
                            <td class="superBg">
                              Upload max 60 photos,
                              <br />1 video per each item
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Company banner ads to
                              <br />
                              target countries
                            </th>
                            <td class="power10Bg">X</td>
                            <td class="expertBg">X</td>
                            <td class="superBg">O</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="para1">
                      Super sellers are only available at prime level or above.
                    </p>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">
                      Koreaautonet Exclusive Member Benefits
                    </div>
                    <div class="table-responsive membershiptable">
                      <table class="table table-bordered text-center">
                        <thead class="thead-light">
                          <tr>
                            <th>Class</th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_pw3.png")}
                                alt="Power Member"
                              />{" "}
                              <br /> Power Member 10
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ex3.png")}
                                alt="Expert Company"
                              />
                              <br /> Expert Company
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ss3.png")}
                                alt="Super Seller"
                              />
                              <br /> Super Seller
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Service Fee</th>
                            <td class="power10Bg">Free</td>
                            <td class="expertBg">50% Discount</td>
                            <td class="superBg">50% Discount</td>
                          </tr>
                          <tr>
                            <th scope="row">Re-registration by One Click</th>
                            <td class="power10Bg">2 Units / day</td>
                            <td class="expertBg">6 Units / day</td>
                            <td class="superBg">10 Units / day</td>
                          </tr>
                          <tr>
                            <th scope="row">See Prices of sold cars</th>
                            <td class="power10Bg">6 Units / day</td>
                            <td class="expertBg">10 Units / day</td>
                            <td class="superBg">14 Units / day</td>
                          </tr>
                          <tr>
                            <th scope="row">Guarantee Mark</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Listing Priority advanced</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Marketing Support</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Hot Mark</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Photo by Koreaautonet</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Prime Member Badge</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="para1">
                      Please contact our sales team if you want to become an
                      exclusive member.
                    </p>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">
                      Koreaautonet Prime Member Benefits
                    </div>
                    <div class="table-responsive membershiptable">
                      <table class="table table-bordered text-center">
                        <thead class="thead-light">
                          <tr>
                            <th>Class</th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_pw3.png")}
                                alt="Power Member"
                              />{" "}
                              <br /> Power Member 10
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ex3.png")}
                                alt="Expert Company"
                              />
                              <br /> Expert Company
                            </th>
                            <th>
                              <img
                                src={require("../../assets/img/sell/badge_ss3.png")}
                                alt="Super Seller"
                              />
                              <br /> Super Seller
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Re-registration by One Click</th>
                            <td class="power10Bg">1 Units / day</td>
                            <td class="expertBg">3 Units / day</td>
                            <td class="superBg">5 Units / day</td>
                          </tr>
                          <tr>
                            <th scope="row">See Prices of sold items</th>
                            <td class="power10Bg">3 Units / day</td>
                            <td class="expertBg">5 Units / day</td>
                            <td class="superBg">10 Units / day</td>
                          </tr>
                          <tr>
                            <th scope="row">Hot Mark</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Photo by Koreaautonet</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                          <tr>
                            <th scope="row">Prime Member Badge</th>
                            <td class="power10Bg">O</td>
                            <td class="expertBg">O</td>
                            <td class="superBg">O</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="para1">
                      Please contact our sales team if you want to become a
                      Prime member.
                    </p>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Hot Mark Fee</div>
                    <div class="table-responsive membershiptable">
                      <table class="table table-bordered text-center">
                        <thead class="thead-light">
                          <tr>
                            <th>Hot Mark / month</th>
                            <th>Service Fee / month(VAT not included)</th>
                            <th>Unit price per mark</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="power10Bg">5</td>
                            <td class="expertBg">49,000 won</td>
                            <td class="superBg">9,800 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">10</td>
                            <td class="expertBg">96,000 won</td>
                            <td class="superBg">9,600 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">20</td>
                            <td class="expertBg">188,000 won</td>
                            <td class="superBg">9,400 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">30</td>
                            <td class="expertBg">276,000 won</td>
                            <td class="superBg">9,200 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">40</td>
                            <td class="expertBg">360,000 won</td>
                            <td class="superBg">9,000 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">50</td>
                            <td class="expertBg">445,000 won</td>
                            <td class="superBg">8,900 won</td>
                          </tr>
                          <tr>
                            <td class="power10Bg">100</td>
                            <td class="expertBg">880,000 won</td>
                            <td class="superBg">8,800 won</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Additional Services</div>
                    <p class="para1">
                      Power & Expert company members could apply for Additional
                      Services.
                    </p>
                    <p class="para1">
                      Contact us if you want to use Premium List or Special
                      Offer.
                    </p>
                    <div class="membershiptable">
                      <table class="table table-bordered text-center">
                        <thead class="thead-light">
                          <tr class="row no-gutters">
                            <th class="col-6">Premium List</th>
                            <th class="col-6">Item Linkage Service</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="row no-gutters">
                            <td class="col-6">
                              <div>
                                {" "}
                                <span class="red bold">USD 110</span> / 7 days
                              </div>
                              <div>
                                {" "}
                                <span class="text-strike">USD 220</span>{" "}
                                <span class="red bold">USD 210</span>/ 14 days
                              </div>
                            </td>
                            <td class="col-6">
                              <div>
                                <span class="red bold">ASK PRICE</span>
                              </div>
                            </td>
                          </tr>
                          <tr class="row no-gutters">
                            <td class="col-6">
                              <p class="para1">
                                Top priority listing on search results
                              </p>
                              <p class="para1">
                                Get more exposure for your item photos(5 images)
                              </p>
                            </td>
                            <td class="col-6">
                              <p class="para1">
                                You can link your item database to your personal
                                website. The prices will vary on the number of
                                items & the way it works. For more details,
                                please contact our staff.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Contact Us</div>
                    <div class="greybox mt-4">
                      <p class="para1">Email : help@Koreaautonet.com</p>
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

export default AppWrapper(membershipFee, null, null);
