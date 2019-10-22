import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class harasowTransport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | Harasow Transport";
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
                  Harasow Transport
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap transport_harasow">
          <div class="container">
            <div class="head1 medium">
              Auto Harasow Transport
      </div>
            <div class="spacer1"></div>
            <div class="row">
              <div class="col-12 text-center">
                <div class="head1">How to <span class="green bold">Transport</span> My Car, Bus, Truck or Equipment?</div>
                <div class="head3">You can ship your vehicle in a container or Ro-Ro vessel. But which option is better?
            You can compare and choose which is cheaper and convenient for you.</div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="row">
              <div class="col-12">
                <ul class="nav nav-pills nav-fill switch_shipping">
                  <li class="nav-item">
                    <a class="nav-link medium" href="#">Ro-Ro vessel shipping</a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link active medium" href="#">Container vessel shipping</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="row no-gutters">
              <div class="col-12">
                <img src={require('../../assets/img/about/what-we-do/image.png')} class="img-fluid w-100" alt="" />
                <div class="head3 mt-3">Container Vessel Shipping</div>
                <p class="para1 mt-2">
                  Container vessel shipping is cheaper way to ship many units of cars. And also inland countries have to ship vehicles by container so that they can track it to their country. Shoring work and container trucking work needed.
          </p>
              </div>
            </div>
            <hr />

            <div class="row no-gutters">
              <div class="col-12">
                <div class="head2 bold green text-center">How to Calculate</div>
                <div class="greybox text-center mt-3">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="calcgrid">
                        <div class="icon">

                          <img src={require('../../assets/img/about/what-we-do/icon_ship.png')} alt="" />
                        </div>
                        <p class="para1 mt-2">
                          Shipping fee to put items into container
              </p>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="calcgrid">
                        <div class="icon">
                          <img src={require('../../assets/img/about/what-we-do/icon_ship.png')} alt="" />
                        </div>
                        <p class="para1 mt-2">
                          Inland tracking fee to transport and portyard
              </p>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="calcgrid">
                        <div class="icon">
                          <img src={require('../../assets/img/about/what-we-do/icon_ship.png')} alt="" />
                        </div>
                        <p class="para1 mt-2">
                          Ocean Freight to ship the item to your country's port
              </p>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="calcgrid">
                        <div class="icon">
                          <img src={require('../../assets/img/about/what-we-do/icon_ship.png')} alt="" />
                        </div>
                        <p class="para1 mt-2">
                          Other charges (THC, Wharfage, Loading fee, etc)
              </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row no-gutters">
              <div class="col-12 text-center">
                <div class="head2 bold green ">What container shoring work?</div>
                <p class="para1 mt-2">
                  The shoring service is to stuff the items into the container and fix it. Let's show to do shoring of containers.
      </p>
              </div>
              <div class="col-12">
                <iframe width="100%" height="400" src="https://www.youtube.com/embed/EE-CITExdDE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <ul class="nav nav-tabs transporttabs nav-fill" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="compact-tab" data-toggle="tab" href="#compact" role="tab" aria-controls="compact" aria-selected="true">Compact</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="sedan-tab" data-toggle="tab" href="#sedan" role="tab" aria-controls="sedan" aria-selected="false">Sedan</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="van-tab" data-toggle="tab" href="#van" role="tab" aria-controls="van" aria-selected="false">Van</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="bus-tab" data-toggle="tab" href="#bus" role="tab" aria-controls="bus" aria-selected="false">Bus</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="equipmentwheel-tab" data-toggle="tab" href="#equipmentwheel" role="tab" aria-controls="equipmentwheel" aria-selected="false">Equipment (Wheel)</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="equipmentcater-tab" data-toggle="tab" href="#equipmentcater" role="tab" aria-controls="equipmentcater" aria-selected="false">Equipment (Caterpillar)</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active py-4" id="compact" role="tabpanel" aria-labelledby="compact-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>

                  </div>
                  <div class="tab-pane fade py-4" id="sedan" role="tabpanel" aria-labelledby="sedan-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade py-4" id="van" role="tabpanel" aria-labelledby="van-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade py-4" id="bus" role="tabpanel" aria-labelledby="bus-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade py-4" id="equipmentwheel" role="tabpanel" aria-labelledby="equipmentwheel-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade py-4" id="equipmentcater" role="tabpanel" aria-labelledby="equipmentcater-tab">
                    <div class="row no-gutters">
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc08.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc06.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc07.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                      <div class="col-6">
                        <img src={require('../../assets/img/about/what-we-do/acc05.jpg')} class="img-fluid w-100" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row no-gutters">
              <div class="col-12 text-center">
                <div class="head2 bold green ">No. of items to be put into container</div>
              </div>
              <div class="col-12 mt-3">
                <div class="head3 mb-3">Cars / Trucks / Buses</div>
                <div class="table-responsive">
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Items</th>
                        <th scope="col">20ft container</th>
                        <th scope="col">40HQ Container</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Compact Cars (Kia Morning, GM Daewoo Matiz) </td>
                        <td>2</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Compact Cars (Kia Morning, GM Daewoo Matiz) </td>
                        <td>2</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Compact Cars (Kia Morning, GM Daewoo Matiz) </td>
                        <td>2</td>
                        <td>6</td>
                      </tr>
                      <tr>
                        <td>Compact Cars (Kia Morning, GM Daewoo Matiz) </td>
                        <td>2</td>
                        <td>6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12 mt-3">
                <div class="head3 mb-3">Construction Equipment</div>
                <div class="table-responsive">
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Items</th>
                        <th scope="col">20ft container</th>
                        <th scope="col">40HQ Container</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Under 3 ton excavator</td>
                        <td>2</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Under 3 ton excavator</td>
                        <td>2</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Under 3 ton excavator</td>
                        <td>2</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Under 3 ton excavator</td>
                        <td>2</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </section>
      </React.Fragment>
    );
  }
}

export default AppWrapper(harasowTransport, null, null);
