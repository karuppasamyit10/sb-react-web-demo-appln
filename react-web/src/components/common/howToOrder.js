import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class howToOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | How To Order";
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
                <li class="breadcrumb-item active" aria-current="page">
                  How to order
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap">
          <div class="container">
            <div class="head1 medium">How to order</div>
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
                    src={require("../../assets/img/about/how-to-order/image.png")}
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
                  <div class="head3 medium mt-5">Buy It Safely</div>
                  <div class="list-group mt-4">
                    <Link
                      to={PATH.HOW_TO_USE_HGS}
                      class="list-group-item list-group-item-action"
                    >
                      How to use H.G.S.
                    </Link>
                    <Link
                      to={PATH.PAYMENT}
                      class="list-group-item list-group-item-action"
                    >
                      Payment
                    </Link>
                    <Link
                      to={PATH.FAQ}
                      class="list-group-item list-group-item-action"
                    >
                      FAQ
                    </Link>
                    <Link
                      to={PATH.CONTACT_STAFF}
                      class="list-group-item list-group-item-action"
                    >
                      Contact our staff
                    </Link>
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

export default AppWrapper(howToOrder, null, null);
