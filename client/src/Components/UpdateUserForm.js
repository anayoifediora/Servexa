import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client/react';
import { UPDATE_USER } from '../utils/mutations';

//Components
import Alerts from '../Components/Alerts';

const UpdateUserForm = ({ singleUser }) => {
  const { firstName, lastName, email, phone, address, _id } = singleUser;
  const [successMessage, setSuccessMessage] = useState('');
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suburb: '',
      state: '',
      postCode: '',
    },
  });

  useEffect(() => {
    if (!singleUser) return;
    setFormState({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: {
        street: address?.street,
        suburb: address?.suburb,
        state: address?.state,
        postCode: address?.postCode,
      },
    });
  }, [singleUser]);

  const [updateUser, { data, error }] = useMutation(UPDATE_USER);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateUser({
        variables: {
          clientId: _id,
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          phone: formState.phone,
          address: formState.address,
        },
      });
      setSuccessMessage('Successful data update!');
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
          street: '',
          suburb: '',
          state: '',
          postCode: '',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {error && <Alerts message={error?.message} />}
      {data && <Alerts message={successMessage} />}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">
                Update Details Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    First Name
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Last Name
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Email Address
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Phone Number
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <h5>Address</h5>
              <div className="row mb-3">
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Street
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="street"
                    value={formState.address.street}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Suburb
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="suburb"
                    value={formState.address.suburb}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    State
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="state"
                    value={formState.address.state}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="d-flex flex-column col">
                  <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                    Post Code
                  </label>
                  <input
                    className="custom-form-input mb-2"
                    name="postCode"
                    value={formState.address.postCode}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" onClick={handleFormSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserForm;
