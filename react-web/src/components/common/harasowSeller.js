import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class seller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Harasow Seller";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
                  <Link to={PATH.SELLER}>Seller</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Harasow Seller
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap transport_harasow">
          <div class="container">

            <div class="head1 medium">
              Contact Person
           </div>
            <div class="row mt-3">
              <div class="col-12">
                <div class="card-group">
                  <div class="card">
                    <img src={require('../../assets/img/billboard-1.png')} class="card-img-top w-100" alt="" />
                    <div class="card-body">
                      <h5 class="card-title">Till Lesner</h5>
                      <p class="card-text">Head Group Investor and Media solutions</p>
                      <div class="mt-3">
                        <a href="javascript:;" class="btn btn-secondary">Contact</a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <img src={require('../../assets/img/billboard-1.png')} class="card-img-top" alt="" />
                    <div class="card-body">
                      <h5 class="card-title">Till Lesner</h5>
                      <p class="card-text">Head Group Investor and Media solutions</p>
                      <div class="mt-3">
                        <a href="javascript:;" class="btn btn-secondary">Contact</a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <img src={require('../../assets/img/billboard-1.png')} class="card-img-top" alt="" />
                    <div class="card-body">
                      <h5 class="card-title">Till Lesner</h5>
                      <p class="card-text">Head Group Investor and Media solutions</p>
                      <div class="mt-3">
                        <a href="javascript:;" class="btn btn-secondary">Contact</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="head2 bold text-center">
              AUTO harasow ( How to use  / Seller Benefite )
            </div>
            <div class="row no-gutters mt-3">
              <div class="col-12">
                <div class="sellerbenefit">
                  <div class="bgtxt">
                    <div class="head2 white">Don't Know English, Don't Know Trade, but if you know Harasow it's ok!</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="head2 bold text-center">
              What is <span class="green">Harasow?</span>
            </div>
            <div class="row no-gutters mt-3 justify-content-center">
              <div class="col-lg-10 text-center">
                <p class="para1">
                  This is the place you've been looking for! Autowini is the global auto trading platform for buying cars, trucks, buses, heave machinery and spare parts from reliable suppliers in S.Korea & Japan.
               </p>
                <div class="mt-3">
                  <img src={require('../../assets/img/img_bisHow_re.png')} class="img-fluid" alt="" />
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <hr />
            <div class="head2 bold text-center">
              Why <span class="green">Harasow?</span>
            </div>
            <div class="row no-gutters mt-3">
              <div class="col-md-4">
                <div class="whyautogrid text-center">
                  <div class="icon">
                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees01.png')} class="img-fluid" alt="" />
                  </div>
                  <div class="head3 bold green">Export at a small fee!</div>
                  <p class="para1">
                    You can have the chance to invest at a low cost and export at a high price.
             </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="whyautogrid text-center">
                  <div class="icon">
                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees02.png')} class="img-fluid" alt="" />
                  </div>
                  <div class="head3 bold green">Anyone can easily export</div>
                  <p class="para1">
                    You can have the chance to invest at a low cost and export at a high price.
              </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="whyautogrid text-center">
                  <div class="icon">
                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees04.png')} class="img-fluid" alt="" />
                  </div>
                  <div class="head3 bold green">Export even without knowing English</div>
                  <p class="para1">
                    You can have the chance to invest at a low cost and export at a high price.
                </p>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
          </div>

        </section>
      </React.Fragment>
    );
  }
}

export default AppWrapper(seller, null, null);
