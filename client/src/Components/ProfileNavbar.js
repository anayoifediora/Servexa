import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchTerm } from '../State/searchTermSlice';

const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const profile = Auth.getProfile();
  const handleSearchInputChange = (e) => {
    dispatch(addSearchTerm(e.target.value));
  };

  return (
    <div className="profile-navbar">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <img
          className="d-none d-sm-block"
          src="/images/Servexalogo.png"
          style={{ maxWidth: '150px' }}
        />
        <h1 className="custom-title d-none d-lg-block">Servexa</h1>
      </Link>

      <div className="custom-search-bar col-lg-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search orders by last name, service or order status..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="dropdown me-4">
        <button className="fs-5 dropdown-toggle" data-bs-toggle="dropdown">
          {profile.data.username.toUpperCase().slice(0, 2)}
        </button>
        <div className="dropdown-menu">
          <p className=" fs-5 dropdown-item"></p>
          <p className="text-danger fs-6 dropdown-item">Role: {profile.data.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
