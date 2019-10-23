import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class partner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Partner";
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
                <li class="breadcrumb-item active" aria-current="page">
                  Partner
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap">
          <div class="container">
            <div class="head1 medium">Partner</div>
            <div class="row">
              <div class="col-md-12">
                <div class="whatwedo">
                  <p class="para1 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <img
                    src={require("../../assets/img/about/what-we-do/image.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="quotes">
                    <blockquote class="blockquote text-center">
                      <p class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <footer class="blockquote-footer">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </footer>
                    </blockquote>
                  </div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="row">
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image1.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">Market Expansion Services</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a href="what-we-do.html" class="btn btn-link para1 medium">
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image2.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">DKSH in brief</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a href="who-we-are.html" class="btn btn-link para1 medium">
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image3.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">Our Business Units</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a
                      href="how-we-work.html"
                      class="btn btn-link para1 medium"
                    >
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image1.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">Our vision and strategy</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a
                      href="how-to-order.html"
                      class="btn btn-link para1 medium"
                    >
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image3.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">Locations</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a
                      href="how-to-order.html"
                      class="btn btn-link para1 medium"
                    >
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="aboutgrid">
                  <img
                    src={require("../../assets/img/about/image4.png")}
                    class="img-fluid w-100"
                    alt=""
                  />
                  <div class="head2 mt-3">Our awards</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, doloribus quam quis qui odit tempore ea
                    perspiciatis est mollitia repellendus numquam aut,
                    necessitatibus, cum nemo molestiae a pariatur fugit
                    voluptas.
                  </p>
                  <div class="readmore">
                    <a
                      href="how-to-order.html"
                      class="btn btn-link para1 medium"
                    >
                      <span class="d-inline-block align-middle">
                        <i class="fas fa-caret-right"></i>
                      </span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <hr />
            <div class="spacer1"></div>
            <div class="row no-gutters">
              <div class="col-lg-12">
                <div class="card-deck">
                  <div class="card">
                    <img
                      src={require("../../assets/img/On-demand-car-rental.jpg")}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">Unknown Content</h5>
                      <p class="card-text">
                        Lorem ipsum is simply dummy text of printing and
                        typesetting industry.
                      </p>
                      <div class="mt-3">
                        <a href="javascript:;" class="btn btn-primary">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src={require("../../assets/img/On-demand-car-rental.jpg")}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">Success Stories</h5>
                      <p class="card-text">
                        Lorem ipsum is simply dummy text of printing and
                        typesetting industry.
                      </p>
                      <div class="mt-3">
                        <a href="javascript:;" class="btn btn-primary">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src={require("../../assets/img/CustomerCare.jpg")}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">Contact our Transport Staff</h5>
                      <p class="card-text">
                        Remember there is a team who will take care of your
                        transport.
                      </p>
                      <div class="mt-3">
                        <Link to={PATH.PARTNER_SUB_DESCRIPTION} class="btn btn-primary">
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
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

export default AppWrapper(partner, null, null);
