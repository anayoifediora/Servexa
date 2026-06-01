import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UPDATE_ORDER_STATUS } from '../utils/mutations';
import { useMutation } from '@apollo/client/react';

//Components
import Alerts from '../Components/Alerts';
const UpdateOrderForm = (props) => {
  const { singleOrder } = props;

  const [formState, setFormState] = useState({
    orderStatus: '',
    orderPrice: '',
    adminNotes: '',
  });
  const [updateOrderStatus, { loading, data, error }] = useMutation(UPDATE_ORDER_STATUS);

  //useEffect is updating the state when "singleOrder" changes
  useEffect(() => {
    if (!singleOrder) return;

    setFormState({
      orderStatus: singleOrder.status,
      orderPrice: singleOrder.price,
      adminNotes: singleOrder.adminNotes,
    });
  }, [singleOrder]);

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
      const data = await updateOrderStatus({
        variables: {
          orderId: singleOrder?._id,
          status: formState.orderStatus || '',
          price: parseFloat(formState.orderPrice),
          adminNotes: formState.adminNotes,
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
          id="updateOrderModal"
          tabIndex="-1"
          aria-labelledby="updateOrderModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateOrderModalLabel">
                  Update Order
                </h1>
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
                    Order Details
                  </h3>
                  <div className="col">
                    <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                      Job Title
                    </p>
                    <p className="text-dark">{singleOrder?.service?.title}</p>
                  </div>
                  <div className="col">
                    <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                      Job Category
                    </p>
                    <p className="text-dark">{singleOrder?.service?.category}</p>
                  </div>
                  <div className="col d-flex flex-column w-25">
                    <label
                      htmlFor="order-status"
                      className="mb-1 ms-2"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Order Status
                    </label>
                    <select
                      name="orderStatus"
                      id="order-status"
                      value={formState.orderStatus}
                      onChange={handleInputChange}
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Payment Pending">Payment Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                      Job Description
                    </p>
                    <p className="text-dark w-50" style={{ textAlign: 'justify' }}>
                      {singleOrder?.description}
                    </p>
                  </div>
                  <div className="d-flex flex-column w-50">
                    <label
                      htmlFor="adminNotes"
                      className="mb-0"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Admin Notes
                    </label>
                    <textarea
                      id="adminNotes"
                      className="text-dark mb-2"
                      name="adminNotes"
                      value={formState.adminNotes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="d-flex flex-column">
                    <label className=" mb-0" style={{ color: 'var(--primary-color)' }}>
                      Price
                    </label>
                    <input
                      className="custom-form-input w-25 mb-2"
                      name="orderPrice"
                      value={formState.orderPrice}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div>
                    <p className="mb-0" style={{ color: 'var(--primary-color)' }}>
                      Date Order Created
                    </p>
                    <p className="text-dark">{singleOrder?.createdAt}</p>
                  </div>
                  <div>
                    <p className="mb-0 " style={{ color: 'var(--primary-color)' }}>
                      Updated At:
                    </p>
                    <p className="text-dark">{singleOrder?.updatedAt}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button data-bs-dismiss="modal">Cancel</button>
                <button onClick={handleFormSubmit}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

UpdateOrderForm.propTypes = {
  singleOrder: PropTypes.shape({
    status: PropTypes.string,
    price: PropTypes.number,
    adminNotes: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    service: PropTypes.object,
    description: PropTypes.string,
    _id: PropTypes.string,
  }),
};
export default UpdateOrderForm;
