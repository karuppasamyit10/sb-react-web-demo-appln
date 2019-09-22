import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class partsExpress extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | Parts Express"
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
                                <li class="breadcrumb-item active" aria-current="page">Parts Express</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="about_wrap">
                    <div class="container">
                        <div class="head1 medium">
                            Additional Services
        </div>
                        <div class="row">
                            <div class="col-md-12 text-center mt-4">
                                <div class="head2 medium ">
                                    Use Harasow's safe payment & shipping service
            </div>
                                <p class="para1">
                                    Buy it Safely!(BIS) make your purchase more profitable!
            </p>
                                <div class="imgs mt-5">
                                    <a href="javscript:;">
                                        <img src={require('../../assets/img/about/what-we-do/img_container_en.jpg')} class="img-fluid" alt="" />
                                    </a>
                                </div>
                                <div class="imgs mt-5">
                                    <a href="javscript:;">
                                        <img src={require('../../assets/img/about/what-we-do/img_fuel_en.jpg')} class="img-fluid" alt="" />
                                    </a>
                                </div>
                                <div class="imgs mt-5">
                                    <a href="javscript:;">
                                        <img src={require('../../assets/img/about/what-we-do/car_caring_banner.jpg')} class="img-fluid" alt="" />
                                    </a>
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

export default AppWrapper(partsExpress, null, null);
