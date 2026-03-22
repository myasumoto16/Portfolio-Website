import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  const handleOtherClick = () => setIsOtherDropdownOpen(prev => !prev);
  const isOtherActive = location.pathname.startsWith('/other');

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Masakazu Yasumoto</h1>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/experience" className={({ isActive }) => (isActive ? 'active' : '')}>
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive || location.pathname.startsWith('/projects/') ? 'active' : ''
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/music" className={({ isActive }) => (isActive ? 'active' : '')}>
              Music
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive || location.pathname.startsWith('/blog/') ? 'active' : ''
              }
            >
              Blog
            </NavLink>
          </li>
          <li className={`dropdown-container${isOtherActive ? ' active' : ''}`}>
            <button className="dropdown-trigger" onClick={handleOtherClick}>
              Other
            </button>
            {isOtherDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/other/craft"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsOtherDropdownOpen(false)}
                  >
                    Craft
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/other/recipes"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsOtherDropdownOpen(false)}
                  >
                    Recipes
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
