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
import "./i18nxt";
import { useTranslation, withTranslation } from "react-i18next";
import i18n from "./i18nxt";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      open: false,
      error: null,
      isLoaded: false,
      items: [],
      Menu1: "",
      Menu2: "",
      Menu3: "",
      Menu4: "",
      Menu5: "",
      Menu6: ""
    };
  }

  componentDidMount() {
    let token = store.get("userSession");
    console.log(token);
    this.setState({ token: token });
    let jsonFile = require("../../assets/Content.json");
    this.setState({ items: jsonFile });
    console.log(jsonFile);
    console.log(jsonFile.items[0].Menu1);
    console.log(localStorage.getItem("language"));
    this.setState.items = jsonFile;
    if (localStorage.getItem("language") == "ES") {
      this.setState.Menu1 = jsonFile.items[1].Menu1;
      this.setState.Menu2 = jsonFile.items[1].Menu2;
      this.setState.Menu3 = jsonFile.items[1].Menu3;
      this.setState.Menu4 = jsonFile.items[1].Menu4;
      this.setState.Menu5 = jsonFile.items[1].Menu5;
      this.setState.Menu6 = jsonFile.items[1].Menu6;
    } else {
      this.setState.Menu1 = jsonFile.items[0].Menu1;
      this.setState.Menu2 = jsonFile.items[0].Menu2;
      this.setState.Menu3 = jsonFile.items[1].Menu3;
      this.setState.Menu4 = jsonFile.items[1].Menu4;
      this.setState.Menu5 = jsonFile.items[1].Menu5;
      this.setState.Menu6 = jsonFile.items[1].Menu6;
    }
  }

  handleSignOut = () => {
    this.props.logout(response => {
      console.log(response);
      this.props.prop.history.push("/");
    });
  };

  handleChangeLanguage = lang => {
    this.props.i18n.changeLanguage(lang);
  };

  handleLanguage = (languageCode, code) => {
    //localStorage.setItem('language',languageCode);
    //alert(localStorage.getItem('language'));
    // this.setState.items.forEach(lang,i=>{
    //   console.log(lang.items[{i}].Menu1);
    // })
    //for (let lang of this.items) {
    //console.log(lang.items[0].Menu1);
    //}
    console.log(this.setState.items);
    var i = 0;
    for (let [key, value] of Object.entries(this.setState.items)) {
      if (languageCode == value[code].languageid) {
        localStorage.setItem("language", value[code].languageid);
        this.setState.Menu1 = value[code].Menu1;
        this.setState.Menu2 = value[code].Menu2;
        window.location.reload();
        console.log("Language Code Matched");
        console.log(localStorage.getItem("language"));
      }
      console.log(value[i].Menu1);
      i++;
    }
  };

  handleSignIn = () => {
    this.props.prop.history.push(PATH.SIGIN);
    console.log(this.items);
  };

  render() {
    const { t } = this.props;
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
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("en");
                        }}
                        href="javascript:;"
                        class="active"
                      >
                        English
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("es");
                        }}
                        href="javascript:;"
                      >
                        Español
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("fr");
                        }}
                        href="javascript:;"
                      >
                        Français
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("ar");
                        }}
                        href="javascript:;"
                      >
                        العربية
                      </a>
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
                      <a
                        onClick={() => {
                          this.handleLanguage("ES");
                        }}
                        href="javascript:;"
                      >
                        日本語
                      </a>
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
                          {/* {this.setState.Menu1} */}
                          {t("Car Shop.1")}
                        </Link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {/* {this.setState.Menu2} */}
                          {t("How to Order.1")}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {/* {this.setState.Menu3} */}
                          {t("Transport.1")}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {/* {this.setState.Menu4} */}
                          {t("Partner.1")}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {/* {this.setState.Menu5} */}
                          {t("Seller.1")}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {/* {this.setState.Menu6} */}
                          {t("Community.1")}
                        </a>
                      </li>
                    </ul>
                    <ul class="navbar-nav nav-right">
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {t("Research.1")}
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          {t("Advertise.1")}
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
                          {t("My Account.1")}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            {t("Saved Searches.1")}
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            {t("Saved Listings.1")}
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            {t("Financing.1")}
                          </a>
                          <a
                            class="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            {t("Inbox.1")}
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
                                {t("logout.1")}
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  this.handleSignIn();
                                }}
                              >
                                {t("signin.1")}
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

const translate = withTranslation()(Header);
export default connect(null, mapDispatchToProps)(translate);
