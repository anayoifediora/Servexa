import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client/react';

import { QUERY_SINGLE_USER } from '../utils/queries';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchTerm } from '../State/searchTermSlice';
import { userStatusStyles } from '../utils/helpers';

const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const profile = Auth.getProfile();
  const { _id } = profile.data;

  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: _id },
  });

  const userInfo = data?.user || {};
  const handleSearchInputChange = (e) => {
    dispatch(addSearchTerm(e.target.value));
  };

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.assign('/');
  };

  return (
    <div className="profile-navbar">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <img
          className="d-none d-sm-block"
          src="/images/Servexalogo.png"
          style={{ maxWidth: '150px' }}
        />
        <h1 className="custom-title d-none d-lg-block">Servexa</h1>
      </Link>

      <div
        className={`custom-search-bar col-lg-3 ${profile.data.role !== 'admin' ? 'd-none' : ' '}`}
      >
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search orders by last name, service or order status..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{ border: '1px, solid, var(--primary-color' }}
          />
          <button className="d-none d-md-block" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="d-flex flex-column me-4">
        <div className="dropdown">
          <button className="fs-6 d-md-none dropdown-toggle" data-bs-toggle="dropdown">
            {profile.data.username.toUpperCase().slice(0, 2)}
          </button>
          <p
            className="mb-0 fs-6 d-none d-md-block dropdown-toggle"
            data-bs-toggle="dropdown"
            style={{ cursor: 'pointer' }}
          >
            {loading ? 'Name loading...' : userInfo.fullName}
          </p>

          <div className="dropdown-menu">
            <p className="text-danger fs-6 dropdown-item m-0">Role: {profile.data.role}</p>
            <Link to="/" className="fs-6 dropdown-item">
              <i className="bi bi-house-fill me-3 fs-5"></i>

              <span>Home</span>
            </Link>
            <Link
              to={profile.data.role === 'admin' ? '/admin' : '/dashboard'}
              className="fs-6 dropdown-item"
            >
              <i className="bi bi-grid-1x2-fill me-3 fs-5"></i>

              <span>Dashboard</span>
            </Link>
            <Link to="/orders" className="fs-6 dropdown-item">
              <i className="bi bi-clipboard-check me-3 fs-5"></i>

              <span>Orders</span>
            </Link>
            {profile?.data?.role === 'admin' && (
              <>
                <Link to="/services" className="fs-6 dropdown-item">
                  <i className="bi bi-boxes me-3 fs-5"></i>

                  <span>Services</span>
                </Link>
                <Link to="/users" className="fs-6 dropdown-item">
                  <i className="bi bi-people-fill me-3 fs-5"></i>

                  <span>Users</span>
                </Link>
              </>
            )}
            <Link to="/settings" className="fs-6 dropdown-item">
              <i className="bi bi-gear-fill me-3 fs-5"></i>

              <span>Settings</span>
            </Link>
            <Link onClick={logout} className="fs-6 dropdown-item">
              <i className="bi bi-box-arrow-left me-3 fs-5"></i>

              <span>Logout</span>
            </Link>
          </div>
        </div>
        <p
          className="status mb-0 d-none d-md-block"
          style={{
            color: userStatusStyles[userInfo?.status]?.text,
            backgroundColor: userStatusStyles[userInfo?.status]?.bg,
            fontSize: '0.7rem',
          }}
        >
          {userInfo?.status}
        </p>
      </div>
    </div>
  );
};

export default ProfileNavbar;
