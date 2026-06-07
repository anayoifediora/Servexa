import React from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SERVICES } from '../utils/queries';
import { Link } from 'react-router-dom';

import { priceFormatter } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import CreateServiceForm from '../Components/CreateServiceForm';

const Services = () => {
  const { loading, data, error } = useQuery(QUERY_SERVICES);
  const services = data?.services || [];

  const statusStyles = {
    Active: {
      text: '#166534',
      bg: '#DCFCE7',
    },

    Inactive: {
      text: '#991B1B',
      bg: '#FEE2E2',
    },
  };

  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      <div className="custom-info-area">
        <h1
          className="m-3 fw-bold"
          style={{ position: 'relative', left: '80px', color: 'var(--primary-color)' }}
        >
          Services
        </h1>
        <button
          className="bi bi-plus"
          style={{ width: 'fit-content', alignSelf: 'center' }}
          data-bs-toggle="modal"
          data-bs-target="#createService"
        >
          {' '}
          Create Service
        </button>
        {loading ? (
          <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
        ) : (
          <table className="custom-services-table">
            <thead>
              <tr>
                <th>S/No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Default Price</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr className=" " key={index}>
                  <td>{index + 1}.</td>
                  <td>{service.title}</td>
                  <td>{service.category}</td>
                  <td>{priceFormatter(service.defaultPrice)}</td>
                  <p
                    className="status"
                    style={{
                      color: statusStyles[service.status].text,
                      backgroundColor: statusStyles[service.status].bg,
                    }}
                  >
                    {service.status}
                  </p>
                  <td>{service.createdAt.split(',').shift()}</td>
                  <td>{service.updatedAt.split(',').shift()}</td>
                  <td>
                    <Link className="btn btn-outline-success" to={`/services/${service._id}`}>
                      View Service
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {error && <Alerts message={error.message} />}
      </div>
      <CreateServiceForm />
    </div>
  );
};

export default Services;
