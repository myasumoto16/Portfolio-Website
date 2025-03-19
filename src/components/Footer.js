import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Masakazu Yasumoto. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com/myasumoto16" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/myasumoto" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://huggingface.co/peterhernandez24" target="_blank" rel="noopener noreferrer">Hugging Face</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
