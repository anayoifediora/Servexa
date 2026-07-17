import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SINGLE_ORDER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { priceFormatter } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import UpdateOrderForm from '../Components/UpdateOrderForm';
import Alerts from '../Components/Alerts';
import SearchResults from '../Components/SearchResults';

const ViewOrderPage = () => {
  //Get the order id from the URL params
  const { orderId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_ORDER, {
    variables: { orderId: orderId },
  });
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();
  const singleOrder = data?.order || {};
  console.log(singleOrder);

  const userStatusStyles = {
    'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
    'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
    Approved: { bg: '#DCFCE7', text: '#166534' },
  };
  const statusStyles = {
    'Pending Review': { bg: '#FEF3C7', text: '#92400E' },
    'Payment Pending': { bg: '#FFEDD5', text: '#9A3412' },
    Rejected: { bg: '#FEE2E2', text: '#991B1B' },
    'In Progress': { bg: '#DBEAFE', text: '#1E40AF' },
    Completed: { bg: '#DCFCE7', text: '#166534' },
    Closed: { bg: '#F3F4F6', text: '#374151' },
  };
  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      {loading ? (
        <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
      ) : (
        <div className="custom-info-area">
          <h3 className="m-3 align-self-center fw-bold" style={{ color: 'var(--primary-color)' }}>
            Order ID: #{singleOrder?._id?.toString().slice(-6).toUpperCase()}
          </h3>

          <div className="custom-order-info">
            <div className="row p-3 border-bottom">
              <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                Client Details
              </h3>
              <div className="col-6 col-md-4 col-lg-3">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Name
                </p>
                <p className="fw-bold text-dark">{singleOrder?.client?.fullName}</p>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Phone
                </p>
                <p className="fw-bold text-dark">{singleOrder?.client?.phone}</p>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Email Address
                </p>
                <p className="fw-bold text-dark">{singleOrder?.client?.email}</p>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <p className="mb-1 ms-2" style={{ color: 'var(--primary-color)' }}>
                  Client Status
                </p>
                <p
                  className=""
                  style={{
                    color: userStatusStyles[singleOrder?.client?.status]?.text,
                    backgroundColor: userStatusStyles[singleOrder?.client?.status]?.bg,
                    padding: '5px 15px',
                    borderRadius: '20px',
                    width: 'fit-content',
                    fontWeight: '500',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {singleOrder?.client?.status}
                </p>
              </div>
              <div className="row w-lg-75">
                <p>Address</p>
                <div className="col-6 col-lg-4">
                  <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                    Street
                  </p>
                  <p className="fw-bold text-dark">{singleOrder?.client?.address?.street}</p>
                </div>
                <div className="col-6 col-lg-2">
                  <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                    Suburb
                  </p>
                  <p className="fw-bold text-dark">{singleOrder?.client?.address?.suburb}</p>
                </div>
                <div className="col-6 col-lg-2">
                  <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                    State
                  </p>
                  <p className="fw-bold text-dark">{singleOrder?.client?.address?.state}</p>
                </div>
                <div className="col-6 col-lg-2">
                  <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                    Post Code
                  </p>
                  <p className="fw-bold text-dark">{singleOrder?.client?.address?.postCode}</p>
                </div>
              </div>

              <div className="">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Date registered
                </p>
                <p className="fw-bold text-dark">{singleOrder?.client?.createdAt}</p>
              </div>
            </div>
            <div className="row p-3">
              <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                Order Details
              </h3>
              <div className="col-6 col-lg-4">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Job Title
                </p>
                <p className="text-dark">{singleOrder?.service?.title}</p>
              </div>
              <div className="col-6 col-lg-4">
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Job Category
                </p>
                <p className="text-dark">{singleOrder?.service?.category}</p>
              </div>
              <div className="col col-lg-4">
                <p className="mb-1 ms-2" style={{ color: 'var(--primary-color)' }}>
                  Order Status
                </p>
                <p
                  className=""
                  style={{
                    color: statusStyles[singleOrder?.status]?.text,
                    backgroundColor: statusStyles[singleOrder?.status]?.bg,
                    padding: '5px 15px',
                    borderRadius: '20px',
                    width: 'fit-content',
                    fontWeight: '500',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {singleOrder?.status}
                </p>
              </div>
              <div>
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Job Description
                </p>
                <p className="text-dark w-75" style={{ textAlign: 'justify' }}>
                  {singleOrder?.description}
                </p>
              </div>
              <div>
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Admin Notes
                </p>
                <p className="text-dark">{singleOrder?.adminNotes}</p>
              </div>
              <div>
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Price
                </p>
                <p className="text-dark">
                  {singleOrder.price === null ? 0 : priceFormatter(singleOrder?.price)} AUD
                </p>
              </div>
              <div>
                <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Date Order Created
                </p>
                <p className="text-dark">{singleOrder?.createdAt}</p>
              </div>
              <div>
                <p className="mb-0 " style={{ color: 'var(--primary-color)' }}>
                  Updated At:
                </p>
                <p className="text-dark">{singleOrder?.updatedAt}</p>
              </div>
            </div>
            <button className="m-2" data-bs-toggle="modal" data-bs-target="#updateOrderModal">
              Update order
            </button>
          </div>
        </div>
      )}
      {/* Update Order modal */}
      <UpdateOrderForm singleOrder={singleOrder} />
      {error && <Alerts message={error.message} />}
      {searchTerm && <SearchResults />}
    </div>
  );
};

export default ViewOrderPage;
