import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./stores";

// import "./assets/css/style.css";
// import "./assets/css/dev.css";
import "./assets/css/bootstrap.min.css";
import "./assets/icons/css/all.min.css";
import "./assets/css/global.css";
import "./assets/css/header.css";
import "./assets/css/search-filter.css";
import "./assets/css/search-showcase.css";
import "./assets/css/everything-know.css";
import "./assets/css/no-one-trading.css";
import "./assets/css/testimonials.css";
import "./assets/css/popular.css";
import "./assets/css/search.css";
import "./assets/css/footer.css";

import "jquery";
import "bootstrap";

import login from "./components/common/login";
import dashboard from "./components/dashboard";
import registration from "./components/common/registration";
import Notification from './components/common/Notification'
import search from './components/search';

ReactDOM.render(
  <Provider store={stores}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={login} />
        <Route exact path="/registration" component={registration} />
        <Route exact path="/dashboard" component={dashboard} />
        <Route exact path="/dashboard/search" component={search} />
        {/* Notification  Message*/}
        <Notification />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
