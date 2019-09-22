import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class carAccessories extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | Car Accessories"
    }


    render() {
        return (
            <React.Fragment>
                <section class="breadcrumb_wrap">
                    <div class="container">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={PATH.DASHBOARD}>Home</Link></li>
                                <li class="breadcrumb-item"><Link to={PATH.ABOUT_US}>About Us</Link></li>
                                <li class="breadcrumb-item"><Link to={PATH.WHAT_WE_DO}>What we do</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Car Accessories</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="container_shipping">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="sidelinks">
                                    <div class="slhead text-center medium head3">Additional Services</div>
                                    <ul class="sllinks medium">
                                        <li><Link to={PATH.PARTS_EXPRESS}>Parts Express <span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li ><Link to={PATH.SHIPPING}>Container Shipping <span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li><Link to={PATH.FUEL_CONVERSION}>Fuel Conversion (LPG to Gasoline)<span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li class="active"><Link to={PATH.CAR_ACCESSORIES}>Car Accessories<span><i class="fas fa-chevron-right"></i></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="head1 medium">
                                    Car Accessories
        </div>
                                <div class="row mt-5">
                                    <div class="col-md-3 text-right">
                                        <img src={require('../../assets/img/about/what-we-do/icon_acc.png')} class="img-fluid" alt="" />
                                    </div>
                                    <div class="col-md-9">
                                        <div class="head2 medium">Upgrade your car at cheap price!</div>
                                        <p class="para1">
                                            You can request the car caring service and buy car accessories at reasonable price when you use Autowini's Safe Payment & Shipping Service B.I.S.
            </p>

                                    </div>
                                </div>
                                <div class="dotspacer"></div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="head2 medium">How to Buy</div>
                                        <div class="greybox mt-4">
                                            <p class="para1">
                                                Ask B.I.S staff when you purchase your car through B.I.S
                </p>
                                            <p class="para1">
                                                Email : bis@harasow.com
                </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="dotspacer"></div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="head2 medium">Accessories Package</div>
                                        <div class="row mt-4">
                                            <div class="col-lg-6">
                                                <img src={require('../../assets/img/about/what-we-do/acc01.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-lg-6">
                                                <img src={require('../../assets/img/about/what-we-do/acc02.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-12">
                                                <div class="row mt-2">
                                                    <div class="col-md-6">
                                                        <div class="head3">Roof carrier & Ladder</div>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <div class="head1 bold green">USD 250</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dotspacer"></div>
                                        <div class="row mt-4">
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-12">
                                                <div class="row mt-2">
                                                    <div class="col-md-6">
                                                        <div class="head3">Full Chrome Set</div>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <div class="head1 bold green">USD 150</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dotspacer"></div>
                                        <div class="row mt-4">
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc03.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-lg-6 mb-4">
                                                <img src={require('../../assets/img/about/what-we-do/acc04.jpg')} class="img-fluid" alt="" />
                                            </div>
                                            <div class="col-12">
                                                <div class="row mt-2">
                                                    <div class="col-md-6">
                                                        <div class="head3">DVD + Rear View Monitor</div>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <div class="head1 bold green">USD 300</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dotspacer"></div>
                                        <div class="row mt-4 no-gutters">
                                            <div class="col-lg-12 customertxt">
                                                <img src={require('../../assets/img/about/what-we-do/img_customer.jpg')} class="img-fluid" alt="" />
                                                <span class="white medium head2 text-center">
                                                    We focus on Customer Satisfaction.
                                                    Experience the services with a high level of quality!
                      </span>
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
                                                If you have any further questions, contact us at any time! We are here to support you.
                </p>
                                            <p class="para1">
                                                Email : bis@harasow.com
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

export default AppWrapper(carAccessories, null, null);
