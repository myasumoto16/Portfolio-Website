import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const location = useLocation();
  
  const handleOtherClick = () => {
    setIsOtherDropdownOpen(!isOtherDropdownOpen);
  };
  
  const isOtherActive = location.pathname.startsWith('/other');
  
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Masakazu Yasumoto</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => 
            isActive || location.pathname.startsWith('/projects/') ? 'active' : ''
          }>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/music" className={({ isActive }) => isActive ? 'active' : ''}>
            Music
          </NavLink>
        </li>
        <li className={`dropdown-container ${isOtherActive ? 'active' : ''}`}>
          <button 
            className="dropdown-trigger"
            onClick={handleOtherClick}
          >
            Other
          </button>
          {isOtherDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/other/craft" className={({ isActive }) => isActive ? 'active' : ''}>
                  Craft
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/other/cooking" className={({ isActive }) => isActive ? 'active' : ''}>
                  Cooking
                </NavLink>
              </li>
              <li>
                <NavLink to="/other/baking" className={({ isActive }) => isActive ? 'active' : ''}>
                  Baking
                </NavLink>
              </li> */}
            </ul>
          )}
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;