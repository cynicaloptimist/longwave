import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming your CSS file contains the necessary styles

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
