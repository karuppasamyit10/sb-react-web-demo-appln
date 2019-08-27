import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { logInUser, userRegistration } from "../../actions/userAction";
import { showNotification } from "../../actions/NotificationAction";
import { PATH } from "../../utils/Constants";
import { Link } from "react-router-dom";

class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      mobile: "",
      name: "",
      error: {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobile: "",
        name: ""
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

  componentDidMount() {}

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

  handleRemoveError = () => {
    let {
      userName,
      password,
      error,
      confirmPassword,
      email,
      name,
      mobile
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
  };

  handleValidate = () => {
    let {
      userName,
      password,
      error,
      confirmPassword,
      email,
      name,
      mobile
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
        if(response && response.response_code == 0){
          this.setState({isdisable : false});
          this.props.showNotification('sucessfully registered','success');
          this.props.history.push('/');
        }
      });
    }
  };

  render() {
    return (
      <div className="custom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-7 col-lg-5 login-bg-white login-sec">
              <h2 className="text-center" style={{ color: "#555" }}>
                ACCOUNT REGISTRATION
              </h2>
              <div class="form-group">
                <label for="exampleInputEmail1" style={{ color: "#555" }}>
                  Username
                </label>
                <input
                  type="email"
                  ref={this.userNameRef}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  // placeholder="enter username"
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

              <div class="form-group">
                <label for="exampleInputEmail2" style={{ color: "#555" }}>
                  Email
                </label>
                <input
                  type="email"
                  ref={this.emailRef}
                  class="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  // placeholder="enter username"
                  name="email"
                  value={this.state.email}
                  onChange={e => {
                    this.handleOnChange(e);
                  }}
                />
                <p style={{ color: "red" }}>
                  {this.state.error["email"] ? this.state.error["email"] : ""}
                </p>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" style={{ color: "#555" }}>
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  ref={this.passwordRef}
                  id="exampleInputPassword1"
                  // placeholder="enter password"
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

              <div class="form-group">
                <label for="exampleInputPassword1" style={{ color: "#555" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  ref={this.confirmPasswordRef}
                  id="exampleInputPassword2"
                  // placeholder="enter password"
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
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" style={{ color: "#555" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  ref={this.nameRef}
                  id="nameInput"
                  // placeholder="enter password"
                  name="name"
                  value={this.state.name}
                  onChange={e => {
                    this.handleOnChange(e);
                  }}
                />
                <p style={{ color: "red" }}>
                  {this.state.error["name"] ? this.state.error["name"] : ""}
                </p>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" style={{ color: "#555" }}>
                  Mobile
                </label>
                <input
                  type="text"
                  class="form-control"
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
                  {this.state.error["mobile"] ? this.state.error["mobile"] : ""}
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => this.submit()}
                  className="btn btn-primary mt-5 text-center login100-form-btn"
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
                    Register
                  </div>
                </button>
              </div>
              <div className="text-center mt-3 mb-3">
                <Link to={PATH.INDEX}>Back to signin</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

registration.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (username, password, callback) => {
      dispatch(logInUser(username, password, callback));
    },
    registration: (inputObject, callback) => {
      dispatch(userRegistration(inputObject, callback));
    },
    showNotification: (message, type) => {
      dispatch(showNotification(message, type));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(registration);
