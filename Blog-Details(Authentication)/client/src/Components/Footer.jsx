import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer-custom text-white py-4 mt-5">
      <div className="container text-center">
        <h5 className="footer-brand mb-2">📝 BlogSpace</h5>
        <p className="footer-tagline mb-3">Write. Share. Inspire.</p>

        <div className="footer-links d-flex justify-content-center gap-4 mb-3">
          <a href="/" className="footer-link">Home</a>
          <a href="/create" className="footer-link">Create Blog</a>
        </div>

        <small className="text-light opacity-75">
          &copy; 2025 BlogSpace. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
