import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

//Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
const Home = () => {
  return (
    <div className="custom-home-page row justify-content-center">
      <Navbar />

      <div className="d-flex flex-column flex-xl-row justify-content-xl-center m-3 p-3">
        <section className="custom-hero-section col-xl-4 p-3">
          <p className="custom-smp rounded-pill fw-bold p-2">
            All in-one service management platform
          </p>
          <h1 className="fw-bold">Streamline Your Service Orders</h1>
          <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
            Delight Your Clients.
          </h1>
          <p className="col-10 col-md-8 col-lg-9 fs-5">
            Servexa helps businesses manage service requests, approve orders, and deliver
            exceptional results - all in one powerful dashboard.
          </p>
          {Auth.loggedIn() ? (
            ' '
          ) : (
            <Link to="/signup">
              <button>Get Started</button>
            </Link>
          )}
        </section>

        <img
          className="dashboard-screenshot col-xl-7 object-fit-contain align-self-xl-center"
          src="/images/Dashboard.png
        "
          alt="Dashboard preview"
        />
      </div>
      <div className="custom-features-list row justify-content-around justify-content-xl-between col-10 col-sm-6  col-xl-11">
        <div className="feature-card col-3 col-lg-2">
          <i className=" icon bi bi-file-earmark-text" style={{ backgroundColor: '#6f42c1' }}></i>
          <p className=" title fw-bold">Order Management</p>
          <p className="description text-secondary w-75">Track and manage all your service requests</p>
        </div>
        <div className="feature-card col-3 col-lg-2">
          <i className=" icon bi bi-bounding-box" style={{ backgroundColor: '#198754' }}></i>
          <p className=" title fw-bold">Client Portal</p>
          <p className="description text-secondary w-75">A seamless experience for your clients</p>
        </div>
        <div className="feature-card col-3 col-lg-2">
          <i className=" icon bi bi-shield-check " style={{ backgroundColor: '#0d6efd' }}></i>
          <p className=" title fw-bold">Role-Based Access</p>
          <p className="description text-secondary w-75">Secure workflows for admins and clients</p>
        </div>
        <div className="feature-card col-3 col-lg-2">
          <i className=" icon bi bi-lightning-charge" style={{ backgroundColor: '#fd7e14' }}></i>
          <p className="title fw-bold">Real-Time Updates</p>
          <p className="description text-secondary w-75">Stay informed with instant notifications</p>
        </div>
        <div className="feature-card col-3 col-lg-2">
          <i className=" icon bi bi-graph-up-arrow" style={{ backgroundColor: '#d63384' }}></i>
          <p className="title fw-bold">Analytics & Reports</p>
          <p className="description text-secondary w-75">Make data driven decisions with ease</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mt-3">
        <p className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          HOW IT WORKS
        </p>
        <h2 className="fw-bold fs-1 text-center">Simple Steps. Powerful Results.</h2>
        <p className="fs-5 text-center">
          From request to completion, Servexa makes the process effortless.
        </p>
        <div className="flowchart">
          <div className="node">
            <p className="step-number" style={{ backgroundColor: '#198754' }}>
              1
            </p>
            <p className="steps">Login or Sign up to create an account</p>
          </div>
          <div className="arrow"></div>
          <div className="node">
            <p className="step-number" style={{ backgroundColor: '#d63384' }}>
              2
            </p>
            <p className="steps">Submit a service request</p>
          </div>
          <div className="arrow"></div>
          <div className="node">
            <p className="step-number" style={{ backgroundColor: '#fd7e14' }}>
              3
            </p>
            <p className="steps">Servexa reviews your request</p>
          </div>
          <div className="arrow"></div>

          <div className="node">
            <p className="step-number" style={{ backgroundColor: '#0d6efd' }}>
              4
            </p>
            <p className="steps">Approve the quoted price</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
