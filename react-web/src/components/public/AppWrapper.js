/*************************************************
 * 
 * @exports
 * @class AppWrapper.js
 * @extends Component
 * @author Ramkumar
 * @copyright © 2019. All rights reserved.
 *************************************************/
import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LoadingOverlay from "react-loading-overlay";

export const AppWrapper = (Content, ...propsMapping) => {
  class HOC extends Component {
    /**
     * Creates an instance of HOC.
     * @param {any} props
     * @memberof HOC
     */
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      console.log(this.props)
      return (
        <React.Fragment>
          <div className="">
            <Header {...this.props}/>
              {/* <Sidebar prop={this.props}/> */}
              <Content {...this.props} />
              <Footer />
          </div>
        </React.Fragment>
      );
    }
  }
  return connect(...propsMapping)(HOC);
};
