import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { CREATE_ORDER } from '../utils/mutations';
import { QUERY_SERVICES } from '../utils/queries';
import { addToActivityFeed } from '../State/activityFeedSlice';
import { useDispatch } from 'react-redux';

import Auth from '../utils/auth';
//Components
import Alerts from '../Components/Alerts';

const CreateOrderForm = ({ userId }) => {
  const [touched, setTouched] = useState(false);
  const [formState, setFormState] = useState({
    service: '',
    description: '',
  });
  const dispatch = useDispatch();

  const [createOrder, { loading, data, error }] = useMutation(CREATE_ORDER);
  const {
    loading: servicesLoading,
    data: servicesData,
    error: servicesError,
  } = useQuery(QUERY_SERVICES);
  const services = servicesData?.services || [];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formState.service || !formState.description.trim()) {
      setTouched(true);
      return;
    }
    try {
      const data = await createOrder({
        variables: {
          client: userId,
          service: formState.service,
          description: formState.description,
        },
      });
      const profile = Auth.getProfile();
      const { username } = profile.data;
      const feedItem = {
        remark: `New order created by ${username}`,
        time: Date.now(),
      };
      dispatch(addToActivityFeed(feedItem));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {error && <Alerts message={error.message} />}
      {data ? (
        window.location.reload()
      ) : (
        <div
          className="modal fade modal-lg"
          id="createOrder"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Create Order
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column">
                  <label
                    className="mb-1"
                    style={{ color: 'var(--primary-color)' }}
                    htmlFor="service"
                  >
                    Choose Service
                  </label>
                  <select
                    className="w-50"
                    value={formState.service}
                    onChange={handleInputChange}
                    name="service"
                    id="service"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option value={service._id} key={service._id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="description"
                    className="mb-1 mt-2"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    Description
                  </label>
                  <textarea
                    className={`text-dark ${
                      touched && formState.description === '' ? 'border-danger' : ''
                    }`}
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    onBlur={() => setTouched(true)}
                  ></textarea>
                  {touched && formState.description === '' ? (
                    <div className="form-text text-danger">* Field is compulsory </div>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" disabled={loading} onClick={handleFormSubmit}>
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button type="button" data-bs-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrderForm;
