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
    <div className="sidebar-menu">
      <ul>
        <Link className="custom-nav-link" to="/admin">
          <li>
            <i className="bi bi-grid-1x2 me-3 fs-2"></i>Dashboard
          </li>
        </Link>
        <Link className="custom-nav-link" to="/orders">
          <li>
            <i className="bi bi-clipboard-check me-3 fs-2"></i>Orders
          </li>
        </Link>
        <Link className="custom-nav-link" to="/services">
          <li>
            <i className="bi bi-boxes me-3 fs-2"></i>Services
          </li>
        </Link>
        <li>
          <i className="bi bi-people me-3 fs-2"></i>Clients
        </li>
        <Link className="custom-nav-link" to="/users">
          <li>
            <i className="bi bi-people me-3 fs-2"></i>Users
          </li>
        </Link>
      </ul>
      <ul>
        <Link className="custom-nav-link" to="/settings">
          <li>
            <i className="bi bi-gear me-3 fs-2"></i>Settings
          </li>
        </Link>
        <li onClick={logout}>
          <i className="bi bi-box-arrow-left me-3 fs-2"></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
