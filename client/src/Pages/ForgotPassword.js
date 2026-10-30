import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REQUEST_PASSWORD_RESET } from '../utils/mutations';
import { useMutation } from '@apollo/client/react';
//Components
import Alerts from '../Components/Alerts';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [touched, setTouched] = useState(false);

  const regex = /^([a-z0-9_.-]+)@([0-9a-z.-]+)\.([a-z]{2,6})$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailAddress(value);
    }
  };

  const [requestPasswordReset, { data, loading, error }] = useMutation(REQUEST_PASSWORD_RESET);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      //Execute the mutation with the form value
      const { data } = await requestPasswordReset({
        variables: { email: emailAddress },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="custom-forgot-password d-flex flex-column justify-content-center align-items-center">
      <h1 className="fw-bold">Forgot Password?</h1>
      <p>Please provide your email address to set up a new password.</p>
      <p>A link will be sent to your email address to complete the set up.</p>

      <form className="forgot-password-form d-flex flex-column" onSubmit={handleFormSubmission}>
        <label className="m-1" htmlFor="email" type="form-label" style={{ fontSize: '0.9rem' }}>
          Email Address
        </label>
        <input
          className="m-1 p-2 mb-2 rounded border border-secondary"
          placeholder="Insert Email address"
          name="email"
          value={emailAddress}
          onChange={handleInputChange}
          onBlur={() => setTouched(true)}
        />
        {touched && emailAddress === '' ? (
          <p className="text-danger ms-1" style={{ fontSize: '0.8rem' }}>
            Email required
          </p>
        ) : (
          ' '
        )}
        {regex.test(emailAddress) === false && emailAddress !== '' ? (
          <p className="text-danger ms-1" style={{ fontSize: '0.8rem' }}>
            Invalid email
          </p>
        ) : (
          ' '
        )}
        <button className="m-1 fs-6">
          {loading ? `Sending email...` : `Request Password Reset`}
        </button>
      </form>

      <p>
        Remember password? <Link to="/login">Login here</Link>
      </p>

      {error && <Alerts message={error.message} type="error" />}
      {data && <Alerts message={data.requestPasswordReset.message} type="success" />}
    </div>
  );
};

export default ForgotPassword;
