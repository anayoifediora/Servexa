import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client/react';
import { UPDATE_SERVICE } from '../utils/mutations';

//Components
import Alerts from '../Components/Alerts';

const UpdateServiceForm = ({ service }) => {
  const [formState, setFormState] = useState({
    title: '',
    category: '',
    serviceStatus: '',
    description: '',
    defaultPrice: '',
  });
  const [updateService, { data, error }] = useMutation(UPDATE_SERVICE);
  useEffect(() => {
    if (!service) return;

    setFormState({
      title: service.title,
      category: service.category,
      serviceStatus: service.status,
      description: service.description,
      defaultPrice: service.defaultPrice,
    });
  }, [service]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await updateService({
        variables: {
          serviceId: service?._id,
          title: formState.title,
          description: formState.description,
          defaultPrice: parseFloat(formState.defaultPrice),
          category: formState.category,
          status: formState.serviceStatus,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {error && <Alerts message={error.message} />}
      {data ? (
        window.location.reload()
      ) : (
        <div
          className="modal fade"
          id="updateServiceModal"
          tabIndex="-1"
          aria-labelledby="updateServiceModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateServiceModalLabel">
                  Update Service
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row p-3">
                  <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                    Service Details
                  </h3>
                  <div className="col d-flex flex-column">
                    <label className="mb-1" style={{ color: 'var(--primary-color)' }}>
                      Title
                    </label>
                    <input
                      className="custom-form-input text-dark"
                      name="title"
                      value={formState.title}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col d-flex flex-column">
                    <label
                      className="mb-1"
                      style={{ color: 'var(--primary-color)' }}
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formState.category}
                      onChange={handleInputChange}
                    >
                      <option value="Development">Development</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="col d-flex flex-column">
                    <label
                      htmlFor="service-status"
                      className="mb-1"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Order Status
                    </label>
                    <select
                      name="serviceStatus"
                      id="service-status"
                      value={formState.serviceStatus}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="d-flex flex-column w-75">
                    <label
                      htmlFor="description"
                      className="mb-1"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="text-dark mb-2"
                      name="description"
                      value={formState.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="d-flex flex-column">
                    <label
                      className="mb-1"
                      style={{ color: 'var(--primary-color)' }}
                      htmlFor="defaultPrice"
                    >
                      Default Price
                    </label>
                    <input
                      className="custom-form-input w-25 mb-2"
                      name="defaultPrice"
                      value={formState.defaultPrice}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal">Cancel</button>
                <button onClick={handleFormSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateServiceForm;
