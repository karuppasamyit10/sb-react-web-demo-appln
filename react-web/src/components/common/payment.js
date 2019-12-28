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
    document.title = "Auto Harasow | Payment";
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
                  Payment
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
                    <li class="active">
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
                    <p class="head3 bold">How to Pay</p>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="head3 bold">How can I pay money?</div>
                    <p class="para1">
                      To make a payment after confirming an item for purchase,
                      transfer money by T/T to harasow’s bank account. Check the
                      invoice from the harasow staff and transfer the total
                      amount to harasow’s bank account by T/T. Send us a copy of
                      the receipt so our staff can confirm payment.
                    </p>
                    <div class="greybox">
                      <div class="head3 bold mb-3">
                        {" "}
                        Harasow B.I.S ACCOUNT FOR T/T
                      </div>
                      <p class="para1">
                        <strong>BENEFICIARY :</strong> HARASOW INC.
                      </p>
                      <p class="para1">
                        <strong> ACCOUNT No. :</strong> 000-000000-00-00000
                      </p>
                      <p class="para1">
                        <strong> ADDRESS :</strong> XX, 11-1, xxxxx-xxx,
                        xxxxx-xx, xxxxx, South Korea
                      </p>
                      <p class="para1">
                        <strong>BANK NAME :</strong> INDUSTRIAL BANK OF KOREA
                      </p>
                      <p class="para1">
                        <strong> SWIFT :</strong> IBKOKRSEXXX
                      </p>
                      <p class="para1">
                        <strong> BANK ADDRESS :</strong> 10, aaaaaa x-GA,
                        xxxxx-xx, xxxxx, KOREA
                      </p>
                      <div class="insidegreybox">
                        <div class="head3">Intermediary Bank :</div>
                        <ul>
                          <li>
                            Deutsche Bank Trust Company Americas New York (BIC :
                            xxxxx)
                          </li>
                          <li>
                            American Express Bank Ltd., New York (BIC : xxxxx)
                          </li>
                          <li>
                            Bank of America N.A., San Francisco (BIC : xxxxx)
                          </li>
                          <li>JP Morgan Chase Bank New York (BIC : xxxxx)</li>
                          <li>HSBC Bank USA (BIC : xxxxx)</li>
                          <li>
                            Wachovia Bank National Association (BIC : xxxxx)
                          </li>
                        </ul>
                      </div>
                      <div class="head3 mt-2 bold red">
                        <img
                          src={require('../../assets/img/about/how-to-order/icon_caution.png')}
                          alt=""
                        />
                        Be careful about fake invoice.
                      </div>
                      <p class="para1">
                        If the account information is different from above,
                        please email to{" "}
                        <a href="javascript:;" class="btn btn-link">
                          bis@harasow.com
                        </a>{" "}
                        We will verify it.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head3 bold">Can I split the payment?</div>
                    <p class="para1">
                      We recommend you to transfer money once due to high bank
                      charges. However when the buyer cannot clear payment at
                      one go, the bill can be split a maximum of 2-3 times
                      before shipping. Please note that all bank charges
                      regarding transfer should be borne by the sender (buyer).
                      harasow will begin the shipping process after receiving
                      the total amount.
                    </p>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head3 bold">Can I pay after shipping?</div>
                    <p class="para1">
                      No. The full amount must be paid before shipping as the
                      B.I.S service will take care of holding your money safely
                      and shipping the item on schedule. harasow accepts 100%
                      payment and guarantees a safe transaction.
                    </p>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="head3 bold">Cancellation Policy</div>
                    <p class="para1">
                      If you decide to cancel the purchase after making the
                      transfer, a fine equivalent to 20% of the FOB value of the
                      invoice will be applied, the minimum amount being USD 500.
                    </p>
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
