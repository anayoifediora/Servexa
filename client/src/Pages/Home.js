import React from 'react';

//Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
const Home = () => {
  return (
    <div className="custom-home-page row justify-content-center">
      <header>
        <Navbar />
      </header>
      <div className="row container justify-content-center m-3 p-3">
        <section className="custom-hero-section col-xl-5 col-md-10 p-3">
          <p className="custom-smp border rounded-pill fw-bold p-2">
            All in-one service management platform
          </p>
          <h1 className="fw-bold">Streamline Your</h1>
          <h1 className="fw-bold">Service Orders.</h1>
          <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
            Delight Your Clients.
          </h1>
          <p className="w-75 fs-5 text-secondary">
            Servexa helps businesses manage service requests, approve orders, and deliver
            exceptional results - all in one powerful dashboard.
          </p>
          <button>Get Started</button>
        </section>

        <img className="col-xl-6 col-md-10" src="/images/saas.png" alt="Dashboard preview" />
      </div>
      <div className="custom-features-list row col-lg-12">
        <div className="feature-card col-lg-2">
          <i className=" icon bi bi-file-earmark-text" style={{ backgroundColor: '#6f42c1' }}></i>
          <p className=" title fw-bold">Order Management</p>
          <p className="description text-secondary w-75">
            Track and manage all your service requests
          </p>
        </div>
        <div className="feature-card col-lg-2">
          <i className=" icon bi bi-bounding-box" style={{ backgroundColor: '#198754' }}></i>
          <p className=" title fw-bold">Client Portal</p>
          <p className="text-secondary w-75">A seamless experience for your clients</p>
        </div>
        <div className="feature-card col-lg-2">
          <i className=" icon bi bi-shield-check " style={{ backgroundColor: '#0d6efd' }}></i>
          <p className=" title fw-bold">Role-Based Access</p>
          <p className="text-secondary w-75">Secure workflows for admins and clients</p>
        </div>
        <div className="feature-card col-lg-2">
          <i className=" icon bi bi-lightning-charge" style={{ backgroundColor: '#fd7e14' }}></i>
          <p className="title fw-bold">Real-Time Updates</p>
          <p className="text-secondary w-75">Stay informed with instant notifications</p>
        </div>
        <div className="feature-card col-lg-2">
          <i className=" icon bi bi-graph-up-arrow" style={{ backgroundColor: '#d63384' }}></i>
          <p className="title fw-bold">Analytics & Reports</p>
          <p className="text-secondary w-75">Make data driven decisions with ease</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
