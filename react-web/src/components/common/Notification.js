import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationSystem from "react-notification-system";
import { connect } from "react-redux";

let style = {
  NotificationItem: {
    // Override the notification item
    DefaultStyle: {
      // Applied to every notification, regardless of the notification level
      margin: "10px 5px 2px 1px"
    }
  }
};

class Notification extends Component {
  static propTypes = {
    notification: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }
  showNotify(obj) {
    if (obj.status) {
      this._notificationSystem.addNotification({
        message: obj.message,
        level: obj.type,
        autoDismiss: 3
      });
    }
  }

  render() {
    if (typeof this.props.notification.notificationDetails !== "undefined") {
      this.showNotify(this.props.notification.notificationDetails);
    }
    return (
      <NotificationSystem
        ref="notificationSystem"
        style={style}
        className="demo"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    notification: state.NotificationReducer
  };
};

export default connect(
  mapStateToProps,
  {}
)(Notification);
