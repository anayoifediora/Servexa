import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  const profile = Auth.getProfile();

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <div className="row align-items-center justify-content-between ms-1 p-3 border-bottom bg-white">
      <Link
        to="/"
        className="d-flex align-items-center text-decoration-none"
        style={{ width: 'fit-content' }}
      >
        <img src="/images/Servexalogo.png" style={{ maxWidth: '150px' }} />
        <h1 className="custom-title fw-bold">Servexa</h1>
      </Link>
      <ul className="nav justify-content-center col-md-6">
        <li className="nav-item">
          <a className="nav-link fs-5 fw-bold active" aria-current="page" href="#">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link fs-5 fw-bold" href="#">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link fs-5 fw-bold" href="#">
            How it Works
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link fs-5 fw-bold" href="#">
            About us
          </a>
        </li>
      </ul>

      <div className=" d-flex justify-content-center col-md-3">
        {Auth.loggedIn() ? (
          <div className=" d-flex align-items-center">
            <button onClick={logout} className="m-2">
              Log out
            </button>

            <Link to={profile.data.role === 'admin' ? '/admin' : '/dashboard'}>
              <button className="m-2">View dashboard</button>
            </Link>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{ marginLeft: '50px' }}
              >
                {profile.data.username.toUpperCase().slice(0, 2)}
              </button>
              <div className="dropdown-menu">
                <p className=" fs-5 dropdown-item"></p>
                <p className="text-danger fs-6 dropdown-item">Role: {profile.data.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="m-2">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="m-2">Get Started</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
