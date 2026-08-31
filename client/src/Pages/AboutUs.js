import React, { useState } from 'react';

//Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AboutUs = () => {
  const [description, setDescription] = useState();
  return (
    <div className="row justify-content-center">
      <Navbar />
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-4 fw-bold">About Servexa</h1>
        <h3 className="fst-italic">&quot;Technology Support, without the complexity.&quot;</h3>
        <div className=" m-4 col-lg-5">
          <p className="fs-5">
            Servexa is a service management platform designed to make it easier for businesses to
            request, manage, and track technical services
          </p>
          <p className="fs-5">
            We believe getting technical support shouldn&apos;t involve complicated processes,
            endless emails, or uncertainty about what&apos;s happening with a request. Servexa
            brings everything into one simple platform.
          </p>
        </div>
        <h3 className="fw-bold fs-4">Our Mission</h3>
        <div className="mission col-11 col-lg-5">
          <p>Our mission is simple:</p>
          <p className="fw-bold fs-3 fst-italic">
            To make professional technical services easier to access, manage and understand.
          </p>

          <p>
            From submitting a service request to tracking its progress, Servexa gives clients a
            clear view of their requests while giving service providers the tools they need to
            manage them efficiently.
          </p>
        </div>
        <div className="our-values col-11 col-lg-5">
          <h3 className="fw-bold fs-3">Our Values</h3>
          <div className="value">
            <div className="d-flex justify-content-between">
              <p className="fw-bold fs-4">Simplicity</p>
              {description === 'simplicity' ? (
                <i className="bi bi-dash-square" onClick={() => setDescription('')}></i>
              ) : (
                <i className="bi bi-plus-square" onClick={() => setDescription('simplicity')}></i>
              )}
            </div>

            {description === 'simplicity' && (
              <p className="text-secondary fs-5">
                Technology shouldn&apos;t create more problems than it solves. We keep the
                experience straightforward and easy to understand.
              </p>
            )}
          </div>
          <div className="value">
            <div className="d-flex justify-content-between">
              <p className="fw-bold fs-4">Transparency</p>
              {description === 'transparency' ? (
                <i className="bi bi-dash-square" onClick={() => setDescription('')}></i>
              ) : (
                <i className="bi bi-plus-square" onClick={() => setDescription('transparency')}></i>
              )}
            </div>
            {description === 'transparency' && (
              <p className="text-secondary fs-5">
                Clients should know what&apos;s happening with their requests. Servexa provides
                clear statuses, pricing information, and updates throughout the process.
              </p>
            )}
          </div>
          <div className="value">
            <div className="d-flex justify-content-between">
              <p className="fw-bold fs-4">Reliability</p>
              {description === 'reliability' ? (
                <i className="bi bi-dash-square" onClick={() => setDescription('')}></i>
              ) : (
                <i className="bi bi-plus-square" onClick={() => setDescription('reliability')}></i>
              )}
            </div>
            {description === 'reliability' && (
              <p className="text-secondary fs-5">
                Whether you are requesting technical support or managing multiple service requests,
                Servexa is designed to keep everything organized and accessible.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
