import React from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SINGLE_ORDER } from '../utils/queries';
import { useParams } from 'react-router-dom';

import { priceFormatter } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';

const ViewOrderPage = () => {
  //Get the order id from the URL params
  const { orderId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_ORDER, {
    variables: { orderId: orderId },
  });
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
      <div className="custom-info-area">
        <h3 className="m-3 align-self-center">Order ID: #{singleOrder._id.toString().slice(-6).toUpperCase()}</h3>

        <div className="custom-order-info">
          <div className="row p-3 border-bottom">
            <h4 className="text-decoration-underline">Client Details</h4>
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Name</p>
              <p className="fw-bold text-dark">{singleOrder?.client?.fullName}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Phone</p>
              <p className="fw-bold text-dark">{singleOrder?.client?.phone}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Email Address</p>
              <p className="fw-bold text-dark">{singleOrder?.client?.email}</p>
            </div>
            <div className="col">
              <p className="mb-1 ms-2" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Client Status</p>
              <p
                className="fw-bold"
                style={{
                  color: userStatusStyles[singleOrder?.client?.status]?.text,
                  backgroundColor: userStatusStyles[singleOrder?.client?.status]?.bg,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  width: 'fit-content',
                }}
              >
                {singleOrder?.client?.status}
              </p>
            </div>
            <div className="row">
              <p>Address</p>
              <div className="col">
                <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Street</p>
                <p className="fw-bold text-dark">{singleOrder?.client?.address?.street}</p>
              </div>
              <div className="col">
                <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Suburb</p>
                <p className="fw-bold text-dark">{singleOrder?.client?.address?.suburb}</p>
              </div>
              <div className="col">
                <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>State</p>
                <p className="fw-bold text-dark">{singleOrder?.client?.address?.state}</p>
              </div>
              <div className="col">
                <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Post Code</p>
                <p className="fw-bold text-dark">{singleOrder?.client?.address?.postCode}</p>
              </div>
            </div>
            
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Date registered</p>
              <p className="fw-bold text-dark">{singleOrder?.client?.createdAt}</p>
            </div>
          </div>
          <div className="row p-3">
            <h4 className="text-decoration-underline">Order Details</h4>
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Job Title</p>
              <p className="fw-bold text-dark">{singleOrder?.service?.title}</p>
            </div>
            <div className="col">
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Job Category</p>
              <p className="fw-bold text-dark">{singleOrder?.service?.category}</p>
            </div>
            <div className="col">
              <p className="mb-1 ms-2" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Order Status</p>
              <p className="fw-bold" style={{
                  color: statusStyles[singleOrder?.status]?.text,
                  backgroundColor: statusStyles[singleOrder?.status]?.bg,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  width: 'fit-content',
                }}>{singleOrder?.status}</p>
            </div>
            <div>
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Job Description</p>
              <p className="fw-bold text-dark">{singleOrder?.description}</p>
            </div>
            <div>
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Admin Notes</p>
              <p className="fw-bold text-dark">{singleOrder?.adminNotes}</p>
            </div>
            <div>
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Price</p>
              <p className="fw-bold text-dark">${priceFormatter(singleOrder?.price)}</p>
            </div>
            <div>
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Date Order Created</p>
              <p className="fw-bold text-dark">{singleOrder?.createdAt}</p>
            </div>
            <div>
              <p className="mb-0" style={{fontSize: "clamp(0.4rem, 2.2vw, 1rem)"}}>Updated At:</p>
              <p className="fw-bold text-dark">{singleOrder?.updatedAt}</p>
            </div>
          </div>
          <button className="w-100 m-2"><i className="bi bi-pencil-fill m-1"></i>Update order</button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderPage;
