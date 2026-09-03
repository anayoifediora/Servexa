//Libraries and frameworks
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client/react';
import { QUERY_RECENT_ORDERS, DASHBOARD_INDICES } from '../utils/queries';
import { useSelector } from 'react-redux';
//Helper Functions
import { activityTime } from '../utils/helpers';
import { priceFormatter } from '../utils/helpers';
import { STATUS_STYLES, activityFeedIcon } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import SearchResults from '../Components/SearchResults';
import Loading from '../Components/Loading';

const AdminDash = () => {
  const activityFeed = useSelector((state) => state.activityFeed);
  console.log(activityFeed);

  const { loading, error, data } = useQuery(QUERY_RECENT_ORDERS);
  const {
    loading: updateLoading,
    data: updateData,
    error: updateError,
  } = useQuery(DASHBOARD_INDICES);

  const searchTerm = useSelector((state) => state.searchTerm);

  const recentOrders = data?.recentOrders || [];
  const dashboardIndices = updateData?.dashboardIndices || {};
  const {
    activeUsers,
    activeUsersChange,
    pendingOrders,
    pendingOrdersChange,
    revenueChange,
    totalOrders,
    totalOrdersChange,
    totalRevenue,
  } = dashboardIndices;

  const profile = Auth.getProfile().data || {};
  console.log(profile.role);

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toDateString();
  const currentDate = now.toDateString();

  return (
    <div className="dashboard-page">
      <ProfileNavbar />

      <SidebarMenu />
      <div className="custom-info-area ">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center p-2 mb-3">
          <h2 className="m-2 ms-5 fw-bold">Dashboard</h2>

          <p className="dash-period border border-secondary rounded bg-white">
            Period: {`${firstDayOfMonth.slice(4, 10)} -  ${currentDate.slice(4, 15)}`}
          </p>
        </div>
        {updateLoading ? (
          <i className="loading bi bi-hourglass-top fs-5">Loading...</i>
        ) : (
          <div className="d-flex row" style={{ padding: '0 2rem 0 2rem' }}>
            <div className="custom-info-card col-8 col-md-5 col-xl-5 col-xxl-2">
              <div>
                <p className="text-secondary fs-5">Total Orders</p>
                <p className="custom-tile-figures">{totalOrders}</p>
                <p className={`fw-bold ${totalOrdersChange > 0 ? 'text-success' : 'text-danger'}`}>
                  {totalOrdersChange}% <span className="text-dark fw-light">from last month</span>
                </p>
              </div>
              <i className="bi bi-clipboard-check"></i>
            </div>
            <div className="custom-info-card col-8 col-md-5 col-xl-5 col-xxl-2">
              <div>
                <p className="text-secondary fs-5">Pending Orders</p>
                <p className="custom-tile-figures">{pendingOrders}</p>
                <p
                  className={`fw-bold ${pendingOrdersChange > 0 ? 'text-success' : 'text-danger'}`}
                >
                  {pendingOrdersChange}% <span className="text-dark fw-light">from last month</span>
                </p>
              </div>
              <i
                className="bi bi-clock"
                style={{
                  color: STATUS_STYLES.Rejected.text,
                  backgroundColor: STATUS_STYLES.Rejected.bg,
                }}
              ></i>
            </div>
            <div className="custom-info-card col-8 col-md-5 col-xl-5 col-xxl-2">
              <div>
                <p className="text-secondary fs-5">Total Revenue</p>
                <p className="custom-tile-figures">${priceFormatter(totalRevenue)}</p>
                <p className={`fw-bold ${revenueChange > 0 ? 'text-success' : 'text-danger'}`}>
                  {revenueChange}% <span className="text-dark fw-light">from last month</span>
                </p>
              </div>
              <i
                className="bi bi-currency-dollar"
                style={{
                  color: STATUS_STYLES.Completed.text,
                  backgroundColor: STATUS_STYLES.Completed.bg,
                }}
              ></i>
            </div>
            <div className="custom-info-card col-8 col-md-5 col-xl-5 col-xxl-2">
              <div>
                <p className="text-secondary fs-5">Active Clients</p>
                <p className="custom-tile-figures">{activeUsers}</p>
                <p className={`fw-bold ${activeUsersChange > 0 ? 'text-success' : 'text-danger'}`}>
                  {activeUsersChange}% <span className="text-dark fw-light">from inception</span>
                </p>
              </div>
              <i
                className="bi bi-people"
                style={{
                  color: STATUS_STYLES['Pending Review'].text,
                  backgroundColor: STATUS_STYLES['Pending Review'].bg,
                }}
              ></i>
            </div>
          </div>
        )}
        <section className="row justify-content-around p-3">
          <div className="recent-table-container col-12 col-md-11  col-xl-7  mt-3">
            <table className="custom-recent-orders">
              <thead>
                <tr>
                  <th colSpan={5} className="bg-light">
                    Recent Orders
                  </th>
                  <th colSpan={2} className="bg-light">
                    <Link to="/orders">View all</Link>
                  </th>
                </tr>
                <tr>
                  <th>Order ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Amount (AUD)</th>
                  <th>Status</th>
                  <th colSpan={2}>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loading />
                ) : (
                  //Latest 10 orders
                  recentOrders.slice(0, 10).map((order, index) => (
                    <tr key={index}>
                      <td>#{order._id.toString().slice(-6).toUpperCase()}</td>
                      <td>{order.client.fullName}</td>
                      <td>{order.service.title}</td>
                      <td>${order.price === null ? 0 : priceFormatter(order.price)}</td>
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
                      <td colSpan={2}>{order.createdAt.split(',').shift()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="activity-feed col-12 col-md-8  col-xl-4">
            <div>
              <h6
                className="p-2 fw-bold
              "
              >
                Activity Feed
              </h6>
            </div>
            {activityFeed.slice(0, 5).map((feedItem, index) => (
              <div className="activity-feed-item" key={index}>
                <i
                  className={activityFeedIcon(feedItem.remark).icon}
                  style={{
                    color: activityFeedIcon(feedItem.remark).color,
                    backgroundColor: activityFeedIcon(feedItem.remark).bg,
                  }}
                ></i>

                <div className="d-flex flex-column">
                  <p className="fw-bold mb-0">{feedItem.remark}</p>
                  <p className="text-muted">{activityTime(feedItem.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {error && <Alerts message={error.message} />}
        {searchTerm && <SearchResults />}
        {updateError && <Alerts message={updateError.message} />}
      </div>
    </div>
  );
};

export default AdminDash;
