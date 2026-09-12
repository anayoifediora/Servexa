import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  const profile = Auth.getProfile();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <header className="d-flex align-items-center justify-content-between p-1 border-bottom bg-white w-100">
      <button
        className="col-2 d-md-none fs-6 ms-3"
        onClick={() => setMenuOpen(true)}
        style={{ width: 'fit-content' }}
      >
        Menu
      </button>
      <Link
        to="/"
        className="d-flex align-items-center text-decoration-none col-9"
        style={{ width: 'fit-content' }}
      >
        <img src="/images/Servexalogo.png" style={{ maxWidth: '150px' }} alt="logo" />
        <h1 className="custom-title fw-bold d-none d-lg-block">Servexa</h1>
      </Link>
      <ul className="nav d-none d-md-flex">
        <li className="nav-item ">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''} fw-bold`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/service_offerings"
            className={`nav-link ${location.pathname === '/service_offerings' ? 'active' : ''} fw-bold`}
            aria-current="page"
          >
            Services
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/about_us"
            className={`nav-link ${location.pathname === '/about_us' ? 'active' : ''} fw-bold`}
          >
            About us
          </Link>
        </li>
      </ul>

      <div className="justify-content-center d-none d-md-block me-2">
        {Auth.loggedIn() ? (
          <div className=" d-flex align-items-center me-3">
            <button onClick={logout} className="m-2">
              Log out
            </button>

            <Link to={profile.data.role === 'admin' ? '/admin' : '/dashboard'}>
              <button className="m-2">View dashboard</button>
            </Link>
            <div className="dropdown">
              <button
                className="dropdown-toggle d-none d-md-block m-2"
                data-bs-toggle="dropdown"
                style={{ marginLeft: '40px' }}
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
      {menuOpen && (
        <div className="mobile-menu d-md-none">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-3">Menu</h5>
            <i
              className="m-3 bi bi-x-square fs-4"
              type="button"
              onClick={() => setMenuOpen(false)}
            ></i>
          </div>
          <div>
            <div>
              <ul className="nav d-flex flex-column">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link fw-bold"
                    aria-current="page"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/service_offerings"
                    className="nav-link fw-bold"
                    aria-current="page"
                    onClick={() => setMenuOpen(false)}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about_us"
                    className="nav-link fw-bold"
                    aria-current="page"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>

                <li className="nav-item">
                  {Auth.loggedIn() ? (
                    <>
                      <Link
                        className="nav-link fw-bold"
                        to={profile.data.role === 'admin' ? '/admin' : '/dashboard'}
                        onClick={() => setMenuOpen(false)}
                      >
                        View dashboard
                      </Link>
                      <li className="nav-item" onClick={logout}>
                        <Link className="nav-link fw-bold " aria-current="page">
                          Log out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className="nav-link fw-bold " aria-current="page">
                        Get Started
                      </Link>
                      <Link to="/login" className="nav-link fw-bold" aria-current="page">
                        Login
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
