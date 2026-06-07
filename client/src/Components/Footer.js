import React from 'react';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container row justify-content-center w-50">
        <a className=" col-lg-2">About</a>
        <a className=" col-lg-2">Contact</a>
        <a className=" col-lg-2">Privacy</a>
        <a className=" col-lg-2">Terms</a>
      </div>
      <div className="mt-3">
        <a href="https://www.instagram.com/kifediora/" target="_blank" rel="noreferrer">
          <i className="custom-footer-icons bi bi-instagram"></i>
        </a>
        <a
          href="https://linkedin.com/in/kanayochi-ifediora-43422b20a"
          target="_blank"
          rel="noreferrer"
        >
          <i className="custom-footer-icons bi bi-linkedin"></i>
        </a>
        <a href="https://www.facebook.com/kanayo.ifediora" target="_blank" rel="noreferrer">
          <i className="custom-footer-icons bi bi-facebook"></i>
        </a>
      </div>
      <div>Copyright&copy; 2026 Servexa</div>
    </footer>
  );
};

export default Footer;
