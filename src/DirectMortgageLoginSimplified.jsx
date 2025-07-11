import React, { useState, useEffect } from 'react';
import './DirectMortgageLogin.css';

const DirectMortgageLoginSimplified = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
  };

  // Progress bar animation
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            // Simulate redirect or success message
            alert('Login successful! Redirecting to dashboard...');
            setIsLoading(false);
            return 0;
          }
          return prevProgress + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`mortgage-login ${isDarkMode ? '' : 'light-mode'}`}>
      {/* Progress Bar */}
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%`, display: isLoading ? 'block' : 'none' }}
      ></div>
      
      {/* Theme Toggle */}
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>
      
      <div className="container">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Branding */}
          <div className="branding">
            <img 
              src="direct-mortgage-logo.png" 
              alt="Direct Mortgage Logo" 
              className="logo"
              onError={(e) => {
                // Hide broken image and show fallback text
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextSibling) {
                  e.currentTarget.nextSibling.style.display = 'block';
                }
              }}
            />
            <span
              className="logo-fallback"
              style={{ display: 'none', fontWeight: 'bold', fontSize: '1.4rem', color: '#00A64F' }}
            >
              Direct Mortgage
            </span>
            <div className="tagline">CLEAR. FAST. DIRECT.</div>
          </div>
          
          {/* Loan Officer */}
          <div className="loan-officer">
            <div className="section-header">
              Your Loan Officer
            </div>
            <div className="profile">
              <img 
                src="brooks-kelly.jpg" 
                alt="Brooks Kelly Photo" 
                className="profile-photo"
              />
              <div className="profile-name">Brooks Kelly</div>
              <div className="profile-detail">National Sales Manager</div>
              <div className="profile-detail">NMLS# 208792</div>
              <a 
                href="tel:+12144022647" 
                className="profile-detail"
              >
                <i className="fas fa-phone"></i> 
                214-402-2647
              </a>
              <a 
                href="mailto:brooks@directmortgage.com" 
                className="profile-detail"
              >
                <i className="fas fa-envelope"></i> 
                brooks@directmortgage.com
              </a>
              <a 
                href="https://brookskelly.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-detail"
              >
                <i className="fas fa-globe"></i> 
                brookskelly.com
              </a>
            </div>
          </div>
          
          {/* Divider */}
          <div className="divider"></div>
          
          {/* Realtor Partner */}
          <div className="realtor-partner">
            <div className="section-header">
              Your Realtor Partner
            </div>
            <div className="profile">
              <img 
                src="britney-bryson.jpg" 
                alt="Britney Bryson Photo" 
                className="profile-photo"
              />
              <div className="profile-name">Britney Bryson</div>
              <div className="profile-detail">REALTOR®</div>
              <img 
                src="bryson-realestate-logo.jpg" 
                alt="Bryson Real Estate Co Logo" 
                className="company-logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span
                className="logo-fallback"
                style={{ display: 'none', fontWeight: 'bold', fontSize: '1rem', color: '#d4af37' }}
              >
                BRYSON REAL ESTATE CO
              </span>
              <a 
                href="tel:+19729206654" 
                className="profile-detail"
              >
                <i className="fas fa-phone"></i> 
                (972) 920-6654
              </a>
              <a 
                href="mailto:britney@brysonrealestateco.com" 
                className="profile-detail"
              >
                <i className="fas fa-envelope"></i> 
                BRITNEY@BRYSONREALESTATECO.COM
              </a>
              <a 
                href="#" 
                className="profile-detail"
              >
                <i className="fas fa-globe"></i> 
                brysonrealestateco.com
              </a>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="right-panel">
          <div className="login-card">
            <div className="welcome-message">
              Welcome! Let's get you one step closer to homeownership with Britney Bryson & Brooks Kelly.
            </div>
            
            <div className="login-header">
              <h2>Get Started</h2>
              <p>Sign in to continue your mortgage application or start a new one.</p>
            </div>
            
            <form onSubmit={handleSubmit} role="form" aria-label="Mortgage application sign-in form">
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Sign In
              </button>
              
              <div className="or-divider">
                <span>OR CONTINUE WITH</span>
              </div>
              
              <div className="social-login">
                <button type="button">
                  <i className="fab fa-google"></i> Google
                </button>
                <button type="button">
                  <i className="fab fa-apple"></i> Apple
                </button>
              </div>
              
              <button 
                type="button" 
                className="btn btn-outline"
              >
                Continue as Guest
              </button>
              
              <div className="terms">
                By continuing, you agree to our{' '}
                <a href="#">Terms of Service</a>{' '}
                and{' '}
                <a href="#">Privacy Policy</a>.
              </div>
            </form>
            
            <div className="footer">
              <img 
                src="direct-mortgage-logo.png" 
                alt="Direct Mortgage Logo" 
                className="footer-logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextSibling) {
                    e.currentTarget.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span
                className="logo-fallback"
                style={{ display: 'none', fontWeight: 'bold', fontSize: '0.9rem', color: '#00A64F' }}
              >
                Direct Mortgage
              </span>
              <div className="footer-tagline">CLEAR. FAST. DIRECT.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMortgageLoginSimplified;
