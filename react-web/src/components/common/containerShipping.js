import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class containerShipping extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | Container Shipping"
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
                                <li class="breadcrumb-item active" aria-current="page">Container Shipping</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="container_shipping">
                    <div class="container">
                        <div class="head1 medium">
                            Container Shipping
        </div>
                        <div class="row mt-5">
                            <div class="col-md-3 text-right">

                                <img src={require('../../assets/img/about/what-we-do/icon_container.png')} class="img-fluid" alt="" />
                            </div>
                            <div class="col-md-9">
                                <div class="head2 medium">Want to Save Shipping Cost?</div>
                                <p class="para1">
                                    Just choose whatever you want and ask us Container Shipping with BIS!
                                    Container shipping is the most secure and efficient way to save shipping cost. Just choose whatever you want on Autowini and ask our staff to handle all those items on behalf of you. We will gather all the items you need and into CY and ship them safely into container.
            </p>
                                <p class="para1">
                                    All the transaction will go through BIS service! And you will get full customer support throughout the deal! Do not worry but relax.
            </p>
                            </div>
                        </div>
                        <div class="dotspacer"></div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="head2 medium">How it works</div>
                                <div class="greybox">
                                    <ol>
                                        <li>Ask Autowini with multiple items.</li>
                                        <li>AUTOWINI : BIS Customer Support
                                            · Check the item’s availability & information.
                                            · Get final price from sellers.
                                            · Quote entire shipping cost to your port.
                    · Shipping documents handlings.</li>
                                        <li>Confirm to purchase & send money.</li>
                                        <li>Autowini gather all the items each seller’s ship them safely into container.</li>
                                        <li>Shipping by Container Vessel</li>
                                        <li>Get the container in your port finally!</li>
                                    </ol>
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

export default AppWrapper(containerShipping, null, null);
