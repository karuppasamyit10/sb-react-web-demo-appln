import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class partnerSubDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Partner SubDescription";
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
                  Partner subdescription
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap partners_wrap">
          <div class="container">

            <div class="row align-items-center">
              <div class="col-lg-4">
                <div class="head1 green medium">
                  Find a Contact Person
          </div>
              </div>
              <div class="col-lg-5">
                <div class="head2 medium">
                  <a href="partners-countries.html" class="btn btn-link head2 regular"> Find a Countries </a>
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
            <div class="para2">
              252 Results
      </div>
            <div class="row no-gutters mt-4">
              <div class="col-12">

                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <img src={require('../../assets/img/billboard-1.png')} class="card-img" alt="harasow" />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title bold">Jenny Alexander</h5>
                        <p class="card-text head3 regular">Business Line Manager - Pharmaceutical</p>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="para1">
                              Phone: +351 229 397 366
                      </div>
                            <div class="para1">
                              Fax: +351 229 397 369
                      </div>
                          </div>
                          <div class="col-md-4">
                            <div class="para1">
                              DKSH Portugal
                      </div>
                            <div class="para1">
                              Rua da Lionesa 446, Espaço C23 <br />
                              4465-671 Matosinhos <br />
                              Portugal
                      </div>
                          </div>
                          <div class="col-md-4 text-center">
                            <div class="my-2">
                              <Link to={PATH.PARTNER_CONTACT} class="btn btn-outline-secondary">Contact Form</Link>
                            </div>
                            <div class="my-2">
                              <Link to={PATH.PARTNER_COUNTRY} class="btn btn-outline-secondary">Show on Map</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <img src={require('../../assets/img/billboard-1.png')} class="card-img" alt="harasow" />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title bold">Jenny Alexander</h5>
                        <p class="card-text head3 regular">Business Line Manager - Pharmaceutical</p>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="para1">
                              Phone: +351 229 397 366
                      </div>
                            <div class="para1">
                              Fax: +351 229 397 369
                      </div>
                          </div>
                          <div class="col-md-4">
                            <div class="para1">
                              DKSH Portugal
                      </div>
                            <div class="para1">
                              Rua da Lionesa 446, Espaço C23 <br />
                              4465-671 Matosinhos <br />
                              Portugal
                      </div>
                          </div>
                          <div class="col-md-4 text-center">
                            <div class="my-2">
                              <a href="partners-contact.html" class="btn btn-outline-secondary">Contact Form</a>
                            </div>
                            <div class="my-2">
                              <a href="partners-map.html" class="btn btn-outline-secondary">Show on Map</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <img src={require('../../assets/img/billboard-1.png')} class="card-img" alt="harasow" />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title bold">Jenny Alexander</h5>
                        <p class="card-text head3 regular">Business Line Manager - Pharmaceutical</p>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="para1">
                              Phone: +351 229 397 366
                      </div>
                            <div class="para1">
                              Fax: +351 229 397 369
                      </div>
                          </div>
                          <div class="col-md-4">
                            <div class="para1">
                              DKSH Portugal
                      </div>
                            <div class="para1">
                              Rua da Lionesa 446, Espaço C23 <br />
                              4465-671 Matosinhos <br />
                              Portugal
                      </div>
                          </div>
                          <div class="col-md-4 text-center">
                            <div class="my-2">
                              <a href="partners-contact.html" class="btn btn-outline-secondary">Contact Form</a>
                            </div>
                            <div class="my-2">
                              <a href="partners-map.html" class="btn btn-outline-secondary">Show on Map</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <img src={require('../../assets/img/billboard-1.png')} class="card-img" alt="harasow" />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title bold">Jenny Alexander</h5>
                        <p class="card-text head3 regular">Business Line Manager - Pharmaceutical</p>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="para1">
                              Phone: +351 229 397 366
                      </div>
                            <div class="para1">
                              Fax: +351 229 397 369
                      </div>
                          </div>
                          <div class="col-md-4">
                            <div class="para1">
                              DKSH Portugal
                      </div>
                            <div class="para1">
                              Rua da Lionesa 446, Espaço C23 <br />
                              4465-671 Matosinhos <br />
                              Portugal
                      </div>
                          </div>
                          <div class="col-md-4 text-center">
                            <div class="my-2">
                              <a href="partners-contact.html" class="btn btn-outline-secondary">Contact Form</a>
                            </div>
                            <div class="my-2">
                              <a href="partners-map.html" class="btn btn-outline-secondary">Show on Map</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-3">
                      <img src={require('../../assets/img/billboard-1.png')} class="card-img" alt="harasow" />
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title bold">Jenny Alexander</h5>
                        <p class="card-text head3 regular">Business Line Manager - Pharmaceutical</p>
                        <div class="row mt-4">
                          <div class="col-md-4">
                            <div class="para1">
                              Phone: +351 229 397 366
                      </div>
                            <div class="para1">
                              Fax: +351 229 397 369
                      </div>
                          </div>
                          <div class="col-md-4">
                            <div class="para1">
                              DKSH Portugal
                      </div>
                            <div class="para1">
                              Rua da Lionesa 446, Espaço C23 <br />
                              4465-671 Matosinhos <br />
                              Portugal
                      </div>
                          </div>
                          <div class="col-md-4 text-center">
                            <div class="my-2">
                              <a href="partners-contact.html" class="btn btn-outline-secondary">Contact Form</a>
                            </div>
                            <div class="my-2">
                              <a href="partners-map.html" class="btn btn-outline-secondary">Show on Map</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AppWrapper(partnerSubDescription, null, null);
