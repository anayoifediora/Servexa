import React from 'react';
import { useQuery } from '@apollo/client/react';
import { QUERY_SEARCH_RESULTS } from '../utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearchTerm } from '../State/searchTermSlice';

const SearchResults = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(QUERY_SEARCH_RESULTS, {
    variables: { keyWord: searchTerm },

    skip: !searchTerm || searchTerm.trim().length < 2,
  });

  const results = data?.orderResults || [];

  return (
    <div className="custom-search-result">
      <div className="d-flex align-items-center justify-content-between">
        <p className="fs-5">
          {results.length < 2
            ? `Displaying ${results.length} result...`
            : `Displaying ${results.length} results...`}
        </p>
        <i onClick={() => dispatch(clearSearchTerm())} className="bi bi-x-square-fill fs-2" role="button"></i>
      </div>
      <div>
        {results.length
          ? results.map((result, index) => (
              <div className="row" key={result?._id}>
                <p>{result?.client?.fullName}</p>
                <p>{result?.service?.title}</p>
              </div>
            ))
          : !searchTerm && (
              <div className="no-search-results">
                <h3 className="text-muted ">No orders found matching your search.</h3>
              </div>
            )}
      </div>
    </div>
  );
};

export default SearchResults;
