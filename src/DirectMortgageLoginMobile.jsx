import React, { useState, useEffect, useRef } from 'react';
import './DirectMortgageDesignSystem.css';

const DirectMortgageLoginMobile = () => {
  // Theme state management
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [showThemeNotification, setShowThemeNotification] = useState(false);
  const [themeNotificationText, setThemeNotificationText] = useState('');
  
  // Form state management
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validation, setValidation] = useState({
    emailOrPhone: { isValid: true, message: '' }
  });
  
  // Refs
  const emailOrPhoneRef = useRef(null);
  const themeToggleRef = useRef(null);
  const notificationTimeoutRef = useRef(null);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('directMortgageTheme');
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('directMortgageTheme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener with compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
      
      // Clear any pending notifications
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);
  
  // Update document class when theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
    
    // Save to localStorage
    localStorage.setItem('directMortgageTheme', theme);
  }, [theme]);
  
  // Toggle theme with notification
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Show notification
    setThemeNotificationText(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`);
    setShowThemeNotification(true);
    
    // Hide notification after 3 seconds
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setShowThemeNotification(false);
    }, 3000);
    
    // Announce theme change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `${newTheme} mode enabled`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setEmailOrPhone(e.target.value);
  };

  // Validate email or phone
  const validateEmailOrPhone = (value) => {
    if (!value.trim()) {
      return { isValid: false, message: 'Email or phone number is required' };
    }
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (simple version)
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    if (emailRegex.test(value) || phoneRegex.test(value)) {
      return { isValid: true, message: '' };
    }
    
    return { isValid: false, message: 'Please enter a valid email address or phone number' };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    const emailOrPhoneValidation = validateEmailOrPhone(emailOrPhone);
    setValidation({
      emailOrPhone: emailOrPhoneValidation
    });
    
    // If valid, proceed with submission
    if (emailOrPhoneValidation.isValid) {
      setIsLoading(true);
      setProgress(0);
      
      // Simulate API call with progress bar
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            
            setTimeout(() => {
              // Success handling
              setIsLoading(false);
              alert('Verification code sent! Redirecting...');
              setEmailOrPhone('');
            }, 500);
            
            return 100;
          }
          return prevProgress + 5;
        });
      }, 100);
    } else {
      // Focus on invalid input
      if (emailOrPhoneRef.current) {
        emailOrPhoneRef.current.focus();
      }
    }
  };
  
  // Handle Enter key on theme toggle
  const handleThemeKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <div className={`mortgage-login ${theme === 'light' ? 'light-mode' : ''}`}>
      {/* Progress Bar */}
      {isLoading && (
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Loading progress"
        ></div>
      )}
      
      {/* Theme Toggle */}
      <div className="theme-toggle-container position-absolute" style={{ top: '1rem', right: '1rem', zIndex: 100 }}>
        <label className="theme-toggle" htmlFor="themeToggle">
          <span className="sr-only">Toggle {theme === 'dark' ? 'light' : 'dark'} mode</span>
          <input 
            type="checkbox" 
            id="themeToggle"
            checked={theme === 'light'}
            onChange={toggleTheme}
            ref={themeToggleRef}
            onKeyDown={handleThemeKeyDown}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          />
          <span className="theme-toggle-slider"></span>
        </label>
      </div>
      
      {/* Theme Notification */}
      {showThemeNotification && (
        <div className="theme-notification" role="status" aria-live="polite">
          <i className={theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true"></i>
          <span className="ml-2">{themeNotificationText}</span>
        </div>
      )}
      
      <div className="container">
        {/* Left Panel - Branding & Contact Info (Appears FIRST on Mobile) */}
        <div className="left-panel">
          {/* Branding */}
          <div className="d-flex align-items-center mb-4">
            <img 
              src="direct-mortgage-logo.png" 
              alt="Direct Mortgage Logo" 
              className={`logo ${theme === 'light' ? 'logo-light' : 'logo-dark'}`}
              style={{ maxWidth: '180px', height: 'auto' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <span
              className="logo-fallback font-bold text-brand"
              style={{ display: 'none', fontSize: '1.4rem' }}
            >
              Direct Mortgage
            </span>
            <div className="tagline text-minted ml-3">CLEAR. FAST. DIRECT.</div>
          </div>

          {/* Welcome message */}
          <p className="welcome-message mb-5">
            Welcome! Let's get you one step closer to homeownership with&nbsp;
            Britney Bryson &amp; Brooks Kelly.
          </p>
          
          {/* Loan Officer Card */}
          <div className="card card-compact mb-4" aria-labelledby="lo-header">
            <h3 className="text-brand font-semibold mb-3" id="lo-header">
              Your Loan Officer
            </h3>
            <div className="d-flex">
              <img 
                src="brooks-kelly.jpg" 
                alt="" 
                className="rounded-circle"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                loading="lazy"
                aria-hidden="true"
              />
              <div className="ml-3">
                <div className="font-semibold mb-1">Brooks Kelly</div>
                <div className="text-secondary text-sm mb-1">National Sales Manager</div>
                <div className="text-secondary text-sm mb-2">NMLS# 208792</div>
                <div className="d-flex flex-column">
                  <a 
                    href="tel:+12144022647" 
                    className="d-flex align-items-center mb-2"
                    aria-label="Call Brooks Kelly at 214-402-2647"
                  >
                    <i className="fas fa-phone text-brand mr-2" aria-hidden="true"></i>
                    <span>214-402-2647</span>
                  </a>
                  <a 
                    href="mailto:brooks@directmortgage.com" 
                    className="d-flex align-items-center mb-2"
                    aria-label="Email Brooks Kelly"
                  >
                    <i className="fas fa-envelope text-brand mr-2" aria-hidden="true"></i>
                    <span>brooks@directmortgage.com</span>
                  </a>
                  <a 
                    href="https://brookskelly.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="d-flex align-items-center"
                    aria-label="Visit Brooks Kelly's website"
                  >
                    <i className="fas fa-globe text-brand mr-2" aria-hidden="true"></i>
                    <span>brookskelly.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <hr className="border-bottom my-4" aria-hidden="true" />
          
          {/* Realtor Partner Card */}
          <div className="card card-compact" aria-labelledby="realtor-header">
            <h3 className="text-minted font-semibold mb-3" id="realtor-header">
              Your Realtor Partner
            </h3>
            <div className="d-flex">
              <img 
                src="britney-bryson.jpg" 
                alt="" 
                className="rounded-circle"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                loading="lazy"
                aria-hidden="true"
              />
              <div className="ml-3">
                <div className="font-semibold mb-1">Britney Bryson</div>
                <div className="text-secondary text-sm mb-1">REALTOR®</div>
                <img 
                  src="bryson-realestate-logo.jpg" 
                  alt="Bryson Real Estate Co" 
                  className="mb-2"
                  style={{ maxWidth: '100px', height: 'auto' }}
                  loading="lazy"
                />
                <div className="d-flex flex-column">
                  <a 
                    href="tel:+19729206654" 
                    className="d-flex align-items-center mb-2"
                    aria-label="Call Britney Bryson at 972-920-6654"
                  >
                    <i className="fas fa-phone text-brand mr-2" aria-hidden="true"></i>
                    <span>(972) 920-6654</span>
                  </a>
                  <a 
                    href="mailto:britney@brysonrealestateco.com" 
                    className="d-flex align-items-center mb-2"
                    aria-label="Email Britney Bryson"
                  >
                    <i className="fas fa-envelope text-brand mr-2" aria-hidden="true"></i>
                    <span>BRITNEY@BRYSONREALESTATECO.COM</span>
                  </a>
                  <a 
                    href="#" 
                    className="d-flex align-items-center mb-3"
                    aria-label="Visit Britney Bryson's website"
                  >
                    <i className="fas fa-globe text-brand mr-2" aria-hidden="true"></i>
                    <span>brysonrealestateco.com</span>
                  </a>
                  <div className="d-flex">
                    <a href="#" className="mr-3" aria-label="Visit Britney Bryson's Facebook page">
                      <i className="fab fa-facebook text-minted"></i>
                    </a>
                    <a href="#" className="mr-3" aria-label="Visit Britney Bryson's Instagram profile">
                      <i className="fab fa-instagram text-minted"></i>
                    </a>
                    <a href="#" aria-label="Visit Britney Bryson's LinkedIn profile">
                      <i className="fab fa-linkedin text-minted"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center text-tertiary text-xs mt-4" aria-label="Page footer">
            © {new Date().getFullYear()} Direct Mortgage. All rights reserved.
          </div>
        </div>

        {/* Right Panel - Login */}
        <div className="right-panel">
          <div className="card card-primary">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold">Let's get you home</h2>
              <p className="text-secondary">Enter your email or phone to get started</p>
            </div>
            
            <form onSubmit={handleSubmit} role="form" aria-labelledby="form-title">
              <div className={`form-group ${!validation.emailOrPhone.isValid ? 'has-error' : ''}`}>
                <label htmlFor="emailOrPhone" className="form-label">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  id="emailOrPhone" 
                  name="emailOrPhone" 
                  value={emailOrPhone}
                  onChange={handleInputChange}
                  ref={emailOrPhoneRef}
                  className={`form-control ${!validation.emailOrPhone.isValid ? 'is-invalid' : ''}`}
                  autoComplete="email tel"
                  placeholder="name@example.com or (555) 555-5555"
                  inputMode="email"
                  required
                  aria-required="true"
                  aria-invalid={!validation.emailOrPhone.isValid}
                  aria-describedby={!validation.emailOrPhone.isValid ? "emailOrPhoneError" : undefined}
                  disabled={isLoading}
                />
                {!validation.emailOrPhone.isValid && (
                  <div id="emailOrPhoneError" className="form-text text-danger" role="alert">
                    <i className="fas fa-exclamation-circle mr-1" aria-hidden="true"></i>
                    {validation.emailOrPhone.message}
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                    Processing...
                  </>
                ) : 'Get Started'}
              </button>

              {/* Security & Terms */}
              <div className="d-flex align-items-center justify-content-center text-tertiary text-xs mt-3">
                <i className="fas fa-lock mr-1" aria-hidden="true"></i>
                <span>Your information is secure and encrypted.</span>
              </div>
              <div className="text-center text-tertiary text-xs mt-2">
                By continuing, you agree to our&nbsp;
                <a href="#" className="text-brand">Terms of Service</a>&nbsp;and&nbsp;
                <a href="#" className="text-brand">Privacy Policy</a>.
              </div>
            </form>

            {/* Card Footer logo/tagline */}
            <div className="text-center mt-5">
              <img 
                src="direct-mortgage-logo.png" 
                alt="Direct Mortgage" 
                style={{ maxWidth: '100px', height: 'auto' }}
                className={theme === 'light' ? 'logo-light' : 'logo-dark'}
              />
              <div className="text-tertiary text-xs mt-1">CLEAR. FAST. DIRECT.</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skip to main content link for accessibility */}
      <a href="#emailOrPhone" className="skip-link">
        Skip to login form
      </a>
    </div>
  );
};

export default DirectMortgageLoginMobile;
