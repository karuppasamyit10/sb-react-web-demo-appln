import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./stores";
import { PATH } from "./utils/Constants";

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

import "font-awesome/css/font-awesome.min.css";
import login from "./components/common/loginContainer";
import dashboard from "./components/dashboard";
import registration from "./components/common/registration";
import Notification from "./components/common/Notification";
import search from "./components/search";
import AdvancedSearch from "./components/AdvancedSearch";
import whatWeDo from "./components/common/whatWeDo";
import fuelConversion from "./components/common/fuelConversion";
import carAccessories from "./components/common/carAccessories";
import whoWeAre from "./components/common/whoWeAre";
import howWeWork from "./components/common/howWeWork";
import howToOrder from "./components/common/howToOrder";
import howToUseHgs from "./components/common/howToUseHgs";
import { cookiePresent, commonDetailsPresent } from "./utils/AthuService";
import PropTypes from "prop-types";
import aboutUs from "./components/common/aboutUs";
import specialServices from "./components/common/specialService";
import containerShipping from "./components/common/containerShipping";
import partsExpress from "./components/common/partsExpress";
import searchDetail from "./components/searchDetail";
import partDetail from "./components/partDetail";
import transport from "./components/common/transport";
import transportSchedule from "./components/common/transportSchedule";
import savedSearch from "./components/common/savedSearch";
import partner from "./components/common/partner";
import partnerCountries from "./components/common/partnerCountries";
import partnerSubDescription from "./components/common/partnerSubDescription";
import partnerContact from "./components/common/partnerContact";
import seller from "./components/common/seller";
import harasowSeller from "./components/common/harasowSeller";
import harasowTransport from "./components/common/harasowTransport";
import community from "./components/common/community";

import payment from "./components/common/payment";
import faq from "./components/common/faq";
import contactStaff from "./components/common/contactStaff";
import magazine from "./components/common/magazine";
import advertise from "./components/common/advertise";
import membershipFee from "./components/common/membershipFee";
import registeredItems from "./components/common/registeredItems";

import productRegistrationForm from './components/common/ProductRegistrationForm';
import ProductList from "./components/common/ProductList";
import ApprovalList from "./components/common/ApprovalList";
import AdminActivity from "./components/common/AdminActivity";


const CustomRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      cookiePresent() && commonDetailsPresent() && <Component {...props} />
    }
  />
);

CustomRoute.propTypes = {
  component: PropTypes.any
};

ReactDOM.render(
  <Provider store={stores}>
    <Router>
      <Suspense fallback={<div className="text-center">Loading .....</div>}>
        <React.Fragment>
          <CustomRoute exact path="/" component={dashboard} />
          <CustomRoute exact path="/signin" component={login} />
          <CustomRoute exact path="/registration" component={registration} />
          <CustomRoute exact path="/product-registration" component={productRegistrationForm} />
          <CustomRoute exact path="/product-list" component={ProductList} />
          <CustomRoute exact path="/admin/activity" component={AdminActivity} />
          <CustomRoute exact path="/product-approval-list" component={ApprovalList} />
          
          <CustomRoute exact path="/dashboard/search" component={search} />
          <CustomRoute
            exact
            path="/dashboard/advanced-search"
            component={AdvancedSearch}
          />
          <CustomRoute exact path="/about-us" component={aboutUs} />
          <CustomRoute exact path="/magazine" component={magazine} />
          <CustomRoute exact path="/about-us/what-we-do" component={whatWeDo} />
          <CustomRoute
            exact
            path="/about-us/what-we-do/fuel-conversion"
            component={fuelConversion}
          />
          <CustomRoute
            exact
            path="/about-us/what-we-do/car-accessories"
            component={carAccessories}
          />
           <CustomRoute
            exact
            path="/membership-fee"
            component={membershipFee}
          />
           <CustomRoute
            exact
            path="/registered-items"
            component={registeredItems}
          />
          <CustomRoute exact path="/about-us/who-we-are" component={whoWeAre} />
          <CustomRoute
            exact
            path="/about-us/how-we-work"
            component={howWeWork}
          />
          <CustomRoute
            exact
            path="/about-us/how-we-work/special-services"
            component={specialServices}
          />
          <CustomRoute
            exact
            path="/about-us/how-to-order"
            component={howToOrder}
          />
          <CustomRoute
            exact
            path="/about-us/how-to-order/how-to-use-hgs"
            component={howToUseHgs}
          />
          <CustomRoute
            exact
            path="/about-us/how-to-order/payment"
            component={payment}
          />
          <CustomRoute
            exact
            path="/about-us/how-to-order/faq"
            component={faq}
          />
          <CustomRoute
            exact
            path="/about-us/how-to-order/contact-staff"
            component={contactStaff}
          />
          <CustomRoute
            exact
            path="/about-us/what-we-do/container-shipping"
            component={containerShipping}
          />
          <CustomRoute
            exact
            path="/about-us/what-we-do/parts-express"
            component={partsExpress}
          />
          <CustomRoute exact path="/search-detail" component={searchDetail} />
          <CustomRoute exact path="/parts-detail" component={partDetail} />
          <CustomRoute exact path="/transport" component={transport} />
          <CustomRoute
            exact
            path="/transport/schedule"
            component={transportSchedule}
          />
          <CustomRoute exact path="/saved/search" component={savedSearch} />
          <CustomRoute exact path="/partner" component={partner} />
          <CustomRoute exact path="/advertise" component={advertise} />
          <CustomRoute
            exact
            path={PATH.PARTNER_CONTACT}
            component={partnerContact}
          />
          <CustomRoute
            exact
            path={PATH.PARTNER_COUNTRY}
            component={partnerCountries}
          />
          <CustomRoute
            exact
            path={PATH.PARTNER_SUB_DESCRIPTION}
            component={partnerSubDescription}
          />
          <CustomRoute exact path="/seller" component={seller} />
          <CustomRoute
            exact
            path="/seller/harasow-seller"
            component={harasowSeller}
          />
          <CustomRoute
            exact
            path="/transport/harasow-transport"
            component={harasowTransport}
          />
          <CustomRoute exact path="/community" component={community} />
          {/* Notification  Message*/}
          <Notification />
        </React.Fragment>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);
