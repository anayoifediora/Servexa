import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Alerts = ({ message }) => {
  // const { message } = props;
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div
          // eslint-disable-next-line react/prop-types
          className={`custom-alert alert ${message?.includes('Success') ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          <i
            className={`bi bi-exclamation-circle-fill fs-1 ${message?.includes('Success') ? 'text-success' : 'text-danger '}`}
          ></i>
          <p className="">{message}</p>
          {message?.includes('Authentication') ? (
            <Link to="/login">
              <button className="text-danger mt-4 bg-light">Log in</button>
            </Link>
          ) : (
            <button
              onClick={() => setVisible(false)}
              type="button"
              className={`w-25 mt-4 bg-light ${message?.includes('Success') ? 'text-success' : 'text-danger'} border border-dark`}
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
};
export default Alerts;
