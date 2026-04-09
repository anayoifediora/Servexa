import React from 'react';

const Navbar = () => {
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
        <button className="m-2">Login</button>
        <button className="m-2">Get Started</button>
      </div>
    </div>
  );
};

export default Navbar;
