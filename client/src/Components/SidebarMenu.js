import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.assign('/');
  };
  return (
    <div className="sidebar-menu d-none d-md-block">
      <ul>
        <Link className="custom-nav-link" to="/">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-house me-3 fs-3"></i>
            <span>Home</span>
          </li>
        </Link>
        <Link className="custom-nav-link" to="/admin">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-grid-1x2 me-3 fs-3"></i>
            <span>Dashboard</span>
          </li>
        </Link>
        <Link className="custom-nav-link" to="/orders">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-clipboard-check me-3 fs-3"></i>
            <span>Orders</span>
          </li>
        </Link>
        <Link className="custom-nav-link" to="/services">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-boxes me-3 fs-3"></i>
            <span>Services</span>
          </li>
        </Link>
        <Link className="custom-nav-link" to="/users">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-people me-3 fs-3"></i>
            <span>Users</span>
          </li>
        </Link>
      </ul>
      <ul>
        <Link className="custom-nav-link" to="/settings">
          <li className="d-flex flex-column flex-xl-row align-items-xl-center">
            <i className="bi bi-gear me-3 fs-3"></i>
            <span>Settings</span>
          </li>
        </Link>
        <li
          className="custom-nav-link d-flex flex-column flex-xl-row align-items-xl-center"
          onClick={logout}
        >
          <i className=" bi bi-box-arrow-left me-3 fs-3"></i>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
