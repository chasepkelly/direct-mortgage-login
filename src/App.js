import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';

import DirectMortgageLoginMobile from './DirectMortgageLoginMobile';

/* ------------------------------------------------------------------
 *  Basic demo components just to illustrate navigation. Replace or
 *  extend as your real app evolves.
 * ------------------------------------------------------------------ */

const buttonStyle = {
  backgroundColor: '#00A64F',
  color: '#fff',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s'
};

const Home = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Direct Mortgage Portal</h1>
    <p>Welcome to the Direct Mortgage demonstration portal.</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
      <Link to="/login" style={buttonStyle}>
        Go to Login Page
      </Link>
      <Link to="/dashboard" style={buttonStyle}>
        Dashboard Preview
      </Link>
    </div>
  </div>
);

const Dashboard = () => (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Mortgage Application Dashboard</h1>
    <p>Welcome! You've successfully logged in.</p>
    <p>This is a placeholder for the mortgage application dashboard.</p>
    <Link to="/" style={{ ...buttonStyle, marginTop: '1rem', display: 'inline-block' }}>
      Back to Home
    </Link>
  </div>
);

/* ------------------------------------------------------------------
 *  Main App – sets up routing
 * ------------------------------------------------------------------ */

function App() {
  // TODO: wire up real authentication state when backend is ready
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<DirectMortgageLoginMobile />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
