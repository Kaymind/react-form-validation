import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = ({ alertReducer }) => {
  return {
    alerts: alertReducer
  };
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Alert);
