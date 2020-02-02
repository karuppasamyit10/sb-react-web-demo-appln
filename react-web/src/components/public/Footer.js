/*************************************************
 *
 * @exports
 * @class Footer.js
 * @extends Component
 * @author Ramkumar
 * @copyright © 2019 . All rights reserved.
 *************************************************/

import React, { Component } from "react";
import { connect } from "react-redux";
import { changeUploadStaus } from "../../actions/userAction";
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/Constants';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false
    };
  }

  render() {
    return (
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="footer-left">
                <div class="flogo bold text-uppercase">harasow</div>
                <p class="para white">&copy; Harasow. All Rights Reserved.</p>
              </div>
              <div class="footer-left">
                <i className="fa fa-facebook-square" style={{ color: 'white' }}></i>
                <i className="	fa fa-twitter ml-2" style={{ color: 'white' }}></i>
                <i className="fa fa-instagram ml-2" style={{ color: 'white' }}></i>
              </div>
            </div>
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-3">
                  <ul class="flinks">
                    <li>Harasow</li>
                    <li>
                      <a href="javascript:;">Buy</a>
                    </li>
                    <li>
                      <a href="javascript:;">Sell / Trade</a>
                    </li>
                    <li>
                      <a href="javascript:;">Finance</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-3">
                  <ul class="flinks">
                    <li>About</li>
                    <li>
                      <Link to={PATH.ABOUT_US}>About Us</Link>
                    </li>
                    <li>
                      {/* <a href="javascript:;">Harasow Production</a> */}
                      <Link to={PATH.MAGZINE}>Magazine </Link>
                    </li>
                    <li>
                      <a href="javascript:;">FAQ</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-3">
                  <ul class="flinks">
                    <li>Contact</li>
                      <li>
                        <Link to={PATH.CONTACT_US}>Contact Us</Link>
                      </li>
                      <li>
                        <Link to={PATH.MEDIA}>Media</Link>
                      </li>
                    <li>
                      <a href="javascript:;">(XXX) XXX - XXXX</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-3">
                  <ul class="flinks">
                    <li>
                      <Link to={PATH.MEMBERSHIPFEE}>Sell</Link>
                    </li>
                    <li>
                      <Link to={PATH.REGISTEREDITEMS}>Place an AD</Link>
                    </li>
                    <li>
                      <Link to={PATH.MEMBERSHIPFEE}>Membership Fee</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    changeUploadStaus: value => {
      dispatch(changeUploadStaus(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
