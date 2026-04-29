import React from 'react';
import { QUERY_ORDERS } from '../utils/queries';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';

import { priceFormatter } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';

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
        <div className="custom-orders-table">
          <div className="d-flex justify-content-between">
            <h4 className="m-3">All Orders</h4>
          </div>
          <div className="orders-table-header">
            <h5>Order ID</h5>
            <h5>Client</h5>
            <h5>Service</h5>
            <h5>Amount</h5>
            <h5>Status</h5>
            <h5>Date Created</h5>
            <h5>Date Updated</h5>
            <h5>Actions</h5>
          </div>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            orders.map((order, index) => (
              <div className="orders-table-data" key={index}>
                <p>#{order._id.toString().slice(-6).toUpperCase()}</p>
                <p>{order.client.fullName}</p>
                <p>{order.service.title}</p>
                <p>${priceFormatter(order.price)}</p>
                <p
                  className="order-status"
                  style={{
                    color: statusStyles[order.status].text,
                    backgroundColor: statusStyles[order.status].bg,
                    padding: '5px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {order.status}
                </p>
                <p>{order.createdAt.split(',').shift()}</p>
                <p>{order.updatedAt.split(',').shift()}</p>
                <Link className="mb-3 bg-secondary text-light p-2" to={`/orders/${order._id}`}>View Order</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
