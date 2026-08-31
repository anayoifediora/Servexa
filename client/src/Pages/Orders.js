import React from 'react';
import { QUERY_ORDERS } from '../utils/queries';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../State/currentPageSlice';

import { priceFormatter, ROWS_PER_TABLE_PAGE } from '../utils/helpers';
//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import SearchResults from '../Components/SearchResults';
import Loading from '../Components/Loading';

const Orders = () => {
  //Hooks
  const searchTerm = useSelector((state) => state.searchTerm);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
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

  const totalPages = Math.ceil(orders.length / ROWS_PER_TABLE_PAGE);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ROWS_PER_TABLE_PAGE,
    currentPage * ROWS_PER_TABLE_PAGE
  );

  console.log('Paginated Orders:', paginatedOrders);
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
        {loading ? (
          <Loading />
        ) : (
          <div className="table-container">
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
                {paginatedOrders.map((order) => (
                  <tr className="" key={order._id}>
                    <td>#{order._id.toString().slice(-6).toUpperCase()}</td>
                    <td>{order.client.fullName}</td>
                    <td>{order.service.title}</td>
                    <td>${order.price === null ? 0 : priceFormatter(order.price)}</td>
                    <td>
                      <p
                        className="status"
                        style={{
                          color: statusStyles[order.status].text,
                          backgroundColor: statusStyles[order.status].bg,
                        }}
                      >
                        {order.status}
                      </p>
                    </td>
                    <td>{order.createdAt.split(',').shift()}</td>
                    <td>{order.updatedAt.split(',').shift()}</td>
                    <td>
                      <Link
                        className=" table-btn btn btn-outline-success"
                        to={`/orders/${order._id}`}
                      >
                        View Order
                      </Link>
                    </td>
                    {/* <button className="btn btn-outline-danger ms-4">Delete</button> */}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="custom-pagination-row">
                  <td colSpan={6}>Pages: {totalPages}</td>

                  <td colSpan={2}>
                    <button
                      className="me-2 btn btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      {' '}
                      Page {currentPage} of {totalPages}{' '}
                    </span>
                    <button
                      className="ms-2 btn btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {error && <Alerts message={error.message} />}
        {searchTerm && <SearchResults />}
      </div>
    </div>
  );
};

export default Orders;
