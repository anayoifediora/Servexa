import React from 'react';

const Login = () => {
  return (
    <div className="custom-login-page d-flex flex-column justify-content-center align-items-center">
      <form className="custom-login-form">
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
          />
        </div>
        <div id="emailHelp" className="form-text mb-3 fst-italic">
          Your password will never be shared with anyone.
        </div>
        <button type="submit" className="custom-login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
