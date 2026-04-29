import React, { useState } from 'react';

const Alerts = (props) => {
  // eslint-disable-next-line react/prop-types
  const { message } = props;
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div
          // eslint-disable-next-line react/prop-types
          className={`custom-alert alert ${message.includes('Success') ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          <i
            className={`bi bi-exclamation-circle-fill fs-1 ${message.includes('Success') ? 'text-success' : 'text-danger '}`}
          ></i>
          <p className="fs-5">{message}</p>
          <button
            onClick={() => setVisible(false)}
            type="button"
            className="w-25 mt-5"
            aria-label="Close"
          >
            Ok
          </button>
        </div>
      )}
    </>
  );
};

export default Alerts;
