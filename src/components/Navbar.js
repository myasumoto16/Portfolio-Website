import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ currentSection, setCurrentSection, otherSection, setOtherSection }) {
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  
  const handleOtherClick = () => {
    setIsOtherDropdownOpen(!isOtherDropdownOpen);
  };
  
  const handleOtherOptionClick = (option) => {
    setCurrentSection('other');
    setOtherSection(option);
    setIsOtherDropdownOpen(false);
  };
  
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
        <li className={`dropdown-container ${currentSection === 'other' ? 'active' : ''}`}>
          <button 
            className="dropdown-trigger"
            onClick={handleOtherClick}
          >
            Other
          </button>
          {isOtherDropdownOpen && (
            <ul className="dropdown-menu">
              <li className={otherSection === 'craft' && currentSection === 'other' ? 'active' : ''}>
                <button onClick={() => handleOtherOptionClick('craft')}>Craft</button>
              </li>
              {/* <li className={otherSection === 'cooking' && currentSection === 'other' ? 'active' : ''}>
                <button onClick={() => handleOtherOptionClick('cooking')}>Cooking</button>
              </li>
              <li className={otherSection === 'baking' && currentSection === 'other' ? 'active' : ''}>
                <button onClick={() => handleOtherOptionClick('baking')}>Baking</button>
              </li> */}
            </ul>
          )}
        </li>
        <li className={currentSection === 'contact' ? 'active' : ''}>
          <button onClick={() => setCurrentSection('contact')}>Contact</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;