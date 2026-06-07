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
        <img src="/images/Servexalogo.png" style={{ maxWidth: '150px' }} />
        <h1 className="custom-title d-none d-lg-block">Servexa</h1>
      </Link>

      <div className="custom-search-bar col-lg-3">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by client email, service type or order status.."
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <p className="fs-4">{profile.data.email}</p>
        <p className="text-secondary fs-5">{profile.data.role}</p>
      </div>
    </div>
  );
};

export default ProfileNavbar;
