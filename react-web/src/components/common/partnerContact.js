import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class partnerContact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Partner Contact";
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
                  Partner Contact
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap partners_wrap">
          <div class="container">
            <div class="head1 medium">
              Contact Us
           </div>
            <div class="spacer1"></div>

            <div class="row no-gutters">
              <div class="col-12">
                <div class="head2 mb-3">Personal Details</div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <input type="text" class="form-control" id="inp_title" placeholder="Title" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_fname" placeholder="First Name" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_lname" placeholder="Last Name" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_cmpny" placeholder="Company" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_dep" placeholder="Department" />
                  </div>
                </div>
                <hr />
              </div>

              <div class="col-12">
                <div class="head2 mb-3">Contact Details</div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_email" placeholder="Email" />
                  </div>
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="inp_phone" placeholder="Phone" />
                  </div>
                  <div class="form-group col-md-9">
                    <input type="text" class="form-control" id="inp_street" placeholder="Street" />
                  </div>
                  <div class="form-group col-md-3">
                    <input type="text" class="form-control" id="inp_number" placeholder="Door Number" />
                  </div>
                  <div class="form-group col-lg-4 col-md-6">
                    <input type="text" class="form-control" id="inp_zip" placeholder="Zip" />
                  </div>
                  <div class="form-group col-lg-4 col-md-6">
                    <input type="text" class="form-control" id="inp_city" placeholder="City" />
                  </div>
                  <div class="form-group col-lg-4 col-md-6">
                    <select name="" id="" class="form-control">
                      <option value="">Select Country</option>
                      <option value="1">Please wait...</option>
                    </select>
                  </div>
                  <div class="form-group col-md-12">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please provide details about your inquiry"></textarea>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck" />
                      <label class="form-check-label" for="gridCheck">
                        I agree terms and conditions.
              </label>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <button type='button' class="btn btn-primary btn-lg bold">Submit</button>
                  </div>
                </div>
                <hr />
              </div>
            </div>

          </div>

        </section>
      </React.Fragment>
    );
  }
}

export default AppWrapper(partnerContact, null, null);
