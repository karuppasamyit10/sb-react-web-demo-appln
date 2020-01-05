import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class magazine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    document.title = "Auto Harasow | magazine";
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
                  <Link to={PATH.COMMUNITY}>Community</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Magazine
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <section class="about_wrap transport_harasow">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="whatwedo">
                  <img src={require('../../assets/img/about/what-we-do/image.png')} class="img-fluid w-100" alt="" />
                </div>
              </div>
            </div>
            <div class="spacer1"></div>
            <div class="head1 medium">
              Auto Harasow Magazine
           </div>
            <div class="row">
              <div class="col-md-4">
                <div class="aboutgrid">
                  <img src={require('../../assets/img/about/image1.png')} class="img-fluid w-100" alt="" />
                  <div class="head2 mt-3">What we do</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                  </p>
                  <div class="readmore">
                    <a href="what-we-do.html" class="btn btn-link para1 medium">
                      <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="aboutgrid">
                  <img src={require('../../assets/img/about/image2.png')} class="img-fluid w-100" alt="" />
                  <div class="head2 mt-3">Who we are</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                    </p>
                  <div class="readmore">
                    <a href="who-we-are.html" class="btn btn-link para1 medium">
                      <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="aboutgrid">
                  <img src={require('../../assets/img/about/image3.png')} class="img-fluid w-100" alt="" />
                  <div class="head2 mt-3">How we work</div>
                  <p class="para1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus quam quis qui odit tempore ea perspiciatis est mollitia repellendus numquam aut, necessitatibus, cum nemo molestiae a pariatur fugit voluptas.
                      </p>
                  <div class="readmore">
                    <a href="how-we-work.html" class="btn btn-link para1 medium">
                      <span class="d-inline-block align-middle"><i class="fas fa-caret-right"></i></span>
                      <span class="d-inline-block align-middle">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
            <div class="spacer1"></div>
            <div class="row year_results">
              <div class="col-12">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active head3 bold" id="2019-tab" data-toggle="tab" href="#2019" role="tab" aria-controls="2019" aria-selected="true">2019</a>
                  </li>

                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active py-4" id="2019" role="tabpanel" aria-labelledby="2019-tab">
                    <div class="head3 bold mb-2">Half-Year Results 2019</div>
                    <p class="para1">
                      DKSH Holding Ltd. (SIX: DKSH) reports its half-year results 2019 on Tuesday, July 16, 2019. The webcast will be conducted in English as follows. Tuesday, July 16, 2019, 11:00 A.M CET.
                        </p>
                    <ul class="list-group">
                      <li class="list-group-item"><a href="javascript:;"> <span><i class="fas fa-file-pdf"></i></span> Invitation to Investor and Analyst conference</a></li>
                      <li class="list-group-item"><a href="javascript:;"> <span><i class="fas fa-file-pdf"></i></span>Half year 2019</a></li>
                      <li class="list-group-item"><a href="javascript:;"> <span><i class="fas fa-file-pdf"></i></span>Half year 2019 media releases</a></li>
                      <li class="list-group-item"><a href="javascript:;"> <span><i class="fas fa-file-pdf"></i></span>Half year 2019</a></li>
                      <li class="list-group-item"><a href="javascript:;"> <span><i class="fas fa-file-pdf"></i></span>Half year 2019 media releases</a></li>
                    </ul>
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

export default AppWrapper(magazine, null, null);
