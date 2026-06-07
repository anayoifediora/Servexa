import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { QUERY_SINGLE_SERVICE } from '../utils/queries';
import { priceFormatter } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';

import UpdateServiceForm from '../Components/UpdateServiceForm';

const ViewServicePage = () => {
  const { serviceId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_SERVICE, {
    variables: { serviceId: serviceId },
  });

  const singleService = data?.service || {};
  console.log(singleService);

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
        <h3 className="m-3 align-self-center fw-bold" style={{ color: 'var(--primary-color)' }}>
          Service ID: #{singleService?._id?.toString().slice(-6).toUpperCase()}
        </h3>
        <div className="custom-service-info">
          <div className="row p-3">
            <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
              Service Details
            </h3>
            <div className="col">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Title
              </label>
              <p className="text-dark">{singleService?.title}</p>
            </div>
            <div className="col">
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Category
              </label>
              <p className="text-dark">{singleService?.category}</p>
            </div>
            <div className="col">
              <p className="mb-1 ms-2" style={{ color: 'var(--primary-color)' }}>
                Service Status
              </p>
              <p
                className=""
                style={{
                  color: statusStyles[singleService?.status]?.text,
                  backgroundColor: statusStyles[singleService?.status]?.bg,
                  padding: '5px 15px',
                  borderRadius: '20px',
                  width: 'fit-content',
                  fontWeight: '500',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                {singleService?.status}
              </p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Description
              </label>
              <p className="text-dark w-50">{singleService?.description}</p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Default Price
              </label>
              <p className="text-dark">
                {singleService?.defaultPrice === null
                  ? 0
                  : priceFormatter(singleService?.defaultPrice)}{' '}
                AUD
              </p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Date Created
              </label>
              <p className="text-dark">{singleService?.createdAt}</p>
            </div>
            <div>
              <label className="mb-0" style={{ color: 'var(--primary-color)' }}>
                Date Updated
              </label>
              <p className="text-dark">{singleService?.updatedAt}</p>
            </div>
          </div>
          <button data-bs-toggle="modal" data-bs-target="#updateServiceModal">
            Update Service
          </button>
        </div>
      </div>
      <UpdateServiceForm service={singleService} />
    </div>
  );
};

export default ViewServicePage;
