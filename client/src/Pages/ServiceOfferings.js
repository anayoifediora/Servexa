import React from 'react';

//Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ServiceOfferings = () => {
  return (
    <div className="row justify-content-center">
      <Navbar />

      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column container m-3 p-3">
          <h4 className="text-center">Our Services</h4>
          <h1 className="heading text-center mb-3 mt-3" style={{ color: 'var(--primary-color)' }}>
            <strong>Strategic</strong> IT Support for Your Business Growth
          </h1>
          <p className="fs-5 text-center col-10 col-lg-7 align-self-center mt-3">
            From immediate IT assistance to comprehensive computer repairs, we handle it all to keep
            your systems smooth, secure and up-to-date
          </p>
        </div>
        <div className="row  mt-5 justify-content-center col-12 col-lg-8">
          <div className="service-card">
            <i className="bi bi-laptop fs-2"></i>
            <p className="fs-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
              Laptop Repair
            </p>
            <p>
              Diagnosis and repair of hardware/software issues in laptops including screen
              replacement, battery replacement, virus removal.
            </p>
          </div>
          <div className="service-card">
            <i className="bi bi-code-slash fs-2"></i>
            <p className="fs-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
              Web Development
            </p>
            <p>
              Custom website design and development for businesses including responsive design and
              CMS integration.
            </p>
          </div>
          <div className="service-card">
            <i className="bi bi-wifi fs-2"></i>
            <p className="fs-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
              Network Configuration
            </p>
            <p>
              Installation and configuration of office networks including routers, switches,
              firewall setup.
            </p>
          </div>
          <div className="service-card">
            <i className="bi bi-diagram-3 fs-2"></i>
            <p className="fs-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
              IT Consultation
            </p>
            <p>
              Professional advice on IT infrastructure, cloud migration, cybersecurity, and digital
              transformation.
            </p>
          </div>
          <div className="service-card">
            <i className="bi bi-phone fs-2"></i>
            <p className="fs-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
              Smartphone Repair
            </p>
            <p>
              Repair services for smartphones including screen replacement, battery replacement, and
              software troubleshooting.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceOfferings;
