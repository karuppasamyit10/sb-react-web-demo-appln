import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class partnerCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow |  Partners Countries";
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
                  <Link to={PATH.PARTNER}>Partner</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Partners Countries
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap partners_wrap">
          <div class="container">

            <div class="row align-items-center">
              <div class="col-lg-4">
                <div class="head2  medium">
                  <a href="partners-subdescription.html" class="btn btn-link head2 regular">Find a Contact Person</a>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="head1 green medium">
                  Find a Countries
          </div>
              </div>
            </div>


            <div class="spacer1"></div>

            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Person" aria-label="person"
                      aria-describedby="button-addon2" />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i
                        class="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <select name="" id="ddCountry" class="form-control">
                    <option value="">Select Country</option>
                    <option value="1">Loading...</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <select name="" id="ddIndustry" class="form-control">
                    <option value="">Select Industry</option>
                    <option value="1">Loading...</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="spacer1"></div>
            <div class="row no-gutters">
              <div class="col-12">
                <div class="mapholder">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6445759.605514293!2d123.16400108616438!3d37.92240366363955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356263108b3d1c3b%3A0x86416151fc4a3997!2sKorea!5e0!3m2!1sen!2sin!4v1571774295489!5m2!1sen!2sin"
                    width="100%" height="450" frameborder="0" style={{ border: "0;" }} allowfullscreen=""></iframe>
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

export default AppWrapper(partnerCountries, null, null);
