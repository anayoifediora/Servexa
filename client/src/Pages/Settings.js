import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_PASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import UpdateUserForm from '../Components/UpdateUserForm';

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

  const userStatusStyles = {
    'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
    'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
    Approved: { bg: '#DCFCE7', text: '#166534' },
  };
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
          <h3
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              marginLeft: '2rem',
            }}
          >
            My Profile
          </h3>
          <div className="row">
            {updateLoading ? (
              <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
            ) : (
              <div className="d-flex align-items-center mb-3">
                <i
                  className="bi bi-person-circle p-2"
                  style={{ fontSize: '3rem', color: 'var(--font-color)' }}
                ></i>
                <div>
                  <p className="fw-bold fs-4" style={{ color: 'var(--font-color)' }}>
                    {singleUser?.fullName}
                  </p>
                </div>
              </div>
            )}
            <div className="col-12 col-md-4 col-lg-3">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                First Name
              </label>
              <p className="text-dark">{singleUser?.firstName}</p>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Last Name
              </label>
              <p className="text-dark">{singleUser?.lastName}</p>
            </div>
            <div className="col-12 col-md-12 col-lg-5 col-xl-3">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Email Address
              </label>
              <p className="text-dark">{singleUser?.email}</p>
            </div>
            <div className="col-12 col-md-12 col-xl-3">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Phone Number
              </label>
              <p className="text-dark">{singleUser?.phone}</p>
            </div>
            <p className="fw-bold">Address</p>
            <div className="col-6 col-lg-2">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Street
              </label>
              <p className="text-dark">{singleUser?.address?.street}</p>
            </div>
            <div className="col-6 col-lg-2">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Suburb
              </label>
              <p className="text-dark">{singleUser?.address?.suburb}</p>
            </div>
            <div className="col-6 col-lg-2">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                State
              </label>
              <p className="text-dark">{singleUser?.address?.state}</p>
            </div>
            <div className="col-6">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Post Code
              </label>
              <p className="text-dark">{singleUser?.address?.postCode}</p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                User Status
              </label>
              <p
                className="status text-dark"
                style={{
                  color: userStatusStyles[singleUser?.status]?.text,
                  backgroundColor: userStatusStyles[singleUser?.status]?.bg,
                }}
              >
                {singleUser?.status}
              </p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Created On:
              </label>
              <p className="text-dark">{singleUser?.createdAt}</p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Updated On:
              </label>
              <p className="text-dark">{singleUser?.updatedAt}</p>
            </div>

            <button
              type="button"
              className="custom-edit-btn col-lg-12 col-xl-2"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Edit
            </button>
          </div>
          <div className="row">
            <h3>Security</h3>
            <div className="d-flex justify-content-between align-items-center">
              <p className="col-lg-4 d-none d-lg-block">Change Password</p>
              <button
                className="col-11 col-lg-4 col-xl-3"
                data-bs-toggle="modal"
                data-bs-target="#updatePassword"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        {/* Update Password Modal */}
        {(error || updateError) && <Alerts message={error?.message} />}
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
      <UpdateUserForm singleUser={singleUser} />
    </div>
  );
};

export default Settings;
