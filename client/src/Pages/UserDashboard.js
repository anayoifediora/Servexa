import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';

import { QUERY_SINGLE_USER } from '../utils/queries';
import { priceFormatter } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

import { STATUS_STYLES } from '../utils/helpers';

const UserDashboard = () => {
  const profile = Auth.getProfile();
  const { _id } = profile.data;
  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: _id },
  });
  const userInfo = data?.user || {};
  console.log(userInfo);
  const ordersPendingPayment = userInfo?.orders
    ?.map((order) => (order?.status === 'Payment Pending' ? order?.price : 0))
    .reduce((acc, val) => acc + val);
  return (
    <div className="dashboard-page">
      <ProfileNavbar />

      <SidebarMenu />
      <div className="custom-info-area">
        <h1 className="m-3 ms-5 fw-bold">Hello {userInfo.firstName}!</h1>

        <div
          className="d-flex row align-self-center"
          style={{ padding: '0 2rem 0 2.5rem', width: '95%' }}
        >
          <div className="tile-card col-sm-9 col-md-5 col-xl-5 col-xxl-2">
            <div className="ms-3">
              <p className="text-secondary fs-6 fs-4">Total Orders</p>
              <p className="custom-tile-figures">{userInfo?.noOfOrders}</p>
              <p className="text-primary fw-bold fs-5">View All Orders</p>
            </div>
            <i
              className="bi bi-file-earmark-text fs-2"
              style={{
                color: STATUS_STYLES['Payment Pending'].text,
                backgroundColor: STATUS_STYLES['Payment Pending'].bg,
              }}
            ></i>
          </div>
          <div className="tile-card col-sm-9 col-md-5 col-xl-5 col-xxl-2">
            <div className="ms-3">
              <p className="text-secondary fs-6 fs-4">Not Completed</p>
              <p className="custom-tile-figures">
                {userInfo?.orders?.filter((order) => order.status !== 'Completed').length}
              </p>
              <p className="text-primary fw-bold fs-5">View Orders</p>
            </div>
            <i
              className="bi bi-clock fs-2"
              style={{
                color: STATUS_STYLES['In Progress'].text,
                backgroundColor: STATUS_STYLES['In Progress'].bg,
              }}
            ></i>
          </div>
          <div className="tile-card col-sm-9 col-md-5 col-xl-5 col-xxl-2">
            <div className="ms-3">
              <p className="text-secondary fs-6 fs-4">Completed</p>
              <p className="custom-tile-figures">
                {userInfo?.orders?.filter((order) => order.status === 'Completed').length}
              </p>
              <p className="text-primary fw-bold fs-5">View All Orders</p>
            </div>
            <i
              className="bi bi-check-lg fs-2"
              style={{
                color: STATUS_STYLES.Completed.text,
                backgroundColor: STATUS_STYLES.Completed.bg,
              }}
            ></i>
          </div>
          <div className="tile-card col-sm-9 col-md-5 col-xl-5 col-xxl-2">
            <div className="ms-3">
              <p className="text-secondary fs-6 fs-4">Amount Due</p>
              <p className="custom-tile-figures">${priceFormatter(ordersPendingPayment)}</p>
              <p className="text-primary fw-bold fs-5">View Invoices</p>
            </div>
            <i
              className="bi bi-cash-coin fs-2"
              style={{
                color: STATUS_STYLES.Rejected.text,
                backgroundColor: STATUS_STYLES.Rejected.bg,
              }}
            ></i>
          </div>
        </div>
        <section
          className="row align-self-center"
          style={{ padding: '0 2rem 0 2.5rem', width: '90%' }}
        >
          <div className="recent-table-container col-12 col-lg-10 col-xl-7 mt-3">
            <table className="custom-recent-orders">
              <thead>
                <tr>
                  <th colSpan={5} className="bg-light">
                    Current Orders
                  </th>
                  <th colSpan={1} className="bg-light">
                    View All orders
                  </th>
                </tr>
                <tr>
                  <th>Order No.</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Amount (AUD)</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userInfo?.orders?.map((order, index) => (
                  <tr key={order?._id}>
                    <td>#{order?._id.toString().slice(-6).toUpperCase()}</td>
                    <td className="fw-bold mb-0">{order?.service?.title}</td>
                    <td>
                      <p
                        className="status"
                        style={{
                          color: STATUS_STYLES[order?.status].text,
                          backgroundColor: STATUS_STYLES[order?.status].bg,
                        }}
                      >
                        {order?.status}
                      </p>
                    </td>
                    <td className="mb-0">${priceFormatter(order?.price)}</td>
                    <td className="mb-0">{order?.createdAt.split(',').shift()}</td>
                    <td>
                      <Link
                        className=" table-btn btn btn-outline-success"
                        to={`/orders/${order?._id}`}
                      >
                        View Order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="activity-feed col-9 col-lg-5 col-xl-3">
            <div>
              <h5 className="p-2">Activity feed</h5>
              <span className="p-2">
                <p>View All</p>
              </span>
            </div>

            <div className="activity-feed-item">
              <p className="fw-bold mb-0">New order #1257 received</p>
              <p className="text-muted">2 minutes ago</p>
            </div>
            <div className="activity-feed-item">
              <p className="fw-bold mb-0">Order #1257 approved</p>
              <p className="text-muted">1 hour ago</p>
            </div>
          </div>
        </section>

        <div className="row col-10 col-sm-11 col-md-6 align-self-center mt-5 bg-white border rounded p-4">
          <h4>Quick Actions</h4>
          <div className="col-10 col-sm-3  d-flex flex-column align-items-center border border-tertiary rounded p-2 m-3 btn">
            <i className="bi bi-bag fs-1" style={{ color: 'orange' }}></i>
            <p>Create Order</p>
          </div>
          <div className=" col-10  col-sm-3  d-flex flex-column align-items-center border border-tertiary rounded p-2 m-3 btn">
            <i className="bi bi-file-earmark-text fs-1" style={{ color: 'blue' }}></i>
            <p>View My Orders</p>
          </div>
          <div className=" col-10 col-sm-3  d-flex flex-column align-items-center border border-tertiary rounded p-2 m-3 btn">
            <i className="bi bi-person fs-1" style={{ color: 'green' }}></i>
            <p>Update Profile</p>
          </div>
        </div>
        {error && <Alerts message={error.message} />}
      </div>
    </div>
  );
};

export default UserDashboard;
