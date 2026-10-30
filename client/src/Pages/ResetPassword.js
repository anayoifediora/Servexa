import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RESET_PASSWORD } from '../utils/mutations';
import { useMutation } from '@apollo/client/react';
import { jwtDecode } from 'jwt-decode';

//Components
import Alerts from '../Components/Alerts';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const token = searchParams.get('token');
  console.log(errorMessage);
  //Validation of password length
  const passwordLengthCheck = () => {
    if (newPassword.length > 0 && newPassword.length < 8) {
      return 'danger';
    } else if (newPassword.length >= 8) {
      return 'success';
    } else {
      return 'secondary';
    }
  };
  //Uppercase validation
  const upperCaseCheck = (password) => {
    if (password === '') {
      return 'secondary';
    }
    return /[A-Z]/.test(password) === false ? 'danger' : 'success';
  };
  //Digit validation.
  const numberCheck = (password) => {
    if (password === '') {
      return 'secondary';
    }
    return /\d/.test(password) === false ? 'danger' : 'success';
  };
  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setNewPassword(value);
    }
  };

  const handleConfirmPasswordInput = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };
  const handlePasswordVisibility = () => {
    passwordVisibility === false ? setPasswordVisibility(true) : setPasswordVisibility(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (newPassword.length > 0 && newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }
    if (/[A-Z]/.test(newPassword) === false) {
      setErrorMessage('Password must include uppercase letter');
      return;
    }
    if (/\d/.test(newPassword) === false) {
      setErrorMessage('Password must include at least one number');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      setErrorMessage('Invalid or expired token');
      return;
    }
    try {
      const { data } = await resetPassword({
        variables: {
          token: token,
          newPassword: newPassword,
        },
      });
      if (data.resetPassword.success === false) {
        throw new Error(data.resetPassword.message || 'Unable to reset password.');
      }
      setSuccessMessage(data.resetPassword.message);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };
  return (
    <div className="custom-reset-password d-flex flex-column align-items-center justify-content-center">
      {errorMessage && (
        <Alerts message={errorMessage} type="error" setErrorMessage={setErrorMessage} />
      )}
      {successMessage && <Alerts message={successMessage} type="success" />}
      <form className="reset-password-form" onSubmit={handleFormSubmit}>
        <i className="padlock-icon bi bi-lock fs-2 fw-bold align-self-center"></i>
        <h3 className="align-self-center">Set a New Password</h3>
        <p className="text-secondary">
          Your new password must be at least 8 characters and include at least one number and one
          uppercase letter for better security
        </p>
        <label className="fw-bold">New Password</label>
        <div className="d-flex align-items-center text-secondary">
          <input
            className="custom-form-input"
            placeholder="Enter your new password"
            type={passwordVisibility === false ? `password` : ' '}
            name="password"
            value={newPassword}
            onChange={handlePasswordInput}
          />
          <i className="visibility-btn bi bi-eye" onClick={handlePasswordVisibility}></i>
        </div>
        <ul className="password-criteria">
          <li className={`text-${passwordLengthCheck()}`}>At least 8 Characters</li>
          <li className={`text-${upperCaseCheck(newPassword)}`}>Include an uppercase letter</li>
          <li className={`text-${numberCheck(newPassword)}`}>Include a number</li>
        </ul>
        <label className="fw-bold">Confirm New Password</label>
        <div className="d-flex align-items-center text-secondary">
          <input
            className="custom-form-input"
            placeholder="Confirm new password"
            type={passwordVisibility === false ? `password` : ' '}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordInput}
          />
          <i className="visibility-btn bi bi-eye" onClick={handlePasswordVisibility}></i>
        </div>
        <button className="mt-4 w-100 rounded-pill fs-6">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <Link to="/login" className="align-self-center mt-3">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
