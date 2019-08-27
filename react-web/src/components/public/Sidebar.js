/*************************************************
 *
 * @exports
 * @class Sidebar.js
 * @extends Component
 * @author Ramkumar
 * @copyright © 2019. All rights reserved.
 *************************************************/
import React, { Component } from "react";

class Sidebar extends Component {

  render() {
    return (
      <div class="side-icon" style={{cursor : 'pointer'}} >
        <i class="fa fa-folder-tree" />
      </div>
    );
  }
}

export default Sidebar;
