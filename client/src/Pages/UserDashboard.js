import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { QUERY_SINGLE_USER } from '../utils/queries';
import { priceFormatter, ROWS_PER_TABLE_PAGE } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import CreateOrderForm from '../Components/CreateOrderForm';
import Loading from '../Components/Loading';

import { STATUS_STYLES } from '../utils/helpers';
import { setCurrentPage } from '../State/currentPageSlice';

const UserDashboard = () => {
  const profile = Auth.getProfile();
  console.log(profile);
  const { _id } = profile.data;
  //Hooks
  const [myOrders, setMyOrders] = useState(false);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: _id },
  });

  const userInfo = data?.user || {};
  const ordersPendingPayment = userInfo?.orders
    ?.map((order) => (order?.status === 'Payment Pending' ? order?.price : 0))
    .reduce((acc, val) => acc + val, 0);

  const totalPages = Math.ceil(userInfo?.orders?.length / ROWS_PER_TABLE_PAGE);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };
  const paginatedOrders = userInfo?.orders?.slice(
    (currentPage - 1) * ROWS_PER_TABLE_PAGE,
    currentPage * ROWS_PER_TABLE_PAGE
  );
  return (
    <div className="dashboard-page">
      <ProfileNavbar />

      <SidebarMenu />
      <div className="custom-info-area">
        {myOrders ? (
          <>
            <div className="d-flex mt-4 justify-content-between">
              <h3 className="m-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
                My Orders
              </h3>
              <button className="m-4" onClick={() => setMyOrders(false)}>
                Back to Dashboard
              </button>
            </div>
            {paginatedOrders.length === 0 ? (
              <h4 className="m-2">No orders yet!</h4>
            ) : (
              <div className="table-container">
                <table className="custom-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Amount ($)</th>
                      <th>Status</th>
                      <th>Date Created</th>
                      <th>Date Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order, index) => (
                      <tr key={order._id}>
                        <td>#{order._id.toString().slice(-6).toUpperCase()}</td>
                        <td>{order.service.title}</td>
                        <td>{order.service.category}</td>
                        <td>{order.price === null ? 0 : priceFormatter(order.price)}</td>
                        <td>
                          <p
                            className="status"
                            style={{
                              color: STATUS_STYLES[order.status].text,
                              backgroundColor: STATUS_STYLES[order.status].bg,
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
          </>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <div className="m-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
              <h1 className="fw-bold">Hello {userInfo.firstName}!</h1>
              <div className="">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#createOrder"
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  Create Order
                </button>
                <button
                  onClick={() => setMyOrders(true)}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: '0px' }}
                >
                  View Orders
                </button>
              </div>
            </div>
            {/* Create Order form */}
            <CreateOrderForm userId={userInfo?._id} />

            <div
              className="d-flex row align-self-center"
              style={{ padding: '0 2rem 0 2.5rem', width: '95%' }}
            >
              <div className="tile-card  col-10 col-sm-7 col-md-5 col-xl-5 col-xxl-2">
                <div className="ms-3">
                  <p className="text-secondary fs-4">Total Orders</p>
                  <p className="custom-tile-figures">{userInfo?.noOfOrders}</p>
                </div>
                <i
                  className="bi bi-file-earmark-text"
                  style={{
                    color: STATUS_STYLES['Payment Pending'].text,
                    backgroundColor: STATUS_STYLES['Payment Pending'].bg,
                  }}
                ></i>
              </div>
              <div className="tile-card col-10 col-sm-7 col-md-5 col-xl-5 col-xxl-2">
                <div className="ms-3">
                  <p className="text-secondary  fs-4">Not Completed</p>
                  <p className="custom-tile-figures">
                    {!userInfo?.orders
                      ? 0
                      : userInfo?.orders?.filter((order) => order.status !== 'Completed').length}
                  </p>
                </div>
                <i
                  className="bi bi-clock"
                  style={{
                    color: STATUS_STYLES['In Progress'].text,
                    backgroundColor: STATUS_STYLES['In Progress'].bg,
                  }}
                ></i>
              </div>
              <div className="tile-card col-10 col-sm-7 col-md-5 col-xl-5 col-xxl-2">
                <div className="ms-3">
                  <p className="text-secondary fs-4">Completed</p>
                  <p className="custom-tile-figures">
                    {!userInfo?.orders
                      ? 0
                      : userInfo?.orders?.filter((order) => order.status === 'Completed').length}
                  </p>
                </div>
                <i
                  className="bi bi-check-lg"
                  style={{
                    color: STATUS_STYLES.Completed.text,
                    backgroundColor: STATUS_STYLES.Completed.bg,
                  }}
                ></i>
              </div>
              <div className="tile-card col-10 col-sm-7 col-md-5 col-xl-5 col-xxl-2">
                <div className="ms-3">
                  <p className="text-secondary fs-4">Amount Due</p>
                  <p className="custom-tile-figures">${priceFormatter(ordersPendingPayment)}</p>
                </div>
                <i
                  className="bi bi-coin"
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
              {userInfo?.orders?.length === 0 ? (
                <div>
                  <h3 className="col-12 col-lg-10 col-xl-7 mt-3">No recent orders</h3>
                </div>
              ) : (
                <div className="recent-table-container col-12 col-xxl-10 mt-3">
                  <table className="custom-recent-orders">
                    <thead>
                      <tr>
                        <th colSpan={6} className="bg-light">
                          Current Orders
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
                      {userInfo?.orders?.map((order) => (
                        <tr key={order?._id}>
                          <td>#{order?._id.toString().slice(-6).toUpperCase()}</td>
                          <td className="mb-0">{order?.service?.title}</td>
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
                          <td className="mb-0">
                            {order?.price === null
                              ? 'To be determined'
                              : priceFormatter(order?.price)}
                          </td>
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
              )}
            </section>
            {error && <Alerts message={error.message} />}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
