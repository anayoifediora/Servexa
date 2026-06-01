//Libraries and frameworks
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client/react';
import { QUERY_RECENT_ORDERS } from '../utils/queries';

import { priceFormatter } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

const AdminDash = () => {
  const { loading, error, data } = useQuery(QUERY_RECENT_ORDERS);
  const recentOrders = data?.recentOrders || [];

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
      <div className="custom-info-area ">
        <div className="d-flex justify-content-between p-2 mb-3">
          <h1
            className="m-2 fw-bold"
            style={{ position: 'relative', left: '80px', color: 'var(--primary-color)' }}
          >
            Dashboard
          </h1>
          <p className="m-2 fs-5 p-2" style={{ position: 'relative', right: '80px' }}>
            May 1 - May 31 2026
          </p>
        </div>
        <div className="d-flex" style={{ padding: '0 2rem 0 2.5rem' }}>
          <div className="custom-info-card">
            <div>
              <p className="text-secondary fs-4">Total Orders</p>
              <p className="fs-1 fw-bold">1,248</p>
              <p>+12.5% from last month</p>
            </div>
            <i className="bi bi-clipboard-check"></i>
          </div>
          <div className="custom-info-card">
            <div>
              <p className="text-secondary fs-4">Pending Orders</p>
              <p className="fs-1 fw-bold">32</p>
              <p>+12.5% from last month</p>
            </div>
            <i className="bi bi-clock"></i>
          </div>
          <div className="custom-info-card">
            <div>
              <p className="text-secondary fs-4">Revenue</p>
              <p className="fs-1 fw-bold">$14,248</p>
              <p>+12.5% from last month</p>
            </div>
            <i className="bi bi-currency-dollar"></i>
          </div>
          <div className="custom-info-card">
            <div>
              <p className="text-secondary fs-4">Active Clients</p>
              <p className="fs-1 fw-bold">8</p>
              <p>+12.5% from last month</p>
            </div>
            <i className="bi bi-people"></i>
          </div>
        </div>
        <section className="row justify-content-around">
          <table className="custom-recent-orders col-md-7 mt-3">
            {/* <div className="d-flex justify-content-between">
              <h4 className="m-3">Recent Orders</h4>
              <Link className="m-3">View all</Link>
            </div> */}

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Service</th>
                <th>Amount (AUD)</th>
                <th>Status</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
              ) : (
                recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>#{order._id.toString().slice(-6).toUpperCase()}</td>
                    <td>{order.client.fullName}</td>
                    <td>{order.service.title}</td>
                    <td>{order.price === null ? 0 : priceFormatter(order.price)}</td>
                    <p
                      className="status"
                      style={{
                        color: statusStyles[order.status].text,
                        backgroundColor: statusStyles[order.status].bg,
                      }}
                    >
                      {order.status}
                    </p>
                    <td>{order.createdAt.split(',').shift()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="activity-feed col-md-3">
            <div>
              <h5 className="p-2">Activity feed</h5>
              <span className="p-2">
                <Link>View All</Link>
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
        {error && <Alerts message={error.message} />}
      </div>
    </div>
  );
};

export default AdminDash;
