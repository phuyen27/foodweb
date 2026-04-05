import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth); 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Food<span className="text-orange">Web</span>
        </NavLink>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={toggleMenu}>
             Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/menu" className="nav-links" onClick={toggleMenu}>
              Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" onClick={toggleMenu}>
              About
            </NavLink>
          </li>
          
        </ul>
       <div className="navbar-actions">
          {user ? (
  <div className="user-info">
    <span className="user-name">{user?.name || "User"}</span>
    <img
      src={user?.avatarUrl || "/default-avatar.png"}
      alt="avatar"
      className="avatar"
    />
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
