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
      userSession: store.get("userSession"),
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
    let userSession = store.get("userSession");
    console.log(userSession);
    this.setState({ userSession: userSession });
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
      this.setState({ userSession: undefined });
      console.log(this.props);
      if(this.props && this.props.history){
        this.props.history.push("/");
      }
    });
    this.props.history.push("/");
    store.clearAll();
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
    this.props.history.push(PATH.SIGIN);
    console.log(this.items);
  };

  render() {
    const { t } = this.props;
    return (
      <header className="header">
        <nav
          id="navHeader"
          className="navbar navbar-expand-md navbar-light bg-light fixed-top hideForAni"
        >
          <div className="row parent-row no-gutters">
            <div className="logo-wrap col-12">
              <div className="container">
                <a className="navbar-brand hideForAni">
                  <img
                    src={logo}
                    className="img-fluid"
                    style={{ cursor: "pointer" }}
                    alt=""
                    onClick={() => {
                      this.props.history.push(PATH.DASHBOARD);
                    }}
                  />
                </a>
                <div className="mobiletop d-block d-xl-none">
                  <ul className="navbar-nav d-inline-flex">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span>
                          <i className="fa fa-bell" aria-hidden="true"></i>
                        </span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="dropdown01Mob"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="mr-1">
                          <i className="fa fa-user-circle" aria-hidden="true"></i>
                        </span>
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdown01Mob">
                        <Link className="dropdown-menu" aria-labelledby="dropdown01Mob"
                            style={{ cursor: "pointer" }}
                            to={PATH.SAVED_SEARCH}>
                            {t("Saved Searches.1")}
                        </Link>
                        { this.state.userSession && this.state.userSession.userInfo && this.state.userSession.userInfo.userType == 'ADMIN' ?
                          <Link
                          className="dropdown-menu" aria-labelledby="dropdown01Mob"
                          style={{ cursor: "pointer" }}
                          to={PATH.SAVED_SEARCH}
                          >
                          {t("Saved Searches.1")}
                        </Link>:''
                        }
                        <a className="dropdown-item">
                          Saved Listings
                        </a>
                        <a className="dropdown-item">
                          Financing
                        </a>
                        <a className="dropdown-item">
                          Inbox
                        </a>
                        <a className="dropdown-item">
                          Sign In
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div className="hamburger_wrap d-inline-flex">
                    <button
                      id="hamburg"
                      className={`hamburger hamburger--collapse ${
                        this.state.open ? "is-active" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        this.setState({ open: !this.state.open });
                      }}
                    >
                      <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`menu-wrap col-12 ${this.state.open ? "active" : ""}`}>
              <div className="menu-languages">
                <div className="container">
                  <span className="d-inline-block globe">
                    <a>
                      <i className="fas fa-globe"></i>
                    </a>
                  </span>
                  <ul className="language-links d-inline-block">
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("en");
                        }}
                        
                        className="active"
                      >
                        English
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("es");
                        }}
                        
                      >
                        Español
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("fr");
                        }}
                        
                      >
                        Français
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleChangeLanguage("ar");
                        }}
                        
                      >
                        العربية
                      </a>
                    </li>
                    <li>
                      <a >ქართული</a>
                    </li>
                    <li>
                      <a >Kiswahili</a>
                    </li>
                    <li>
                      <a >русский</a>
                    </li>
                    <li>
                      <a >Português </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.handleLanguage("ES");
                        }}
                        
                      >
                        日本語
                      </a>
                    </li>
                    <li>
                      <a >中文 </a>
                    </li>
                    <li>
                      <a >한국어</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-main">
                <div className="container">
                  <div className="row no-gutters">
                    <ul className="navbar-nav nav-center mr-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to={PATH.ADVANCED_SEARCH}>
                          {/* {this.setState.Menu1} */}
                          {t("Car Shop.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.HOW_TO_ORDER}>
                          {/* {this.setState.Menu2} */}
                          {t("How to Order.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.transport}>
                          {/* {this.setState.Menu3} */}
                          {t("Transport.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.PARTNER}>
                          {/* {this.setState.Menu4} */}
                          {t("Partner.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.SELLER}>
                          {/* {this.setState.Menu5} */}
                          {t("Seller.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.COMMUNITY}>
                          {/* {this.setState.Menu6} */}
                          {t("Community.1")}
                        </Link>
                      </li>
                    </ul>
                    <ul className="navbar-nav nav-right">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          {t("Research.1")}
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={PATH.ADVERTISE}>
                          {t("Advertise.1")}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                          </span>
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="http://example.com"
                          id="dropdown01"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="mr-1">
                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                          </span>
                          {/* {t("My Account.1")} */}
                          { this.state.userSession && this.state.userSession.userInfo && this.state.userSession.userInfo.displayName ?this.state.userSession.userInfo.displayName : t("My Account.1")} 
                        </a>
                        { 
                          this.state.userSession && this.state.userSession.userInfo && this.state.userSession.userInfo.userType == 'ADMIN' ?
                          <div className="dropdown-menu" aria-labelledby="dropdown01">
                          <Link
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            to={PATH.ADMIN_MY_ACCOUNT}
                          >
                            My Account
                          </Link>
                          <a
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            {this.state.userSession && this.state.userSession.userInfo ? (
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
                        :

                          <div className="dropdown-menu" aria-labelledby="dropdown01">
                            { 
                              this.state.userSession && this.state.userSession.userInfo && this.state.userSession.userInfo.memberShipId && 
                              this.state.userSession.userInfo.memberShipId > 0?
                              <Link
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                to={PATH.PRODUCT_LIST}
                              >
                                Product List
                              </Link>
                              : '' 
                            }
                            <Link
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              to={PATH.SAVED_SEARCH}
                            >
                              {t("Saved Searches.1")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              to={PATH.SAVED_SEARCH}
                            >
                              {t("Saved Listings.1")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              to={PATH.SAVED_SEARCH}
                            >
                              {t("Financing.1")}
                            </Link>
                            <Link
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              to={PATH.SAVED_SEARCH}
                            >
                              {t("Inbox.1")}
                            </Link>
                            <a
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              {this.state.userSession && this.state.userSession.userInfo ? (
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
                        }
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
