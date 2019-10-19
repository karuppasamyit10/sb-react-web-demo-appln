import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class transportSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Transport";
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
                  <Link to={PATH.transport}>Transport</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Transport Schedule
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section class="about_wrap">
          <div class="container">
            <div class="head1 medium">Transport Schedule</div>
            <div class="spacer1"></div>
            <div class="row">
              <div class="col-12">
                <div class="head2">Find a Location</div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-4">
                <div class="form-group">
                  <select name="" id="" class="form-control">
                    <option value="">Departure</option>
                    <option value="1">Loading...</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <select name="" id="" class="form-control">
                    <option value="">Arival</option>
                    <option value="1">Loading...</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="para1">270 Results</div>
            <div class="table-responsive mt-3">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Country of Departure / Arrival</th>
                    <th scope="col">Vessel Type</th>
                    <th scope="col">Port of Loading</th>
                    <th scope="col">Port of Destination</th>
                    <th scope="col">Estimated time of Departure</th>
                    <th scope="col">Estimated time of Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Korea</td>
                    <td>Ro-Ro</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                  <tr>
                    <td>Korea</td>
                    <td>Container</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                  <tr>
                    <td>Korea</td>
                    <td>Consolidation</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                  <tr>
                    <td>Korea</td>
                    <td>Ro-Ro</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                  <tr>
                    <td>Korea</td>
                    <td>Container</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                  <tr>
                    <td>Korea</td>
                    <td>Consolidation</td>
                    <td>S.Korea Incheon</td>
                    <td>Ukraine</td>
                    <td>2019.10.17</td>
                    <td>2019.10.20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                  <li class="page-item disabled">
                    <a
                      class="page-link"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Previous
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="row">
              <div class="col">
                <div class="translogos">
                  <img
                    src={require('../../assets/img/translogos/1.png')}
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div class="col">
                <div class="translogos">
                  <img
                    src={require('../../assets/img/translogos/2.png')}
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div class="col">
                <div class="translogos">
                  <img
                    src={require('../../assets/img/translogos/3.png')}
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default AppWrapper(transportSchedule, null, null);
