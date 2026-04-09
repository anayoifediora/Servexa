import React, { useState } from 'react';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      suburb: '',
      state: '',
      postCode: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let addressKeys = ['street', 'suburb', 'state', 'postCode'];
    if (addressKeys.includes(name)) {
      setFormState({
        ...formState,
        address: {
          ...formState.address,
          [name]: value,
        },
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  return (
    <div className="custom-signup-page d-flex flex-column justify-content-center align-items-center">
      <form className="custom-signup-form ">
        <h4 className="fw-bold ">Welcome to Servexa</h4>
        <p>Sign up with your username, email and password.</p>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control custom-form-input"
            id="username"
            placeholder="username"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control custom-form-input"
            id="email"
            placeholder="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control custom-form-input"
            id="password"
            placeholder="*************"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <div id="emailHelp" className="form-text">
            Password must contain at least one uppercase letter and one number.
          </div>
        </div>
        <button
          type="button"
          className="custom-signup-btn"
          data-bs-toggle="modal"
          data-bs-target="#signUpModal"
        >
          Register
        </button>
      </form>
      {/*Sign up Modal */}
      <div
        className="modal fade modal-lg"
        id="signUpModal"
        tabIndex="-1"
        aria-labelledby="signUpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalLabel">
                Registration Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="row g-3 p-2">
                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="username"
                    className="custom-form-input form-control "
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="custom-form-input form-control "
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="custom-form-input form-control "
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="firstName"
                    className="custom-form-input form-control "
                    id="firstName"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="lastName"
                    className="custom-form-input form-control "
                    id="lastName"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Mobile Phone
                  </label>
                  <input type="phone" className="custom-form-input form-control " id="phone" />
                </div>
                <div className="row g-3 p-2">
                  <p className="fs-5">
                    <u>Address</u>
                  </p>
                  <div className="col-12">
                    <label htmlFor="street" className="form-label">
                      Street
                    </label>
                    <input
                      type="street"
                      className="custom-form-input form-control "
                      id="street"
                      name="street"
                      value={formState.address.street}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="suburb" className="form-label">
                      Suburb
                    </label>
                    <input
                      type="suburb"
                      className="custom-form-input form-control "
                      id="suburb"
                      name="suburb"
                      value={formState.address.suburb}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="state"
                      className="custom-form-input form-control "
                      id="state"
                      name="state"
                      value={formState.address.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="postCode" className="form-label">
                      Post Code
                    </label>
                    <input
                      type="postCode"
                      className="custom-form-input form-control "
                      id="postCode"
                      name="postCode"
                      value={formState.address.postCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
