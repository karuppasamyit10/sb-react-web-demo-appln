import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class howToUseHgs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | How To Use Hgs";
  }

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
                  <Link to={PATH.ABOUT_US}>About Us</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to={PATH.HOW_TO_ORDER}>How to order</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  FAQ
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
                  <div class="slhead text-center medium head3">
                    Buy It Safely
                  </div>
                  <ul class="sllinks medium">
                    <li>
                      <Link to={PATH.HOW_TO_USE_HGS}>
                        How to use H.G.S.
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li >
                      <Link to={PATH.PAYMENT}>
                        Payment
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li class="active">
                      <Link to={PATH.FAQ}>
                        FAQ
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={PATH.CONTACT_STAFF}>
                        Contact our staff
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-md-9">
                <div class="head1 medium">Buy It Safely</div>
                <div class="row mt-5">
                  <div class="col-12">
                    <div class="head2 mb-3 bold text-center">
                      What is “Buy it Safely!”(B.I.S) ?
                    </div>
                    <p class="para1">
                      “Buy it Safely!” is harasow's Safe Payment & Shipping
                      Service whereby harasow acts as a third party between the
                      buyer and seller in order to make the purchase 100% safe
                      and easy for the buyer. harasow keeps your money, ships
                      the item on time and takes care of your online transaction
                      throughout the whole process safely all at a low cost!
                    </p>
                  </div>
                </div>
                <div class="dotspacer"></div>

                <div class="row mt-4">
                  <div class="col-md-12 text-center">
                    <img
                      src={require('../../assets/img/about/how-to-order/bis_img_75.png')}
                      class="img-fluid"
                      alt=""
                    />
                    <p class="head3 bold">FAQ</p>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-12">
                    <div class="accordion" id="accordionExample">
                      <div class="card">
                        <div class="card-header opened" id="headingOne">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Is it safe to purchase cars at harasow?
                            </button>
                          </h2>
                        </div>

                        <div
                          id="collapseOne"
                          class="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              Yes. harasow offers the safest way to buy vehicles
                              through our safe payment & shipping service called
                              B.I.S(Buy it Safely!). Also, harasow has 5
                              guaranteed programs for your safe trade.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingTwo">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              What are my guarantees?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseTwo"
                          class="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              harasow offers 5 Guarantees for safe transaction
                            </p>
                            <ol>
                              <li>Lowest Price Guarantee</li>
                              <li>On time shipping Guarantee</li>
                              <li>Working Condition Guarantee</li>
                              <li>
                                100% Refund Guarantee(in case of an unsuccessful
                                shipment)
                              </li>
                              <li>Parts Supply Guarantee</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingThree">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              What is the process of purchasing cars?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseThree"
                          class="collapse"
                          aria-labelledby="headingThree"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              Please follow only 5 steps to buy cars at harasow!
                            </p>
                            <ol>
                              <li>
                                Leave an inquiry on the item(Ask for Quotation)
                              </li>
                              <li>Receive quotation from harasow</li>
                              <li>Confirm quotation to purchase</li>
                              <li>Deposit payment to harasow</li>
                              <li>Wait for shipping</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingFour">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              How do I Pay?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseFour"
                          class="collapse"
                          aria-labelledby="headingFour"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              The payment's full amount must be 100% completed
                              through a bank transfer, Western Union, or
                              Moneygram.
                            </p>
                            <p class="para1">
                              We do not accept partial payment, credit card, nor
                              paypal.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingFive">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseFive"
                              aria-expanded="false"
                              aria-controls="collapseFive"
                            >
                              How can I check the condition of the vehicle?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseFive"
                          class="collapse"
                          aria-labelledby="headingFive"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              You can check the vehicle's condition in detail
                              with
                            </p>
                            <ol>
                              <li>Vehicle Condition Report(VCR)</li>
                              <li>A video on the vehicle</li>
                              <li>More pictures(upon request)</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingSix">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseSix"
                              aria-expanded="false"
                              aria-controls="collapseSix"
                            >
                              Does the price include shipping cost?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseSix"
                          class="collapse"
                          aria-labelledby="headingSix"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              No. Listed price is the item price only. It does
                              not include ocean freight and other shipping
                              related charges. Please select the shipping type
                              you want. Some shipping type may have extra charge
                              at destination
                              port.(Ro-Ro/Container/Consolidation/FOB) harasow
                              will give you the final quotation of shipping to
                              your port after submitting an inquiry.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingSeven">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseSeven"
                              aria-expanded="false"
                              aria-controls="collapseSeven"
                            >
                              Does the price include customs tax?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseSeven"
                          class="collapse"
                          aria-labelledby="headingSeven"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              No. The price does not include your country's
                              custom duties. You must clear customs by paying
                              the tax separately. Please check the details with
                              your local customs clearing agency.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingEight">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseEight"
                              aria-expanded="false"
                              aria-controls="collapseEight"
                            >
                              How long until the item arrives at my port?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseEight"
                          class="collapse"
                          aria-labelledby="headingEight"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              Depending on the country, it can take from 10 - 55
                              days for items to reach designated ports. harasow
                              books the fastest available shipping schedule when
                              payment is complete.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingNine">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseNine"
                              aria-expanded="false"
                              aria-controls="collapseNine"
                            >
                              Where is harasow's office located in?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseNine"
                          class="collapse"
                          aria-labelledby="headingNine"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              harasow's head office is located in Seoul, South
                              Korea. Our vehicles are also located in South
                              Korea.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" id="headingTen">
                          <h2 class="mb-0">
                            <button
                              class="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTen"
                              aria-expanded="false"
                              aria-controls="collapseTen"
                            >
                              Does harasow have an agent in my country?
                            </button>
                          </h2>
                        </div>
                        <div
                          id="collapseTen"
                          class="collapse"
                          aria-labelledby="headingTen"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <p class="para1">
                              harasow have local agents in some countries.
                              (Chile, Ghana, etc.) For getting more information,
                              please contact harasow's customer support team or
                              visit Local Trade Information page in website.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dotspacer"></div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Need Help?</div>
                    <div class="greybox mt-4">
                      <p class="para1">
                        If you have any further questions, contact us at any
                        time! We are here to support you.
                      </p>
                      <p class="para1">Email : bis@harasow.com</p>
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

export default AppWrapper(howToUseHgs, null, null);
