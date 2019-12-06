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
import { connect } from "react-redux";
import { PATH } from "../../utils/Constants";
import { logout } from "../../actions/userAction";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      open: false,
      languageCode: "EN"
    };
  }

  componentDidMount() {
    let token = store.get("userSession");
    console.log(token);
    this.setState({ token: token });
  }

  handleSignOut = () => {
    this.props.logout(response => {
      console.log(response);
    });
    this.setState({ token: null });
    store.clearAll();
    this.props.history.push("/");
  };

  handleSignIn = () => {
    this.props.history.push(PATH.SIGIN);
  };

  render() {
    let userSession = store.get("userSession");
    let common = userSession && userSession.common ? userSession.common : null;
    let languageList =
      common && common.languageList ? common.languageList : null;
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
                  <img
                    src={logo}
                    class="img-fluid"
                    style={{ cursor: "pointer" }}
                    alt=""
                    onClick={() => {
                      this.props.history.push(PATH.DASHBOARD);
                    }}
                  />
                </a>
                <div class="mobiletop d-block d-xl-none">
                  <ul class="navbar-nav d-inline-flex">
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
                        href="#"
                        id="dropdown01Mob"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="mr-1">
                          <i class="fa fa-user-circle" aria-hidden="true"></i>
                        </span>
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdown01Mob"
                      >
                        <a class="dropdown-item" href="register.html">
                          Saved Searches
                        </a>
                        <a class="dropdown-item" href="register.html">
                          Saved Listings
                        </a>
                        <a class="dropdown-item" href="register.html">
                          Financing
                        </a>
                        <a class="dropdown-item" href="register.html">
                          Inbox
                        </a>
                        <a class="dropdown-item" href="sign-in.html">
                          Sign In
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div class="hamburger_wrap d-inline-flex">
                    <button
                      id="hamburg"
                      class={`hamburger hamburger--collapse ${
                        this.state.open ? "is-active" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        this.setState({ open: !this.state.open });
                      }}
                    >
                      <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class={`menu-wrap col-12 ${this.state.open ? "active" : ""}`}>
              <div class="menu-languages">
                <div class="container">
                  <span class="d-inline-block globe">
                    <a>
                      <i class="fas fa-globe"></i>
                    </a>
                  </span>
                  <ul class="language-links d-inline-block">
                    {languageList && languageList.length
                      ? languageList.map((language, i) => {
                          return (
                            <li>
                              <a
                                href="javascript:;"
                                class={
                                  this.state.languageCode ===
                                  language.languageCode
                                    ? "active"
                                    : ""
                                }
                              >
                                {language.language}
                              </a>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                  <select class="language_select">
                    <option value="0">English</option>
                    <option value="1">Español</option>
                    <option value="2">Français</option>
                    <option value="3">العربية</option>
                    <option value="4">ქართული</option>
                    <option value="5">Kiswahili</option>
                    <option value="6">русский</option>
                    <option value="7">Português</option>
                    <option value="8">日本語</option>
                    <option value="9">中文</option>
                    <option value="10">한국어</option>
                  </select>
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
                        <Link class="nav-link" to={PATH.HOW_TO_ORDER}>
                          How to Order
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to={PATH.transport}>
                          Transport
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to={PATH.PARTNER}>
                          Partner
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to={PATH.SELLER}>
                          Seller
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to={PATH.COMMUNITY}>
                          Community
                        </Link>
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
                          <Link
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                            to={PATH.SAVED_SEARCH}
                          >
                            Saved Searches
                          </Link>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            Saved Listings
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            Financing
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            Inbox
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
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
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
