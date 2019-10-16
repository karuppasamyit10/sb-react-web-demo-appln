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
import "./assets/css/bootstrap.min.css";
import "./assets/css/dev.css";
import "./assets/css/header.css";
import "./assets/css/form.css";
import "./assets/css/hamburgers/hamburgers.css";
import "./assets/css/search-filter.css";
import "./assets/css/search-showcase.css";
import "./assets/css/everything-know.css";
import "./assets/css/no-one-trading.css";
import "./assets/css/testimonials.css";
import "./assets/css/popular.css";
import "./assets/css/search.css";
import "./assets/css/footer.css";
import "./assets/css/advanced-search.css";
import "./assets/css/about.css";
import "./assets/css/search-detail.css";
import "./assets/slick/slick.css";
import "./assets/slick/slick-theme.css";

import "jquery";
import "bootstrap";

import 'font-awesome/css/font-awesome.min.css';
import login from "./components/common/login";
import dashboard from "./components/dashboard";
import registration from "./components/common/registration";
import Notification from './components/common/Notification'
import search from './components/search';
import AdvancedSearch from './components/AdvancedSearch';
import whatWeDo from './components/common/whatWeDo';
import fuelConversion from './components/common/fuelConversion';
import carAccessories from './components/common/carAccessories';
import whoWeAre from './components/common/whoWeAre';
import howWeWork from './components/common/howWeWork';
import howToOrder from './components/common/howToOrder';
import howToUseHgs from './components/common/howToUseHgs';
import { cookiePresent } from './utils/AthuService';
import PropTypes from 'prop-types';
import aboutUs from "./components/common/aboutUs";
import specialServices from "./components/common/specialService";
import containerShipping from "./components/common/containerShipping";
import partsExpress from "./components/common/partsExpress";
import searchDetail from "./components/searchDetail";
import partDetail from "./components/partDetail";

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookiePresent() && <Component {...props} />
  )}
  />
);

CustomRoute.propTypes = {
  component: PropTypes.any,
};

ReactDOM.render(
  <Provider store={stores}>
    <Router>
      <React.Fragment>
        <CustomRoute exact path="/signin" component={login} />
        <CustomRoute exact path="/registration" component={registration} />
        <CustomRoute exact path="/" component={dashboard} />
        <CustomRoute exact path="/dashboard/search" component={search} />
        <CustomRoute exact path="/dashboard/advanced-search" component={AdvancedSearch} />
        <CustomRoute exact path="/about-us" component={aboutUs} />
        <CustomRoute exact path="/about-us/what-we-do" component={whatWeDo} />
        <CustomRoute exact path="/about-us/what-we-do/fuel-conversion" component={fuelConversion} />
        <CustomRoute exact path="/about-us/what-we-do/car-accessories" component={carAccessories} />
        <CustomRoute exact path="/about-us/who-we-are" component={whoWeAre} />
        <CustomRoute exact path="/about-us/how-we-work" component={howWeWork} />
        <CustomRoute exact path="/about-us/how-we-work/special-services" component={specialServices} />
        <CustomRoute exact path="/about-us/how-to-order" component={howToOrder} />
        <CustomRoute exact path="/about-us/how-to-order/how-to-use-hgs" component={howToUseHgs} />
        <CustomRoute exact path="/about-us/what-we-do/container-shipping" component={containerShipping} />
        <CustomRoute exact path="/about-us/what-we-do/parts-express" component={partsExpress} />
        <CustomRoute exact path="/search-detail" component={searchDetail} />
        <CustomRoute exact path="/parts-detail" component={partDetail} />
        {/* Notification  Message*/}
        <Notification />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
