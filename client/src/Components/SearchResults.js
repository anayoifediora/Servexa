import React from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SEARCH_RESULTS } from '../utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearchTerm } from '../State/searchTermSlice';
import { Link } from 'react-router-dom';

//Components
import Alerts from './Alerts';

const SearchResults = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const statusStyles = {
    'Pending Review': { bg: '#FEF3C7', text: '#92400E' },
    'Payment Pending': { bg: '#FFEDD5', text: '#9A3412' },
    Rejected: { bg: '#FEE2E2', text: '#991B1B' },
    'In Progress': { bg: '#DBEAFE', text: '#1E40AF' },
    Completed: { bg: '#DCFCE7', text: '#166534' },
    Closed: { bg: '#F3F4F6', text: '#374151' },
  };

  const { loading, data, error } = useQuery(QUERY_SEARCH_RESULTS, {
    variables: { keyWord: searchTerm },
    //Prevents query if there's no search term or the search term is less than 2 characters
    skip: !searchTerm || searchTerm.trim().length < 2,
  });

  const results = data?.orderResults || [];

  return (
    <div className="custom-search-result">
      <div className="d-flex align-items-center justify-content-between">
        <p className="fs-5">
          {results.length < 2
            ? `Displaying ${results.length} order result...`
            : `Displaying ${results.length} order results...`}
        </p>
        <i
          onClick={() => dispatch(clearSearchTerm())}
          className="bi bi-x-square-fill fs-2"
          role="button"
        ></i>
      </div>
      <div>
        {results.length ? (
          results.map((result) => (
            <Link to={`/orders/${result?._id}`} className="custom-result row p-3" key={result?._id}>
              <p className="col">{`Order #${result?._id.toString().slice(-6).toUpperCase()}`}</p>
              <p className="col fw-bold">{result?.client?.fullName}</p>
              <p
                className="col d-none d-md-block"
                style={{
                  color: statusStyles[result?.status].text,
                  backgroundColor: statusStyles[result?.status].bg,
                  maxWidth: 'fit-content',
                  borderRadius: '25px',
                  border: '1px, solid',
                }}
              >
                {result?.status}
              </p>
              <p className="col">{result?.createdAt.split(',').shift()}</p>
            </Link>
          ))
        ) : (
          <div className="no-search-results">
            <h4 className="text-muted ">No orders found matching your search.</h4>
          </div>
        )}
      </div>
      {error && <Alerts message={error.message} />}
    </div>
  );
};

export default SearchResults;
