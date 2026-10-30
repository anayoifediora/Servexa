import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Alerts = (props) => {
  const { message, type, setErrorMessage } = props;
  const [visible, setVisible] = useState(true);

  const handleAlertClosure = () => {
    setVisible(false);
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };
  return (
    <>
      {visible && (
        <div
          // eslint-disable-next-line react/prop-types
          className={`custom-alert alert col-8 col-md-6 col-lg-4 ${type === 'success' ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          <i
            className={`bi bi-${type === 'success' ? `check-circle-fill` : `exclamation-circle-fill`} fs-2 ${type === 'success' ? 'text-success' : 'text-danger '}`}
          ></i>
          <p className="fs-6">{message}</p>
          {message?.includes('Authentication') ? (
            <Link to="/login">
              <button className="text-danger mt-4 bg-light">Log in</button>
            </Link>
          ) : (
            <button
              onClick={handleAlertClosure}
              type="button"
              className={`w-25 mt-4 bg-light ${type === 'success' ? 'text-success' : 'text-danger'} border border-dark`}
              aria-label="Close"
            >
              Ok
            </button>
          )}
        </div>
      )}
    </>
  );
};
Alerts.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  setErrorMessage: PropTypes.func,
};
export default Alerts;
