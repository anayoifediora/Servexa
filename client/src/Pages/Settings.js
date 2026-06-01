import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_PASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

const Settings = () => {
  const profile = Auth.getProfile();
  const { _id } = profile.data;

  const {
    loading: updateLoading,
    data: updateData,
    error: updateError,
  } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: _id },
  });

  const singleUser = updateData?.user || {};
  console.log(singleUser);
  const [formState, setFormState] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [mismatchError, setMismatchError] = useState('');
  const [successMessage, setSuccessMessage] = useState(' ');

  const [updatePassword, { data, error }] = useMutation(UPDATE_PASSWORD);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formState.newPassword !== formState.confirmNewPassword) {
      setMismatchError(
        'Passwords do not match. Please ensure both fields contain the same password.'
      );
      return;
    }
    setMismatchError('');
    try {
      const data = await updatePassword({
        variables: {
          email: formState.email,
          oldPassword: formState.oldPassword,
          newPassword: formState.newPassword,
        },
      });
      setSuccessMessage('Successfully updated password!');
      setFormState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      setMismatchError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      <div className="custom-info-area">
        <div className="custom-profile-info">
          <h3>My Profile</h3>
          <div className="row">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-person-circle p-2" style={{ fontSize: '3rem', color: "var(--font-color)" }}></i>
              <div>
                <p className="fw-bold fs-3" style={{ color: 'var(--font-color)' }}>{singleUser?.fullName}</p>
                <p></p>
              </div>
            </div>
            <div className="col-lg-2">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                First Name
              </p>
              <p className="text-dark">{singleUser?.firstName}</p>
            </div>
            <div className="col-lg-2">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Last Name
              </p>
              <p className="text-dark">{singleUser?.lastName}</p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Email Address
              </p>
              <p className="text-dark">{singleUser?.email}</p>
            </div>
            <div className="col-lg-2">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Phone Number
              </p>
              <p className="text-dark">{singleUser?.phone}</p>
            </div>
            <p>Address</p>
            <div className="col">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Street
              </p>
              <p className="text-dark">{singleUser?.address?.street}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Suburb
              </p>
              <p className="text-dark">{singleUser?.address?.suburb}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                State
              </p>
              <p className="text-dark">{singleUser?.address?.state}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Post Code
              </p>
              <p className="text-dark">{singleUser?.address?.postCode}</p>
            </div>

            <button className="edit-btn">Edit</button>
          </div>
          <div className="row">
            <h3>Security</h3>
            <div className="d-flex justify-content-between">
              <p>Change Password</p>
              <button data-bs-toggle="modal" data-bs-target="#updatePassword">
                Change Password
              </button>
            </div>
          </div>
        </div>
        {/* Update Password Modal */}
        {error && <Alerts message={error.message} />}
        {mismatchError && <Alerts message={mismatchError} />}
        {data && <Alerts message={successMessage} />}

        <div
          className="modal fade"
          id="updatePassword"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update Password
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                  Email
                </label>
                <input
                  className="custom-form-input text-dark mb-3"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                ></input>
                <label
                  htmlFor="oldPassword"
                  className="mb-1"
                  style={{ color: 'var(--primary-color)' }}
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className="custom-form-input text-dark mb-3"
                  id="oldPassword"
                  name="oldPassword"
                  value={formState.oldPassword}
                  onChange={handleInputChange}
                ></input>
                <label
                  htmlFor="newPassword"
                  className="mb-1"
                  style={{ color: 'var(--primary-color)' }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="custom-form-input text-dark mb-3"
                  id="newPassword"
                  name="newPassword"
                  value={formState.newPassword}
                  onChange={handleInputChange}
                ></input>
                <label
                  htmlFor="confirmNewPassword"
                  className="mb-1"
                  style={{ color: 'var(--primary-color)' }}
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="custom-form-input text-dark mb-3"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formState.confirmNewPassword}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal">Cancel</button>
                <button onClick={handleFormSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
