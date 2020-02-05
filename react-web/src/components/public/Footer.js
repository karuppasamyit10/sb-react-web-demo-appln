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
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-left">
                <div className="flogo bold text-uppercase">harasow</div>
                <p className="para white">&copy; Harasow. All Rights Reserved.</p>
              </div>
              <div className="footer-left">
                <i className="fa fa-facebook-square" style={{ color: 'white' }}></i>
                <i className="	fa fa-twitter ml-2" style={{ color: 'white' }}></i>
                <i className="fa fa-instagram ml-2" style={{ color: 'white' }}></i>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-3">
                  <ul className="flinks">
                    <li>Harasow</li>
                    <li>
                      <a >Buy</a>
                    </li>
                    <li>
                      <a >Sell / Trade</a>
                    </li>
                    <li>
                      <a >Finance</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="flinks">
                    <li>About</li>
                    <li>
                      <Link to={PATH.ABOUT_US}>About Us</Link>
                    </li>
                    <li>
                      {/* <a >Harasow Production</a> */}
                      <Link to={PATH.MAGZINE}>Magazine </Link>
                    </li>
                    <li>
                      <a >FAQ</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="flinks">
                    <li>Contact</li>
                      <li>
                        <Link to={PATH.CONTACT_US}>Contact Us</Link>
                      </li>
                      <li>
                        <Link to={PATH.MEDIA}>Media</Link>
                      </li>
                    <li>
                      <a >(XXX) XXX - XXXX</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="flinks">
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
