import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class savedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Saved Search";
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
                  Saved Search
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="register-wrap spacerTop">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="sidelinks">
                  <div class="slhead text-center medium head3">My Account</div>
                  <ul class="sllinks medium">
                    <li class="active">
                      <a href="saved-search.html">
                        Saved Searches{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Saved Listings{" "}
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Financing
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="saved-search.html">
                        Inbox
                        <span>
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9 form-wrap">
                <h1 class="form-header">Saved Searches</h1>
                <p class="lead">List of saved searches.</p>
                <div class="row no-gutters">
                  <div class="col-12">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Car Model</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Used Acura MDX</td>
                            <td>
                              357 Great Deals out of 7,942 listings starting at
                              $1,100
                            </td>
                            <td>USD 970</td>
                            <td>
                              <div
                                class="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button type="button" class="btn btn-primary">
                                  Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default AppWrapper(savedSearch, null, null);
