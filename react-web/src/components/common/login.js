import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { logInUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { showNotification } from "../../actions/NotificationAction";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      error: {
        userName: "",
        password: ""
      },
      token: {},
      isdisable: false
    };
    this.userNameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Auto Harasow | Login";
  }

  handleOnChange = e => {
    let { target } = e;
    let { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleRemoveError();
    });
  };

  handleRemoveError = () => {
    let { userName, password, error } = this.state;
    if (userName) {
      this.userNameRef.current.classList.remove("error");
      error.userName = "";
      this.setState({ error: error });
    }
    if (password) {
      this.passwordRef.current.classList.remove("error");
      error.password = "";
      this.setState({ error: error });
    }
  };

  handleValidate = () => {
    let { userName, password, error } = this.state;
    if (!userName) {
      this.userNameRef.current.focus();
      this.userNameRef.current.classList.add("error");
      error.userName = "Enter user name";
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
    return true;
  };

  submit = () => {
    console.log(this.state.userName, this.state.password);
    let { userName, password } = this.state;
    let submit = this.handleValidate();
    if (submit) {
      this.setState({ isdisable: true });
      this.loginFunctions(userName, password);
    }
  };

  loginFunctions = (userName, password) => {
    this.props.logInUser(userName, password, result => {
      console.log(result);
      console.log(this.props)
      this.setState({ isdisable: false });
      if (!result) {
        this.props.showNotification("username or password wrong", "error");
      } else {
        const { needRedirection } = this.props;
        // let redirectPage = store.get("redirectPage");
        if (needRedirection) {
          this.props.history.push(PATH.DASHBOARD);
        }
        // if (redirectPage) {
        //   this.props.history.push(redirectPage);
        // } else {
        //   this.props.history.push(PATH.DASHBOARD);
        // }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 class="form-header">Sign In</h1>
        <p class="lead">
          Buy and Sell all types of vehicles on autoharasow.com, The smart
          Auto Trader's Network!
              </p>
        <form class="row no-gutters form-rows">
          <div class="col-lg-12">
            <div class="form-group row no-gutters align-items-center">
              <label class="col-md-3 bold form-left">ID</label>
              <div class="col-md-9 form-right">
                <input
                  type="email"
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
              </div>
            </div>
            <div class="form-group row no-gutters align-items-center">
              <label class="col-md-3 bold form-left">Password</label>
              <div class="col-md-9 form-right">
                <input
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
              </div>
            </div>
            <div class="form-group row no-gutters align-items-center">
              <div class="col-md-9 offset-md-3 form-right">
                <div class="row">
                  <div class="col-6">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="remember_checkbox"
                      />
                      <label
                        class="form-check-label"
                        for="remember_checkbox"
                      >
                        Remember Password
                            </label>
                    </div>
                  </div>
                  <div class="col-6">
                    <button type="button" class="btn btn-link btn-sm">
                      Forgot ID?
                          </button>
                    <button type="button" class="btn btn-link btn-sm">
                      Forgot Password
                          </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group text-center mt-5 plain">
              <button
                type="button"
                onClick={() => this.submit()}
                class="btn btn-primary btn-lg mr-2"
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
                  Sign In
                      </div>
              </button>
              <Link to={PATH.REGISTRATION}>
                <button type="button" class="btn btn-secondary btn-lg">
                  Sign Up
                      </button>
              </Link>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

login.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (username, password, callback) => {
      dispatch(logInUser(username, password, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default connect(null, mapDispatchToProps)(login);
