import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client/react';
import { CREATE_SERVICE } from '../utils/mutations';

//Components
import Alerts from '../Components/Alerts';

const CreateServiceForm = () => {
  const [touched, setTouched] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    defaultPrice: '',
    category: '',
  });

  const [createService, { loading, data, error }] = useMutation(CREATE_SERVICE);
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
      const data = await createService({
        variables: {
          title: formState.title,
          description: formState.description,
          defaultPrice: parseFloat(formState.defaultPrice),
          category: formState.category,
        },
      });
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
          className="modal fade"
          id="createService"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="staticBackdropLabel">
                  Create Service
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
                  <div className="col d-flex flex-column">
                    <label
                      className="mb-1"
                      style={{ color: 'var(--primary-color)' }}
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className={`custom-form-input text-dark ${touched && formState.title === '' ? 'border-danger' : ''}`}
                      name="title"
                      id="title"
                      value={formState.title}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(true)}
                    ></input>
                    {touched && formState.title === '' ? (
                      <div className="form-text text-danger">* Field is compulsory </div>
                    ) : (
                      ' '
                    )}
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
                  <div className="d-flex flex-column">
                    <label
                      className="mt-2"
                      style={{ color: 'var(--primary-color)' }}
                      htmlFor="defaultPrice"
                    >
                      Default Price
                    </label>
                    <input
                      className={`custom-form-input w-25 ${
                        touched && formState.defaultPrice === '' ? 'border-danger' : ''
                      }`}
                      name="defaultPrice"
                      id="defaultPrice"
                      value={formState.defaultPrice}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(true)}
                    ></input>
                    {touched && formState.defaultPrice === '' ? (
                      <div className="form-text text-danger mb-2">* Field is compulsory </div>
                    ) : (
                      ' '
                    )}
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
                    ) : (
                      ' '
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal">Cancel</button>
                <button onClick={handleFormSubmit}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateServiceForm;
