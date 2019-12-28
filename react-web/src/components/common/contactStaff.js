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
    document.title = "Auto Harasow | Contact Staff";
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
                  Contact Staff
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
                    <li>
                      <Link to={PATH.PAYMENT}>
                        Payment
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={PATH.FAQ}>
                        FAQ
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li class="active">
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
                      src={require("../../assets/img/about/how-to-order/bis_img_75.png")}
                      class="img-fluid"
                      alt=""
                    />
                    <p class="head3 bold">Contact our staff</p>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="head3 bold">
                      Remember there is a team who will take care of your
                      transaction.
                    </div>
                    <p class="para1">
                      Do you have any questions? Contact our customer support
                      staff for any help.
                    </p>
                    <div class="greybox">
                      <ul class="head3 medium">
                        <li>Office Hours : 9 AM - 7 PM</li>
                        <li>Korean Local Time : 2019-09-23 01:27:14</li>
                        <li class="red">We are Out of Service.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="dotspacer"></div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head2 medium">Need Help?</div>
                    <div class="greybox mt-4">
                      <p class="para1">
                        Please write the “Item number” and detailed questions so
                        that we can serve you better. We will make online
                        trading more reliable and convenient for you.
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
