import React, { Component } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import { logInUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import Login from './login';
import { showNotification } from "../../actions/NotificationAction";

class loginContainer extends Component {
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
      this.setState({ isdisable: false });
      if (!result) {
        this.props.showNotification("username or password wrong", "error");
      } else {
        let redirectPage = store.get("redirectPage");
        if (redirectPage) {
          this.props.history.push(redirectPage);
        } else {
          this.props.history.push(PATH.DASHBOARD);
        }
      }
    });
  };

  render() {
    return (
      <section class="register-wrap spacerTop">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="sidelinks">
                <div class="slhead text-center medium head3">Sign In</div>
                <ul class="sllinks medium">
                  <li>
                    <Link to={PATH.REGISTRATION}>
                      Register ID{" "}
                      <span>
                        <i class="fas fa-chevron-right"></i>
                      </span>
                    </Link>
                  </li>
                  <li class="active">
                    <Link to={PATH.SIGIN}>
                      Sign In{" "}
                      <span>
                        <i class="fas fa-chevron-right"></i>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={PATH.REGISTRATION}>
                      ID Search
                      <span>
                        <i class="fas fa-chevron-right"></i>
                      </span>
                      </Link>
                  </li>
                  <li>
                    <Link to={PATH.REGISTRATION}>
                      Password Search
                      <span>
                        <i class="fas fa-chevron-right"></i>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-9 form-wrap">
              <Login needRedirection={true} {...this.props}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

loginContainer.propTypes = {};

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

export default AppWrapper(loginContainer, null, mapDispatchToProps);
