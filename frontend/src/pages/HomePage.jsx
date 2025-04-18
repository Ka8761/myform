// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Welcome to the Rental App</h1>
    <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to access the dashboard.</p>
  </div>
);

export default HomePage;
