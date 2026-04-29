import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <div className="row align-items-center m-3 p-3">
      <h2 className="col-md-2 fw-bold">Servexa</h2>
      <ul className="nav justify-content-center col-md-7">
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

      <div className=" d-flex justify-content-center col-md-2">
        {Auth.loggedIn() ? (
          <>
            <button onClick={logout} className="m-2">
              Log out
            </button>
            <Link to="/admin">
              <button className="m-2">View dashboard</button>
            </Link>
          </>
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
