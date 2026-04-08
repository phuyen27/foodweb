import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch  } from "react-redux";
import {logout} from "../features/auth/authSlice";
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  
  const getNavClass = ({ isActive }) => isActive ? "nav-links active" : "nav-links";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          Food<span className="text-orange">Web</span>
        </NavLink>

        {/* Hamburger menu */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Nav menu */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink 
  to="/" 
  end 
  className={({ isActive }) => "nav-links" + (isActive ? " active" : "")} 
  onClick={toggleMenu}
>
  Home
</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/meal-plan" className={getNavClass} onClick={toggleMenu}>
              Meal Plan
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/foods" className={getNavClass} onClick={toggleMenu}>
              Food
            </NavLink>
          </li>

          {/* Mobile user or login */}
          {user ? (
            <li className="nav-item mobile-user">
              <div className="mobile-user-info">
                <img
                  src={user?.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  className="avatar mobile-avatar"
                />
                <span>{user?.name || "User"}</span>
              </div>
              <NavLink to="/favorites" className={getNavClass} onClick={toggleMenu}>
                My Favorites
              </NavLink>
              <NavLink to="/profile" className={getNavClass} onClick={toggleMenu}>
                Your Profile
              </NavLink>
              <div className="nav-links logout" onClick={() => { handleLogout(); toggleMenu(); }}>
                Logout
              </div>
            </li>
          ) : (
            <li className="nav-item mobile-login">
              <NavLink to="/login" className={getNavClass} onClick={toggleMenu}>
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Desktop user/login */}
        <div className="navbar-actions">
          {user ? (
            <div
              className="user-info"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span className="user-name">{user?.name || "User"}</span>
              <img
                src={user?.avatarUrl || "/default-avatar.png"}
                alt="avatar"
                className="avatar"
              />

              {showDropdown && (
                <div className="dropdown-menu">
                  <NavLink to="/favorites" className="dropdown-item">
                    My Favorites
                  </NavLink>
                  <NavLink to="/profile" className="dropdown-item">
                    Your Profile
                  </NavLink>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="btn-login-desktop">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;