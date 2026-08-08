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
    <div className="d-flex align-items-center justify-content-between ms-1 p-3 border-bottom bg-white w-100">
      <button
        className="col-2 d-md-none"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        ---
      </button>
      <Link
        to="/"
        className="d-flex align-items-center text-decoration-none col-9"
        style={{ width: 'fit-content' }}
      >
        <img src="/images/Servexalogo.png" style={{ maxWidth: '150px' }} />
        <h1 className="custom-title fw-bold d-none d-lg-block">Servexa</h1>
      </Link>
      <ul className="nav d-none d-md-flex">
        <li className="nav-item">
          <a className="nav-link fw-bold active" aria-current="page" href="#">
            Features
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link  fw-bold" href="#">
            How it Works
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold" href="#">
            About us
          </a>
        </li>
      </ul>

      <div className="justify-content-center d-none d-md-block">
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
                className="dropdown-toggle d-none d-xl-block"
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
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <ul className="nav d-flex flex-column">
              <li className="nav-item">
                <a className="nav-link fw-bold active" aria-current="page" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold active" aria-current="page" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold active" aria-current="page" href="#">
                  How it works
                </a>
              </li>

              <li className="nav-item">
                {Auth.loggedIn() ? (
                  <>
                    <Link
                      className="nav-link fw-bold active"
                      to={profile.data.role === 'admin' ? '/admin' : '/dashboard'}
                    >
                      View dashboard
                    </Link>
                    <li className="nav-item" onClick={logout}>
                      <a className="nav-link fw-bold active" aria-current="page" href="#">
                        Log out
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <a className="nav-link fw-bold active" aria-current="page" href="#">
                      Get Started
                    </a>
                    <Link
                      to="/login"
                      className="nav-link fw-bold active"
                      aria-current="page"
                      href="#"
                    >
                      Login
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
