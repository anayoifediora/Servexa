import React from 'react';
import { QUERY_ORDERS } from '../utils/queries';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';

import { priceFormatter } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

const Orders = () => {
  const { loading, error, data } = useQuery(QUERY_ORDERS);
  const orders = data?.orders || [];

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
        <h1
          className="m-3 fw-bold"
          style={{ position: 'relative', left: '80px', color: 'var(--primary-color)' }}
        >
          Orders
        </h1>
        <table className="custom-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Date Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
            ) : (
              orders.map((order, index) => (
                <tr className="" key={index}>
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
                  <td>{order.updatedAt.split(',').shift()}</td>
                  <Link className="btn btn-outline-success" to={`/orders/${order._id}`}>
                    View Order
                  </Link>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {error && <Alerts message={error.message} />}
      </div>
    </div>
  );
};

export default Orders;
