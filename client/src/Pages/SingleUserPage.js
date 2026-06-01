import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_USER_STATUS } from '../utils/mutations';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

const SingleUserPage = () => {
  const [fieldValue, setFieldValue] = useState('Pending Approval');

  const { _id } = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: _id },
  });
  const singleUser = data?.user || {};
  const userStatusStyles = {
    'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
    'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
    Approved: { bg: '#DCFCE7', text: '#166534' },
  };

  //Apollo mutation to update user status
  const [updateUserStatus, { loading: updateLoading, data: updateData, error: updateError }] =
    useMutation(UPDATE_USER_STATUS);

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      //Execute the mutation with the field values
      const { updateData } = await updateUserStatus({
        variables: {
          clientId: singleUser?._id,
          status: fieldValue,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      {updateError && <Alerts message={updateError.message} />}
      {updateData && window.location.reload()}
      <div className="custom-info-area">
        <div className="custom-order-info">
          <h3 className="m-3 align-self-center fw-bold" style={{ color: 'var(--primary-color)' }}>
            User Profile
          </h3>
          <div className="row p-3">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-person-circle p-2" style={{ fontSize: '3rem' }}></i>
              <div>
                <p className="fw-bold text-dark fs-3">{singleUser?.fullName}</p>
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
            <div className="">
              <p className="mb-1" style={{ color: 'var(--primary-color)' }}>
                Client Status
              </p>
              <p
                className="status"
                style={{
                  color: userStatusStyles[singleUser?.status]?.text,
                  backgroundColor: userStatusStyles[singleUser?.status]?.bg,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  width: 'fit-content',
                }}
              >
                {singleUser?.status}
              </p>
            </div>
            <div className="row w-75">
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
            </div>

            <div className="">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Created on
              </p>
              <p className="text-dark">{singleUser?.createdAt}</p>
            </div>
            <div className="">
              <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Updated on
              </p>
              <p className="text-dark">{singleUser?.updatedAt}</p>
            </div>
            <button
              className="update-user-status-btn"
              data-bs-toggle="modal"
              data-bs-target="#updateUserStatus"
            >
              Update status
            </button>
          </div>
        </div>
      </div>
      {/* Update User Modal */}
      <div
        className="modal fade"
        id="updateUserStatus"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                User Status
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="m-2" htmlFor="user-status">
                User Status
              </label>
              <select
                name="status"
                id="user-status"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              >
                <option value="Approved">Approved</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="De-listed">De-listed</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" onClick={handleSubmission}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
