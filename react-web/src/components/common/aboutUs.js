import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class aboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | About Us"
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    render() {
        return (
            <React.Fragment>
                <section class="breadcrumb_wrap">
                    <div class="container">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={PATH.DASHBOARD}>Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">About Us</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="about_wrap">
                    <div class="container">
                        <div class="head1 medium">
                            About Us
        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="aboutgrid">
                                    <img src={require('../../assets/img/about/image1.png')} class="img-fluid w-100" alt="" />
                                    <div class="head2 mt-3">What we do</div>
                                    <p class="para1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
              </p>
                                    <div class="readmore">
                                        <Link class="btn btn-link para1 medium" to={PATH.WHAT_WE_DO}>
                                            <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                                            <span class="d-inline-block align-middle">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="aboutgrid">
                                    <img src={require('../../assets/img/about/image2.png')} class="img-fluid w-100" alt="" />
                                    <div class="head2 mt-3">Who we are</div>
                                    <p class="para1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                </p>
                                    <div class="readmore">
                                        <Link to={PATH.WHO_WE_ARE} class="btn btn-link para1 medium">
                                            <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                                            <span class="d-inline-block align-middle">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="aboutgrid">
                                    <img src={require('../../assets/img/about/image3.png')} class="img-fluid w-100" alt="" />
                                    <div class="head2 mt-3">How we work</div>
                                    <p class="para1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                  </p>
                                    <div class="readmore">
                                        <Link to={PATH.HOW_WE_WORK} class="btn btn-link para1 medium">
                                            <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                                            <span class="d-inline-block align-middle">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="aboutgrid">
                                    <img src={require('../../assets/img/about/image4.png')} class="img-fluid w-100" alt="" />
                                    <div class="head2 mt-3">How to order</div>
                                    <p class="para1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                    </p>
                                    <div class="readmore">
                                        <Link to={PATH.HOW_TO_ORDER} class="btn btn-link para1 medium">
                                            <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                                            <span class="d-inline-block align-middle">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>
        );
    }
}

export default AppWrapper(aboutUs, null, null);
