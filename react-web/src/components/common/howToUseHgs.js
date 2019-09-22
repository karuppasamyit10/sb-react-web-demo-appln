import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class howToUseHgs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | How To Use Hgs"
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
                                <li class="breadcrumb-item"><Link to={PATH.HOW_TO_ORDER}>How to order</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">How to use H.G.S</li>
                            </ol>
                        </nav>
                    </div>
                </section>

                <section class="container_shipping">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="sidelinks">
                                    <div class="slhead text-center medium head3">Buy It Safely</div>
                                    <ul class="sllinks medium">
                                        <li class="active"><a href="how-to-use-hgs.html">How to use H.G.S. <span><i class="fas fa-chevron-right"></i></span></a></li>
                                        <li ><a href="payment.html">Payment <span><i class="fas fa-chevron-right"></i></span></a></li>
                                        <li><a href="faq.html">FAQ<span><i class="fas fa-chevron-right"></i></span></a></li>
                                        <li ><a href="contact-staff.html">Contact our staff<span><i class="fas fa-chevron-right"></i></span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-9">


                                <div class="head1 medium">
                                    Buy It Safely
        </div>
                                <div class="row mt-5">
                                    <div class="col-12">
                                        <div class="head2 mb-3 bold text-center">What is “Buy it Safely!”(B.I.S) ?</div>
                                        <p class="para1">
                                            “Buy it Safely!” is Autowini's Safe Payment & Shipping Service whereby Autowini acts as a third party between the buyer and seller in order to make the purchase 100% safe and easy for the buyer. Autowini keeps your money, ships the item on time and takes care of your online transaction throughout the whole process safely all at a low cost!
    </p>
                                    </div>
                                </div>
                                <div class="dotspacer"></div>


                                <div class="row mt-4">
                                    <div class="col-md-12 text-center">
                                        <img src={require('../../assets/img/about/how-to-order/bis_img_75.png')} class="img-fluid" alt="" />
                                        <p class="head3 bold">How to Use H.G.S.</p>
                                        <p class="para1">
                                            We deliver our items on time with an all-in-one order tracking system.
                      </p>
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

export default AppWrapper(howToUseHgs, null, null);
