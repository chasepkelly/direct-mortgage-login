import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import DirectMortgageLoginSimplified from './DirectMortgageLoginSimplified';

/**
 * Direct Mortgage Co-Branded Login Page Demo
 * 
 * Setup Instructions:
 * 1. Install dependencies:
 *    npm install react react-dom react-router-dom
 * 
 * 2. Make sure you have the following files in your project:
 *    - DirectMortgageLoginSimplified.jsx
 *    - DirectMortgageLogin.css
 * 
 * 3. Place the image files in the public folder:
 *    - brooks-kelly.jpg
 *    - britney-bryson.jpg (if available)
 *    - direct-mortgage-logo.png
 *    - bryson-realestate-logo.png
 * 
 * 4. Run the application:
 *    npm start
 */

// Simple Home component to demonstrate navigation
const Home = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'center' 
    }}>
      <h1>Direct Mortgage Portal</h1>
      <p>Welcome to the Direct Mortgage demonstration portal.</p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem', 
        marginTop: '2rem' 
      }}>
        <Link to="/login" style={buttonStyle}>
          Go to Login Page
        </Link>
        <Link to="/dashboard" style={buttonStyle}>
          Dashboard Preview
        </Link>
      </div>
    </div>
  );
};

// Mock Dashboard to simulate successful login
const Dashboard = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto' 
    }}>
      <h1>Mortgage Application Dashboard</h1>
      <p>Welcome! You've successfully logged in.</p>
      <p>This is a placeholder for the mortgage application dashboard.</p>
      <Link to="/" style={{ 
        display: 'inline-block', 
        marginTop: '1rem',
        ...buttonStyle 
      }}>
        Back to Home
      </Link>
    </div>
  );
};

// Simple button style for navigation links
const buttonStyle = {
  backgroundColor: '#00A64F',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

// Main App Component
function App() {
  // You could implement authentication state here
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* The login page with our DirectMortgageLoginSimplified component */}
        <Route path="/login" element={<DirectMortgageLoginSimplified />} />
        
        {/* Protected route example - redirects to login if not authenticated */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        
        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
