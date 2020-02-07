import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { AppWrapper } from "../public/AppWrapper";
import { logInUser, userRegistration } from "../../actions/userAction";
import { getVehicleMasterData } from "../../actions/searchAction";
import { showNotification } from "../../actions/NotificationAction";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class myAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      mobile: "",
      name: "",
      city: "",
      countryId: null,
      countryList: [],
      error: {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobile: "",
        name: "",
        countryId: "",
        city: "",
      },
      token: {},
      isdisable: false
    };
    this.userNameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.emailRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.mobileRef = React.createRef();
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Auto Harasow | Registration";
    this.getVehicleMasterData()
  }

  getVehicleMasterData = () => {
    this.props.getVehicleMasterData({}, response => {
      if (response && response.response_code === 0) {
        this.setState({ countryList: response.response.countryList })
      }
    })
  }

  handleOnChange = e => {
    let { target } = e;
    let { name, value } = target;
    if (name === "mobile") {
      value = value.replace(/[^0-9]/g, "");
    }
    this.setState({ [name]: value }, () => {
      this.handleRemoveError();
    });
  };

  onChangeCountry = (e) => {
    this.setState({ countryId: e.target.value }, () => { });
  }

  handleRemoveError = () => {
    let {
      userName,
      password,
      error,
      confirmPassword,
      email,
      name,
      mobile,
      countryId,
      city
    } = this.state;
    if (userName) {
      this.userNameRef.current.classList.remove("error");
      error.userName = "";
      this.setState({ error: error });
    }
    if (email) {
      this.emailRef.current.classList.remove("error");
      error.email = "";
      this.setState({ error: error });
    }
    if (password) {
      this.passwordRef.current.classList.remove("error");
      error.password = "";
      this.setState({ error: error });
    }
    if (confirmPassword) {
      this.confirmPasswordRef.current.classList.remove("error");
      error.confirmPassword = "";
      this.setState({ error: error });
    }
    if (name) {
      this.nameRef.current.classList.remove("error");
      error.name = "";
      this.setState({ error: error });
    }
    if (mobile) {
      this.mobileRef.current.classList.remove("error");
      error.mobile = "";
      this.setState({ error: error });
    }
    if (countryId) {
      this.mobileRef.current.classList.remove("error");
      error.countryId = "";
      this.setState({ error: error });
    }
    if (city) {
      this.mobileRef.current.classList.remove("error");
      error.city = "";
      this.setState({ error: error });
    }
  };

  handleValidate = () => {
    let {
      userName,
      password,
      error,
      confirmPassword,
      email,
      name,
      mobile,
      countryId,
      city
    } = this.state;
    if (!userName) {
      this.userNameRef.current.focus();
      this.userNameRef.current.classList.add("error");
      error.userName = "Enter user name";
      this.setState({ error: error });
      return false;
    }
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.emailRef.current.focus();
      this.emailRef.current.classList.add("error");
      error.email = "Enter Valid Email";
      this.setState({ error: error });
      return false;
    }
    if (!password) {
      this.passwordRef.current.focus();
      this.passwordRef.current.classList.add("error");
      error.password = "Enter Password";
      this.setState({ error: error });
      return false;
    }
    if (!confirmPassword) {
      this.confirmPasswordRef.current.focus();
      this.confirmPasswordRef.current.classList.add("error");
      error.confirmPassword = "Enter Confirm Password";
      this.setState({ error: error });
      return false;
    }
    if (confirmPassword !== password) {
      this.confirmPasswordRef.current.focus();
      this.confirmPasswordRef.current.classList.add("error");
      error.confirmPassword = "Confirm Password and password mismatch";
      this.setState({ error: error });
      return false;
    }
    if (!name) {
      this.nameRef.current.focus();
      this.nameRef.current.classList.add("error");
      error.name = "Enter name";
      this.setState({ error: error });
      return false;
    }
    if (!mobile) {
      this.mobileRef.current.focus();
      this.mobileRef.current.classList.add("error");
      error.mobile = "Enter mobile";
      this.setState({ error: error });
      return false;
    }
    if (!countryId) {
      this.mobileRef.current.focus();
      this.mobileRef.current.classList.add("error");
      error.countryId = "Choose Country";
      this.setState({ error: error });
      return false;
    }
    if (!city) {
      this.mobileRef.current.focus();
      this.mobileRef.current.classList.add("error");
      error.city = "Enter City";
      this.setState({ error: error });
      return false;
    }
    return true;
  };

  submit = () => {
    console.log(this.state.userName, this.state.password);
    let {
      userName,
      password,
      email,
      confirmPassword,
      mobile,
      name
    } = this.state;
    let inputObject = {
      userName,
      password,
      email,
      confirmPassword,
      mobile,
      name
    };
    let submit = this.handleValidate();
    if (submit) {
      this.setState({ isdisable: true });
      this.props.registration(inputObject, response => {
        if (response && response.response_code == 0) {
          this.setState({ isdisable: false });
          this.props.showNotification("sucessfully registered", "success");
          this.props.history.push("/");
        } else if (response && response.response_code > 0) {
          this.setState({ isdisable: false });
          this.props.showNotification(response.response.response_message, "error");
          this.props.history.push("/");
        }
      });
    }
  };

  render() {
    return (
      <section class="">
        <div class="container">
          <div class="row">
            <div class="col-md-9 form-wrap">
              <h1 class="form-header">MY ACCOUNT</h1>
              <form class="row no-gutters form-rows">
                <div class="col-lg-12">
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">ID</label>
                    <div class="col-md-9 form-right">
                      <input
                        type="text"
                        ref={this.userNameRef}
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="userName"
                        value={this.state.userName}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["userName"]
                          ? this.state.error["userName"]
                          : ""}
                      </p>
                      <small class="form-text text-muted">
                        Please enter valid ID again. (Cannot use the same 4
                        letters continuously and some words, and ‘-’, ‘_’.)
                      </small>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Password</label>
                    <div class="col-md-9 form-right">
                      <input
                        type="text"
                        class="form-control"
                        value=""
                        type="password"
                        class="form-control"
                        ref={this.passwordRef}
                        id="exampleInputPassword1"
                        name="password"
                        value={this.state.password}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["password"]
                          ? this.state.error["password"]
                          : ""}
                      </p>

                      <small class="form-text text-muted">
                        6~16 characters with letters(a-z), numbers, and special
                        letters.
                      </small>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">
                      Confirm Password
                    </label>
                    <div class="col-md-9 form-right">
                      <input
                        type="password"
                        class="form-control"
                        ref={this.confirmPasswordRef}
                        id="exampleInputPassword2"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["confirmPassword"]
                          ? this.state.error["confirmPassword"]
                          : ""}
                      </p>
                      <small class="form-text text-muted">
                        Please enter your password again.
                      </small>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Name</label>
                    <div class="col-md-9 form-right">
                      <input
                        type="text"
                        class="form-control"
                        class="form-control"
                        ref={this.nameRef}
                        id="nameInput"
                        name="name"
                        value={this.state.name}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["name"]
                          ? this.state.error["name"]
                          : ""}
                      </p>

                      <small class="form-text text-muted">
                        Please enter English characters only.
                      </small>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Email</label>
                    <div class="col-md-9 form-right">
                      <input
                        type="text"
                        class="form-control"
                        value=""
                        type="email"
                        ref={this.emailRef}
                        class="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        name="email"
                        value={this.state.email}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["email"]
                          ? this.state.error["email"]
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Mobile</label>
                    <div class="col-md-9 form-right">
                      <input
                        class="form-control"
                        type="text"
                        ref={this.mobileRef}
                        id="exampleInputPassword2"
                        // placeholder="enter password"
                        name="mobile"
                        pattern="[0-9]"
                        maxLength="10"
                        value={this.state.mobile}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["mobile"]
                          ? this.state.error["mobile"]
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Country</label>
                    <div class="col-md-9 form-right">
                      <select class="form-control" value={this.state.countryId} onChange={this.onChangeCountry}>
                        <option value={null} selected>
                          Select Country
                        </option>
                        {this.state.countryList && this.state.countryList.length ?
                          this.state.countryList.map((countryList) => {
                            return (
                              <option value={countryList.countryId}>{countryList.country}</option>
                            )
                          }) : <option value="">Loading...</option>}

                      </select>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">City</label>
                    <div class="col-md-9 form-right">
                      <input
                        type="text"
                        class="form-control"
                        class="form-control"
                        ref={this.nameRef}
                        id="cityInput"
                        name="city"
                        value={this.state.city}
                        onChange={e => {
                          this.handleOnChange(e);
                        }}
                      />
                      <p style={{ color: "red" }}>
                        {this.state.error["city"]
                          ? this.state.error["city"]
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row no-gutters align-items-center">
                    <label class="col-md-3 bold form-left">Terms of Use</label>
                    <div class="col-md-9 form-right checkboxwrap">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">
                        I agree with <a href="javascript:;">Terms of Use</a>
                      </label>
                    </div>
                  </div>
                  <div class="form-group text-center mt-5 plain">
                    <button
                      type="button"
                      class="btn btn-primary btn-lg"
                      onClick={() => this.submit()}
                      disabled={this.state.isdisable ? "disabled" : null}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {this.state.isdisable ? <Spinner color="#FFF" /> : null}
                        Update
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      // <div className="custom">
      //   <div className="container">
      //     <div className="row justify-content-center">
      //       <div className="col-10 col-sm-7 col-lg-5 login-bg-white login-sec">
      //         <h2 className="text-center" style={{ color: "#555" }}>
      //           ACCOUNT REGISTRATION
      //         </h2>
      //         <div class="form-group">
      //           <label for="exampleInputEmail1" style={{ color: "#555" }}>
      //             Username
      //           </label>
      //           <input
      //             type="email"
      //             ref={this.userNameRef}
      //             class="form-control"
      //             id="exampleInputEmail1"
      //             aria-describedby="emailHelp"
      //             // placeholder="enter username"
      //             name="userName"
      //             value={this.state.userName}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["userName"]
      //               ? this.state.error["userName"]
      //               : ""}
      //           </p>
      //         </div>

      //         <div class="form-group">
      //           <label for="exampleInputEmail2" style={{ color: "#555" }}>
      //             Email
      //           </label>
      //           <input
      //             type="email"
      //             ref={this.emailRef}
      //             class="form-control"
      //             id="exampleInputEmail2"
      //             aria-describedby="emailHelp"
      //             // placeholder="enter username"
      //             name="email"
      //             value={this.state.email}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["email"] ? this.state.error["email"] : ""}
      //           </p>
      //         </div>

      //         <div class="form-group">
      //           <label for="exampleInputPassword1" style={{ color: "#555" }}>
      //             Password
      //           </label>
      //           <input
      //             type="password"
      //             class="form-control"
      //             ref={this.passwordRef}
      //             id="exampleInputPassword1"
      //             // placeholder="enter password"
      //             name="password"
      //             value={this.state.password}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["password"]
      //               ? this.state.error["password"]
      //               : ""}
      //           </p>
      //         </div>

      //         <div class="form-group">
      //           <label for="exampleInputPassword1" style={{ color: "#555" }}>
      //             Confirm Password
      //           </label>
      //           <input
      //             type="password"
      //             class="form-control"
      //             ref={this.confirmPasswordRef}
      //             id="exampleInputPassword2"
      //             // placeholder="enter password"
      //             name="confirmPassword"
      //             value={this.state.confirmPassword}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["confirmPassword"]
      //               ? this.state.error["confirmPassword"]
      //               : ""}
      //           </p>
      //         </div>

      //         <div class="form-group">
      //           <label for="exampleInputPassword1" style={{ color: "#555" }}>
      //             Full Name
      //           </label>
      //           <input
      //             type="text"
      //             class="form-control"
      //             ref={this.nameRef}
      //             id="nameInput"
      //             // placeholder="enter password"
      //             name="name"
      //             value={this.state.name}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["name"] ? this.state.error["name"] : ""}
      //           </p>
      //         </div>

      //         <div class="form-group">
      //           <label for="exampleInputPassword1" style={{ color: "#555" }}>
      //             Mobile
      //           </label>
      //           <input
      //             type="text"
      //             class="form-control"
      //             ref={this.mobileRef}
      //             id="exampleInputPassword2"
      //             // placeholder="enter password"
      //             name="mobile"
      //             pattern="[0-9]"
      //             maxLength="10"
      //             value={this.state.mobile}
      //             onChange={e => {
      //               this.handleOnChange(e);
      //             }}
      //           />
      //           <p style={{ color: "red" }}>
      //             {this.state.error["mobile"] ? this.state.error["mobile"] : ""}
      //           </p>
      //         </div>

      //         <div className="text-center">
      //           <button
      //             onClick={() => this.submit()}
      //             className="btn btn-primary mt-5 text-center login100-form-btn"
      //             disabled={this.state.isdisable ? "disabled" : null}
      //           >
      //             <div
      //               style={{
      //                 display: "flex",
      //                 alignItems: "center",
      //                 justifyContent: "center"
      //               }}
      //             >
      //               {this.state.isdisable ? <Spinner color="#FFF" /> : null}
      //               Register
      //             </div>
      //           </button>
      //         </div>
      //         <div className="text-center mt-3 mb-3">
      //           <Link to={PATH.INDEX}>Back to signin</Link>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

myAccount.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (username, password, callback) => {
      dispatch(logInUser(username, password, callback));
    },
    registration: (inputObject, callback) => {
      dispatch(userRegistration(inputObject, callback));
    },
    getVehicleMasterData: (params, callback) => {
      dispatch(getVehicleMasterData(params, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default connect(null, mapDispatchToProps)(myAccount);
