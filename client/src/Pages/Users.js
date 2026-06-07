import React from 'react';
import { QUERY_ALL_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';

const Users = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_USERS);
  const allUsers = data?.users || [];

  const userStatusStyles = {
    'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
    'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
    Approved: { bg: '#DCFCE7', text: '#166534' },
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
          Users
        </h1>

        <table className="custom-users-table">
          <thead>
            <tr>
              <th>S/No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Status</th>
              <th>No. of Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
            ) : (
              allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{user?.firstName}</td>
                  <td>{user?.lastName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <p
                    className="status"
                    style={{
                      color: userStatusStyles[user.status].text,
                      backgroundColor: userStatusStyles[user.status].bg,
                    }}
                  >
                    {user?.status}
                  </p>

                  <td>{user?.noOfOrders}</td>
                  <Link className="btn btn-outline-success" to={`/users/${user?._id}`}>
                    View User
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

export default Users;
