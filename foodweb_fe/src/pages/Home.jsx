import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="guest-hero"> 
          <div className="hero-content">
            <h1 className="hero-title">
              Discover delicious <span className="text-orange">Food</span>
            </h1>

            <p className="hero-subtitle">
              Discover hundreds of delicious dishes, delivered fast to your door in just 30 minutes.
            </p>

            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary">
                View Menu
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="hero-image-placeholder"> 
            <div className="food-blob">
              <span className="food-icon">🍔</span>
              <span className="food-icon">🍕</span>
              <span className="food-icon">🥗</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;