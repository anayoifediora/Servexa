//Libraries and packages
import React, { useState } from 'react';
import { CREATE_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

//Components

import Alerts from '../Components/Alerts';
const SignUp = () => {
  const [touched, setTouched] = useState(false);
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

  //Apollo mutation hook to create a new user
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  //Function that handles signup completion.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //Execute the signup mutation with the form values
      const { username, email, password, firstName, lastName, phone, address } = formState;
      const { data } = await createUser({
        variables: {
          username,
          email,
          password,
          firstName,
          lastName,
          phone,
          address: {
            street: address.street,
            suburb: address.suburb,
            state: address.state,
            postCode: address.postCode,
          },
        },
      });
      //Save the generated token to local storage
      Auth.login(data.createUser.token);
    } catch (error) {
      console.log(error);
    }
  };

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
      {data?.createUser ? (
        window.location.assign('/')
      ) : (
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
            <div id="emailHelp" className="form-text mt-1">
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
          <div className="d-flex">
            <Link to="/">
              <p className="mt-3">Back to homepage</p>
            </Link>
            <Link to="/login">
              <p className="mt-3 ms-3">Login</p>
            </Link>
          </div>
        </form>
      )}
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
            {error && <Alerts message={error.message} />}
            {/* {data && <Alerts message="Success: You have now signed up!" />} */}

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
                    className={`custom-form-input form-control ${
                      touched && formState.firstName === '' ? 'border-danger' : ''
                    }`}
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    onBlur={() => setTouched(true)}
                  />
                  {touched && formState.firstName === '' ? (
                    <div className="form-text text-danger">* Field is compulsory </div>
                  ) : (
                    ' '
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="lastName"
                    className={`custom-form-input form-control ${
                      touched && formState.lastName === '' ? 'border-danger' : ''
                    }`}
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />
                  {touched && formState.lastName === '' ? (
                    <div className="form-text text-danger">* Field is compulsory </div>
                  ) : (
                    ' '
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Mobile Phone
                  </label>
                  <input
                    type="phone"
                    className={`custom-form-input form-control ${
                      touched && formState.phone === '' ? 'border-danger' : ''
                    }`}
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                  {touched && formState.phone === '' ? (
                    <div className="form-text text-danger">* Field is compulsory </div>
                  ) : (
                    ' '
                  )}
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
                      className={`custom-form-input form-control ${
                        touched && formState.address.street === '' ? 'border-danger' : ''
                      }`}
                      id="street"
                      name="street"
                      value={formState.address.street}
                      onChange={handleInputChange}
                    />
                    {touched && formState.address.street === '' ? (
                      <div className="form-text text-danger">* Field is compulsory </div>
                    ) : (
                      ' '
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="suburb" className="form-label">
                      Suburb
                    </label>
                    <input
                      type="suburb"
                      className={`custom-form-input form-control ${
                        touched && formState.address.suburb === '' ? 'border-danger' : ''
                      }`}
                      id="suburb"
                      name="suburb"
                      value={formState.address.suburb}
                      onChange={handleInputChange}
                    />
                    {touched && formState.address.suburb === '' ? (
                      <div className="form-text text-danger">* Field is compulsory </div>
                    ) : (
                      ' '
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="state"
                      className={`custom-form-input form-control ${
                        touched && formState.address.state === '' ? 'border-danger' : ''
                      }`}
                      id="state"
                      name="state"
                      value={formState.address.state}
                      onChange={handleInputChange}
                    />
                    {touched && formState.address.state === '' ? (
                      <div className="form-text text-danger">* Field is compulsory </div>
                    ) : (
                      ' '
                    )}
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="postCode" className="form-label">
                      Post Code
                    </label>
                    <input
                      type="postCode"
                      className={`custom-form-input form-control ${
                        touched && formState.address.postCode === '' ? 'border-danger' : ''
                      }`}
                      id="postCode"
                      name="postCode"
                      value={formState.address.postCode}
                      onChange={handleInputChange}
                    />
                    {touched && formState.address.postCode === '' ? (
                      <div className="form-text text-danger">* Compulsory </div>
                    ) : (
                      ' '
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="" onClick={handleFormSubmit}>
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
