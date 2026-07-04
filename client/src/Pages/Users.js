import React, { useState } from 'react';
import { QUERY_ALL_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../State/currentPageSlice';
import { ROWS_PER_TABLE_PAGE } from '../utils/helpers';

//Components
import ProfileNavbar from '../Components/ProfileNavbar';
import SidebarMenu from '../Components/SidebarMenu';
import Alerts from '../Components/Alerts';
import SearchResults from '../Components/SearchResults';

const Users = () => {
  //Hooks
  const { loading, error, data } = useQuery(QUERY_ALL_USERS);
  const searchTerm = useSelector((state) => state.searchTerm);
  const currentPage = useSelector((state) => state.currentPage);
  const [filterValue, setFilterValue] = useState('');
  const [searchString, setSearchString] = useState('');
  const [resultState, setResultState] = useState(false);
  const [results, setResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [filterAttempted, setFilterAttempted] = useState(false);
  const dispatch = useDispatch();

  //Data
  const allUsers = data?.users || [];
  const totalPages = Math.ceil(allUsers.length / ROWS_PER_TABLE_PAGE);
  const totalFilteredPages = Math.ceil(filterResults.length / ROWS_PER_TABLE_PAGE);

  //Pagination logic to determine which users to show based on the current page number and the number of rows per page
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * ROWS_PER_TABLE_PAGE,
    currentPage * ROWS_PER_TABLE_PAGE
  );
  //Pagination logic to determine which filteredResults to show based on the current page number and the number of rows per page
  const paginatedFilteredUsers = filterResults.slice(
    (currentPage - 1) * ROWS_PER_TABLE_PAGE,
    currentPage * ROWS_PER_TABLE_PAGE
  );
  //Handler that determines which page to show based on the page number clicked in the pagination component
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };
  //Handler responsible for result filter
  const handleFilterSubmission = (e) => {
    e.preventDefault();
    if (!filterValue) {
      return;
    }
    const filteredUsers =
      filterValue === '' ? allUsers : allUsers.filter((user) => user?.status === filterValue);

    setFilterResults(filteredUsers);
    setFilterAttempted(true);
    dispatch(setCurrentPage(1));
  };
  const handleSearch = (e) => {
    e.preventDefault();

    const userResults = allUsers.filter(
      (user) =>
        user.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchString.toLowerCase())
    );

    setResults(userResults);
    setResultState(true);
    setSearchString('');
  };

  const handleCloseFilter = () => {
    setFilterResults([]);
    setFilterAttempted(false);
    setFilterValue('');
  };

  const userStatusStyles = {
    'Pending Approval': { bg: '#FEF3C7', text: '#92400E' },
    'De-listed': { bg: '#FEE2E2', text: '#991B1B' },
    Approved: { bg: '#DCFCE7', text: '#166534' },
  };

  return (
    <div className="dashboard-page">
      <ProfileNavbar />
      <SidebarMenu />
      <div className="custom-info-area">
        <h1
          className="m-3 ms-5 fw-bold"
          style={{ width: 'fit-content', color: 'var(--primary-color)' }}
        >
          Users
        </h1>
        <div className="d-md-flex align-items-center align-self-center border border-tertiary p-2 rounded">
          <form onSubmit={handleSearch} className=" d-flex m-2" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Users"
              aria-label="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button className="" type="submit">
              Search
            </button>
          </form>
          <form onSubmit={handleFilterSubmission} className="m-2 d-flex align-items-center">
            <label className="me-2 fw-bold">Filter by User Status:</label>
            <select
              className="custom-filter-select me-2"
              aria-label="Filter Users by Status"
              name="status"
              id="user-status"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="De-listed">De-listed</option>
              <option value="Approved">Approved</option>
            </select>
            <button type="submit" disabled={!filterValue}>
              Filter
            </button>
          </form>
        </div>
        {!filterResults.length &&
          (loading ? (
            <i className="loading bi bi-hourglass-top fs-4 text-success">Loading...</i>
          ) : (
            <div className="table-container">
              <table className="custom-users-table">
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>User Status</th>
                    <th>No. of Orders</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr key={user?._id}>
                      <td>{(currentPage - 1) * ROWS_PER_TABLE_PAGE + index + 1}.</td>
                      <td>{user?.firstName}</td>
                      <td>{user?.lastName}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>
                        <p
                          className="status"
                          style={{
                            color: userStatusStyles[user.status]?.text,
                            backgroundColor: userStatusStyles[user.status]?.bg,
                          }}
                        >
                          {user?.status}
                        </p>
                      </td>

                      <td>{user?.noOfOrders}</td>
                      <td>{user?.createdAt.split(',').shift()}</td>
                      <td>
                        <Link
                          className="table-btn btn btn-outline-success"
                          to={`/users/${user?._id}`}
                          style={{ textWrap: 'nowrap' }}
                        >
                          View User
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="custom-pagination-row ">
                    <td colSpan={6}>Pages: {totalPages}</td>
                    <td colSpan={3}>
                      <button
                        className="table-btn me-2 btn btn-outline-secondary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span>
                        {' '}
                        Page {currentPage} of {totalPages}{' '}
                      </span>
                      <button
                        className="table-btn ms-2 btn btn-outline-secondary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        {/* Filtered Results table */}
        {filterResults.length !== 0 && (
          <div className="table-container">
            <table className="custom-users-table">
              <thead>
                <tr>
                  <th colSpan={9}>Users filtered by {filterValue} status</th>
                  <th colSpan={2}>
                    <i
                      onClick={handleCloseFilter}
                      className="custom-close-btn bi bi-x-square fs-3"
                    ></i>
                  </th>
                </tr>
                <tr>
                  <th>S/No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>User Status</th>
                  <th>No. of Orders</th>
                  <th>Date Created</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFilteredUsers.map((user, index) => (
                  <tr key={user?._id}>
                    <td>{(currentPage - 1) * ROWS_PER_TABLE_PAGE + index + 1}.</td>
                    <td>{user?.firstName}</td>
                    <td>{user?.lastName}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>
                      <p
                        className="status"
                        style={{
                          color: userStatusStyles[user.status]?.text,
                          backgroundColor: userStatusStyles[user.status]?.bg,
                        }}
                      >
                        {user?.status}
                      </p>
                    </td>

                    <td>{user?.noOfOrders}</td>
                    <td>{user?.createdAt.split(',').shift()}</td>
                    <td colSpan={2}>
                      <Link
                        className="table-btn btn btn-outline-success"
                        to={`/users/${user?._id}`}
                        style={{ textWrap: 'nowrap' }}
                      >
                        View User
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="custom-pagination-row ">
                  <td colSpan={6}>Pages: {totalFilteredPages}</td>
                  <td colSpan={3}>
                    <button
                      className="table-btn me-2 btn btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      {' '}
                      Page {currentPage} of {totalFilteredPages}{' '}
                    </span>
                    <button
                      className="table-btn ms-2 btn btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalFilteredPages}
                    >
                      Next
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}{' '}
        {filterAttempted && filterResults.length === 0 && (
          <Alerts message={`No user found with status "${filterValue}"`} />
        )}
        {/* Search Results table*/}
        {resultState && (
          <table className="user-search-results">
            <thead>
              <tr>
                <th colSpan={5} className="p-2 fw-bold">
                  Displaying {results.length} {results.length > 1 ? `results` : `result`}
                </th>
                <th colSpan={2}>
                  <i onClick={() => setResultState(false)} className="bi bi-x-square fs-3"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={4}> No results found!</td>
                </tr>
              ) : (
                results.map((user, index) => (
                  <tr key={user?._id}>
                    <td>{user?.firstName}</td>
                    <td>{user?.lastName}</td>
                    <td>{user?.email}</td>

                    <td>
                      <p
                        className="status"
                        style={{
                          color: userStatusStyles[user.status].text,
                          backgroundColor: userStatusStyles[user.status].bg,
                        }}
                      >
                        {user?.status}
                      </p>
                    </td>

                    <td colSpan={2}>
                      <Link
                        className="table-btn btn btn-outline-success"
                        to={`/users/${user?._id}`}
                        style={{ textWrap: 'nowrap' }}
                      >
                        View User
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        {error && <Alerts message={error.message} />}
        {searchTerm && <SearchResults />}
      </div>
    </div>
  );
};

export default Users;
