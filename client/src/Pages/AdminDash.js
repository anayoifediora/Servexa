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
          <h1 className="m-2" style={{ position: 'relative', left: '80px' }}>
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
          <div className="recent-orders col-md-7">
            <div className="d-flex justify-content-between">
              <h4 className="m-3">Recent Orders</h4>
              <Link className="m-3">View all</Link>
            </div>

            <div className="custom-table-header">
              <h5>Order ID</h5>
              <h5>Client</h5>
              <h5>Service</h5>
              <h5>Amount</h5>
              <h5>Status</h5>
              <h5>Date Created</h5>
            </div>
            {loading ? (
              <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
            ) : (
              recentOrders.map((order, index) => (
                <div className="custom-table-data" key={index}>
                  <p>#{order._id.toString().slice(-6).toUpperCase()}</p>
                  <p>{order.client.fullName}</p>
                  <p>{order.service.title}</p>
                  <p>${priceFormatter(order.price)}</p>
                  <p
                    className="order-status"
                    style={{
                      color: statusStyles[order.status].text,
                      backgroundColor: statusStyles[order.status].bg,
                      padding: '5px 15px',
                      borderRadius: '20px',
                    }}
                  >
                    {order.status}
                  </p>
                  <p>{order.createdAt.split(',').shift()}</p>
                </div>
              ))
            )}

            <div className="custom-table-data">
              <p>#1258</p>
              <p>Acme Corp</p>
              <p>Web Design</p>
              <p>$1,250</p>
              <p>Pending</p>
              <p>May 31</p>
            </div>
            <div className="custom-table-data">
              <p>#1258</p>
              <p>Acme Corp</p>
              <p>Web Design</p>
              <p>$1,250</p>
              <p>Pending</p>
              <p>May 31</p>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default AdminDash;
