import React from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SERVICES } from '../utils/queries';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../State/currentPageSlice';

import { priceFormatter, ROWS_PER_TABLE_PAGE } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import CreateServiceForm from '../Components/CreateServiceForm';
import SearchResults from '../Components/SearchResults';
import Loading from '../Components/Loading';
const Services = () => {
  //Hooks
  const { loading, data, error } = useQuery(QUERY_SERVICES);
  const searchTerm = useSelector((state) => state.searchTerm);

  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  const services = data?.services || [];

  const noOfPages = Math.ceil(services.length / ROWS_PER_TABLE_PAGE);
  const paginationServices = services.slice(
    (currentPage - 1) * ROWS_PER_TABLE_PAGE,
    currentPage * ROWS_PER_TABLE_PAGE
  );
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

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
          <Loading />
        ) : (
          <div className="table-container">
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
                {paginationServices.map((service) => (
                  <tr className=" " key={service?._id}>
                    <td>{services.indexOf(service) + 1}.</td>
                    <td>{service.title}</td>
                    <td>{service.category}</td>
                    <td>${priceFormatter(service.defaultPrice)}</td>
                    <td>
                      <p
                        className="status"
                        style={{
                          color: statusStyles[service.status].text,
                          backgroundColor: statusStyles[service.status].bg,
                        }}
                      >
                        {service.status}
                      </p>
                    </td>
                    <td>{service.createdAt.split(',').shift()}</td>
                    <td>{service.updatedAt.split(',').shift()}</td>
                    <td>
                      <Link
                        className="table-btn btn btn-outline-success"
                        to={`/services/${service._id}`}
                      >
                        View Service
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="custom-pagination-row">
                  <td colSpan={6}>Pages: {noOfPages}</td>

                  <td colSpan={2}>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="me-3 btn btn-outline-secondary"
                    >
                      Prev
                    </button>
                    <span>
                      Pages: {currentPage} of {noOfPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === noOfPages}
                      className="ms-3 btn btn-outline-secondary"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {error && <Alerts message={error.message} />}
        {searchTerm && <SearchResults />}
      </div>
      <CreateServiceForm />
    </div>
  );
};

export default Services;
