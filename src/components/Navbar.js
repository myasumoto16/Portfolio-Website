import React from 'react';
import './Navbar.css';

function Navbar({ currentSection, setCurrentSection }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Masakazu Yasumoto</h1>
      </div>
      <ul className="nav-links">
        <li className={currentSection === 'about' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('about')}>About</button>
        </li>
        <li className={currentSection === 'experience' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('experience')}>Experience</button>
        </li>
        <li className={currentSection === 'projects' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('projects')}>Projects</button>
        </li>
        <li className={currentSection === 'music' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('music')}>Music</button>
        </li>
        <li className={currentSection === 'contact' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('contact')}>Contact</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;