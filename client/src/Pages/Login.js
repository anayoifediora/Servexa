import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Link } from 'react-router-dom';

import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import Alerts from '../Components/Alerts';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //Apollo mutation to login
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleLoginSubmission = async (e) => {
    e.preventDefault();
    try {
      //Execute the login mutation with the form values.
      const { email, password } = formState;
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      //Save the generated token to local storage
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="custom-login-page d-flex flex-column justify-content-center align-items-center">
      {error && <Alerts message={error.message} />}
      {data ? (
        window.location.assign('/')
      ) : (
        <form className="custom-login-form" onSubmit={handleLoginSubmission}>
          <h4 className="fw-bold">Welcome to Servexa</h4>
          <p>Login with your email address & password</p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="custom-form-input form-control "
              id="email"
              placeholder="email"
              name="email"
              value={formState.email}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="custom-form-input form-control "
              id="password"
              placeholder="*************"
              name="password"
              value={formState.password}
              onChange={handleLoginInputChange}
            />
          </div>
          <div id="emailHelp" className="form-text mb-3 fst-italic">
            Your password will never be shared with anyone.
          </div>
          <button type="submit" className="custom-login-btn">
            Login
          </button>
          <div className="d-flex">
            <Link to="/">
              <p className="mt-3">Back to homepage</p>
            </Link>
            <Link to="/signup">
              <p className="mt-3 ms-3">Sign Up</p>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
