/*************************************************
 *
 * @exports
 * @class Header.js
 * @extends Component
 * @author Ramkumar
 * @copyright © 2019. All rights reserved.
 *************************************************/

import React, { Component } from "react";
import logo from "../../assets/img/logo.png";
import store from "store";
import { connect } from 'react-redux'
import {PATH} from '../../utils/Constants'
import { logout } from '../../actions/userAction';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }

  componentDidMount() {
    let token = store.get("userSession");
    console.log(token);
    this.setState({ token: token });
  }

  handleSignOut = () => {
    this.props.logout((response)=>{
      console.log(response);
      this.props.prop.history.push("/");
    })
  };

  handleSignIn = () => {
    this.props.prop.history.push(PATH.SIGIN);
  };

  render() {
    return (
      <header class="header">
        <nav
          id="navHeader"
          class="navbar navbar-expand-md navbar-light bg-light fixed-top hideForAni"
        >
          <div class="row parent-row no-gutters">
            <div class="logo-wrap col-12">
              <div class="container">
                <a class="navbar-brand hideForAni">
                  <img src={logo} class="img-fluid" style={{cursor : 'pointer'}} 
                  alt="" onClick = {()=>{this.props.prop.history.push(PATH.DASHBOARD);}} />
                </a>
              </div>
            </div>
            <div class="menu-wrap col-12">
              <div class="menu-languages">
                <div class="container">
                  <span class="d-inline-block globe">
                    <a>
                      <i class="fas fa-globe"></i>
                    </a>
                  </span>
                  <ul class="language-links d-inline-block">
                    <li>
                      <a href="javascript:;" class="active">
                        English
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;">Español</a>
                    </li>
                    <li>
                      <a href="javascript:;">Français</a>
                    </li>
                    <li>
                      <a href="javascript:;">العربية</a>
                    </li>
                    <li>
                      <a href="javascript:;">ქართული</a>
                    </li>
                    <li>
                      <a href="javascript:;">Kiswahili</a>
                    </li>
                    <li>
                      <a href="javascript:;">русский</a>
                    </li>
                    <li>
                      <a href="javascript:;">Português </a>
                    </li>
                    <li>
                      <a href="javascript:;">日本語</a>
                    </li>
                    <li>
                      <a href="javascript:;">中文 </a>
                    </li>
                    <li>
                      <a href="javascript:;">한국어</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="menu-main">
                <div class="container">
                  <div class="row no-gutters">
                    <ul class="navbar-nav nav-center mr-auto">
                      <li class="nav-item active">
                        <Link class="nav-link" to={PATH.ADVANCED_SEARCH}>
                          Car Shop
                        </Link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          How to Order
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Transport
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Partner
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Seller
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Community
                        </a>
                      </li>
                    </ul>
                    <ul class="navbar-nav nav-right">
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Research
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Advertise
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span>
                            <i class="fa fa-bell" aria-hidden="true"></i>
                          </span>
                        </a>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="http://example.com"
                          id="dropdown01"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span class="mr-1">
                            <i class="fa fa-user-circle" aria-hidden="true"></i>
                          </span>
                          My Account
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                          <a class="dropdown-item" style={{cursor : 'pointer'}}>
                            Saved Searches
                          </a>
                          <a class="dropdown-item" style={{cursor : 'pointer'}}>
                            Saved Listings
                          </a>
                          <a class="dropdown-item" style={{cursor : 'pointer'}}>
                            Financing
                          </a>
                          <a class="dropdown-item" style={{cursor : 'pointer'}}>
                            Inbox
                          </a>
                          <a class="dropdown-item" style={{cursor : 'pointer'}}>
                            {this.state.token ? (
                              <span
                                onClick={() => {
                                  this.handleSignOut();
                                }}
                              >
                                logout
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  this.handleSignIn();
                                }}
                              >
                                {" "}
                                signin{" "}
                              </span>
                            )}{" "}
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (username, password, callback) => {
      dispatch(logout(username, password, callback));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
