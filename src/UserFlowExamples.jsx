import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './DirectMortgageDesignSystem.css';

// Main User Flow Examples Component
const UserFlowExamples = () => {
  // Theme state management
  const [theme, setTheme] = useState('dark');
  const [showThemeNotification, setShowThemeNotification] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('directMortgageTheme');
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
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
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
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
    setShowThemeNotification(true);
    setTimeout(() => setShowThemeNotification(false), 3000);
  };

  return (
    <Router>
      <div className={`app-container ${theme === 'light' ? 'light-mode' : ''}`}>
        {/* Theme Toggle */}
        <div className="theme-toggle-container position-absolute" style={{ top: '1rem', right: '1rem', zIndex: 100 }}>
          <label className="theme-toggle" htmlFor="themeToggle">
            <span className="sr-only">Toggle {theme === 'dark' ? 'light' : 'dark'} mode</span>
            <input 
              type="checkbox" 
              id="themeToggle"
              checked={theme === 'light'}
              onChange={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            />
            <span className="theme-toggle-slider"></span>
          </label>
        </div>
        
        {/* Theme Notification */}
        {showThemeNotification && (
          <div className="theme-notification" role="status" aria-live="polite">
            <i className={theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true"></i>
            <span className="ml-2">{theme === 'light' ? 'Light' : 'Dark'} mode enabled</span>
          </div>
        )}
        
        {/* Navigation Header */}
        <header className="bg-primary shadow-sm p-4 mb-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img 
                  src="direct-mortgage-logo.png" 
                  alt="Direct Mortgage" 
                  className={`logo ${theme === 'light' ? 'logo-light' : 'logo-dark'}`}
                  style={{ maxWidth: '150px', height: 'auto' }}
                />
                <div className="text-minted ml-3 d-none d-md-block">CLEAR. FAST. DIRECT.</div>
              </div>
              <nav className="d-flex">
                <NavLink to="/" label="Login" />
                <NavLink to="/onboarding" label="Onboarding" />
                <NavLink to="/documents" label="Documents" />
                <NavLink to="/dashboard" label="Dashboard" />
                <NavLink to="/validation" label="Validation" />
                <NavLink to="/modals" label="Modals" />
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="container pb-5">
          <Routes>
            <Route path="/" element={<LoginExample theme={theme} />} />
            <Route path="/onboarding" element={<OnboardingExample theme={theme} />} />
            <Route path="/documents" element={<DocumentUploadExample theme={theme} />} />
            <Route path="/dashboard" element={<DashboardExample theme={theme} />} />
            <Route path="/validation" element={<ValidationExample theme={theme} />} />
            <Route path="/modals" element={<ModalExample theme={theme} />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-secondary p-4 mt-5">
          <div className="container">
            <div className="text-center text-tertiary text-xs">
              © {new Date().getFullYear()} Direct Mortgage. All rights reserved.
              <div className="mt-2">
                <a href="#" className="text-brand mr-3">Terms of Service</a>
                <a href="#" className="text-brand mr-3">Privacy Policy</a>
                <a href="#" className="text-brand">Contact Us</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Custom NavLink component
const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`mx-2 px-2 py-1 text-decoration-none ${isActive ? 'text-brand font-semibold' : 'text-primary'}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
};

// 1. Login Example (simplified version of DirectMortgageLoginEnhanced)
const LoginExample = ({ theme }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card card-primary">
          <h1 className="text-2xl font-semibold text-center mb-4">Let's get you home</h1>
          <p className="text-secondary text-center mb-4">Enter your email or phone to get started</p>
          
          {isLoading && (
            <div className="progress mb-4" aria-label="Loading progress">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailOrPhone" className="form-label">Email or Phone Number</label>
              <input
                type="text"
                id="emailOrPhone"
                className="form-control"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com or (555) 555-5555"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                  Processing...
                </>
              ) : 'Get Started'}
            </button>
            
            <div className="d-flex align-items-center justify-content-center text-tertiary text-xs mt-3">
              <i className="fas fa-lock mr-1" aria-hidden="true"></i>
              <span>Your information is secure and encrypted.</span>
            </div>
          </form>
        </div>
        
        <div className="card mt-4">
          <h2 className="text-xl font-semibold mb-3">Design System Notes</h2>
          <ul className="pl-4">
            <li className="mb-2">Uses <code>card-primary</code> with Deal Closing Green accent</li>
            <li className="mb-2">Form validation with accessible error states</li>
            <li className="mb-2">Loading state with progress bar</li>
            <li className="mb-2">Security messaging with lock icon</li>
            <li className="mb-2">Proper contrast in both light/dark modes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 2. Onboarding Flow Example
const OnboardingExample = ({ theme }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 3));
  };
  
  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card">
          {/* Progress Steps */}
          <div className="d-flex justify-content-between mb-4">
            {[1, 2, 3].map(stepNum => (
              <div 
                key={stepNum}
                className={`d-flex flex-column align-items-center ${step >= stepNum ? 'text-brand' : 'text-tertiary'}`}
                style={{ width: '33%' }}
              >
                <div 
                  className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${
                    step > stepNum ? 'bg-brand text-white' : 
                    step === stepNum ? 'border border-brand' : 'border border-tertiary'
                  }`}
                  style={{ width: '32px', height: '32px' }}
                >
                  {step > stepNum ? <i className="fas fa-check" /> : stepNum}
                </div>
                <div className={`text-center ${step >= stepNum ? 'font-medium' : ''}`}>
                  {stepNum === 1 ? 'Personal Info' : stepNum === 2 ? 'Contact Details' : 'Address'}
                </div>
              </div>
            ))}
          </div>
          
          {/* Step Content */}
          <form onSubmit={handleNext}>
            {step === 1 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Tell us about yourself</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">How can we reach you?</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {step === 3 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">What's your address?</h2>
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city" className="form-label">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="state" className="form-label">State</label>
                      <select
                        id="state"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="NY">New York</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="zip" className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="form-control"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
              {step > 1 ? (
                <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
                  <i className="fas fa-arrow-left mr-2"></i>Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                {step < 3 ? 'Continue' : 'Submit Application'}
                {step < 3 && <i className="fas fa-arrow-right ml-2"></i>}
              </button>
            </div>
          </form>
        </div>
        
        <div className="card mt-4">
          <h2 className="text-xl font-semibold mb-3">Design System Notes</h2>
          <ul className="pl-4">
            <li className="mb-2">Multi-step form with progress indicator</li>
            <li className="mb-2">Responsive grid layout for form fields</li>
            <li className="mb-2">Consistent button styling and positioning</li>
            <li className="mb-2">Proper form field spacing and grouping</li>
            <li className="mb-2">Accessible form labels and controls</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 3. Document Upload Interface
const DocumentUploadExample = ({ theme }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'W-2 (2022)', status: 'uploaded', date: '06/15/2023' },
    { id: 2, name: 'Bank Statement', status: 'pending', date: null },
    { id: 3, name: 'Pay Stub', status: 'rejected', date: '06/10/2023', reason: 'Document unclear or incomplete' },
    { id: 4, name: 'Driver License', status: 'pending', date: null }
  ]);
  
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, handle file upload here
    alert('File upload simulation: Document would be processed here');
  };
  
  const handleFileChange = (e) => {
    // In a real app, handle file upload here
    alert('File upload simulation: Document would be processed here');
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'uploaded':
        return <span className="badge badge-success">Uploaded</span>;
      case 'pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'rejected':
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Document Upload</h2>
          <p className="text-secondary mb-4">
            Please upload the following documents to continue with your mortgage application.
          </p>
          
          {/* Document Upload Area */}
          <div 
            className={`border border-dashed rounded p-5 text-center mb-4 ${dragActive ? 'border-brand bg-brand bg-opacity-10' : 'border-tertiary'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-brand mb-3"></i>
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-tertiary mb-3">or</p>
            <label className="btn btn-outline-primary">
              Browse Files
              <input
                type="file"
                className="d-none"
                onChange={handleFileChange}
                multiple
              />
            </label>
            <p className="text-xs text-tertiary mt-3">
              Supported formats: PDF, JPG, PNG (Max 10MB per file)
            </p>
          </div>
          
          {/* Document List */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className="far fa-file-pdf text-brand mr-2"></i>
                        <span>{doc.name}</span>
                      </div>
                      {doc.status === 'rejected' && (
                        <div className="text-xs text-danger mt-1">
                          <i className="fas fa-exclamation-circle mr-1"></i>
                          {doc.reason}
                        </div>
                      )}
                    </td>
                    <td>{getStatusBadge(doc.status)}</td>
                    <td>{doc.date || '—'}</td>
                    <td>
                      {doc.status === 'uploaded' ? (
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="fas fa-eye mr-1"></i>View
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fas fa-upload mr-1"></i>Upload
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="alert alert-info mt-4" role="alert">
            <div className="d-flex">
              <i className="fas fa-info-circle mt-1 mr-3"></i>
              <div>
                <strong>Need help?</strong> Contact your loan officer Brooks Kelly at (214) 402-2647 if you have questions about required documents.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Upload Tips</h3>
          <ul className="pl-4">
            <li className="mb-2">Ensure all pages are included in each document</li>
            <li className="mb-2">Documents should be clear and legible</li>
            <li className="mb-2">Make sure your name appears on all documents</li>
            <li className="mb-2">Bank statements should show your account number</li>
          </ul>
        </div>
        
        <div className="card mt-4">
          <h3 className="text-xl font-semibold mb-3">Design System Notes</h3>
          <ul className="pl-4">
            <li className="mb-2">Drag and drop interface with visual feedback</li>
            <li className="mb-2">Status badges with semantic colors</li>
            <li className="mb-2">Responsive table with appropriate actions</li>
            <li className="mb-2">Contextual alerts for additional information</li>
            <li className="mb-2">Consistent iconography and spacing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 4. Application Dashboard Preview
const DashboardExample = ({ theme }) => {
  const applicationStatus = {
    overall: 65,
    sections: [
      { name: 'Personal Information', status: 'complete', progress: 100 },
      { name: 'Employment & Income', status: 'complete', progress: 100 },
      { name: 'Assets & Liabilities', status: 'in-progress', progress: 60 },
      { name: 'Property Information', status: 'in-progress', progress: 40 },
      { name: 'Declarations', status: 'not-started', progress: 0 }
    ]
  };
  
  const recentActivity = [
    { id: 1, type: 'document', action: 'W-2 uploaded', date: '2023-07-10T14:30:00Z' },
    { id: 2, type: 'message', action: 'Message from Brooks Kelly', date: '2023-07-09T10:15:00Z' },
    { id: 3, type: 'application', action: 'Employment section completed', date: '2023-07-08T16:45:00Z' },
    { id: 4, type: 'system', action: 'Application started', date: '2023-07-07T09:00:00Z' }
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <i className="fas fa-check-circle text-success"></i>;
      case 'in-progress':
        return <i className="fas fa-clock text-warning"></i>;
      case 'not-started':
        return <i className="far fa-circle text-tertiary"></i>;
      default:
        return null;
    }
  };
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'document':
        return <i className="fas fa-file-alt text-brand"></i>;
      case 'message':
        return <i className="fas fa-comment-alt text-info"></i>;
      case 'application':
        return <i className="fas fa-tasks text-success"></i>;
      case 'system':
        return <i className="fas fa-cog text-tertiary"></i>;
      default:
        return null;
    }
  };
  
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-2xl font-semibold">Application Dashboard</h2>
            <span className="badge badge-primary">In Progress</span>
          </div>
          
          {/* Overall Progress */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="text-lg font-medium">Overall Progress</h3>
              <span className="font-semibold">{applicationStatus.overall}%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div 
                className="progress-bar" 
                style={{ width: `${applicationStatus.overall}%` }}
                role="progressbar"
                aria-valuenow={applicationStatus.overall}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          
          {/* Section Progress */}
          <h3 className="text-lg font-medium mb-3">Application Sections</h3>
          <div className="list-group mb-4">
            {applicationStatus.sections.map((section, index) => (
              <div key={index} className="list-group-item border-0 px-0 py-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span className="mr-2">{getStatusIcon(section.status)}</span>
                    <span className="font-medium">{section.name}</span>
                  </div>
                  <span className="text-tertiary text-sm">{section.progress}%</span>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div 
                    className={`progress-bar ${section.status === 'complete' ? 'bg-success' : ''}`}
                    style={{ width: `${section.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary">Save & Exit</button>
            <button className="btn btn-primary">Continue Application</button>
          </div>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Loan Officer</h3>
          <div className="d-flex mb-3">
            <img 
              src="brooks-kelly.jpg" 
              alt="" 
              className="rounded-circle"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              aria-hidden="true"
            />
            <div className="ml-3">
              <div className="font-semibold">Brooks Kelly</div>
              <div className="text-tertiary text-sm">NMLS# 208792</div>
              <button className="btn btn-sm btn-outline-primary mt-2">
                <i className="fas fa-comment mr-1"></i>Message
              </button>
            </div>
          </div>
        </div>
        
        <div className="card mt-4">
          <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
          <div className="timeline">
            {recentActivity.map(activity => (
              <div key={activity.id} className="d-flex mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center mr-3"
                  style={{ 
                    width: '36px', 
                    height: '36px',
                    backgroundColor: 'rgba(0, 166, 79, 0.1)'
                  }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-tertiary text-xs">{formatDate(activity.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card mt-4">
          <h3 className="text-xl font-semibold mb-3">Design System Notes</h3>
          <ul className="pl-4">
            <li className="mb-2">Dashboard layout with main and sidebar content</li>
            <li className="mb-2">Progress tracking with visual indicators</li>
            <li className="mb-2">Status icons with semantic colors</li>
            <li className="mb-2">Activity timeline with custom styling</li>
            <li className="mb-2">Consistent card components and spacing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 5. Form Validation Examples
const ValidationExample = ({ theme }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false
  });
  
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // Validation rules
  const validate = (data) => {
    const newErrors = {};
    
    // Username validation
    if (!data.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (data.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }
    
    // Confirm password validation
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Phone validation
    if (data.phone && !/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    // Terms validation
    if (!data.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const validationErrors = validate({
        ...formData,
        [name]: val
      });
      
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name]
      }));
    }
  };
  
  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const validationErrors = validate({
      ...formData,
      [name]: formData[name]
    });
    
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name]
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    
    // Validate all fields
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // In a real app, submit the form data to the server
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Form Validation Examples</h2>
          
          {submitted && (
            <div className="alert alert-success mb-4" role="alert">
              <i className="fas fa-check-circle mr-2"></i>
              Form submitted successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} noValidate>
            {/* Username field */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${touched.username && (errors.username ? 'is-invalid' : 'is-valid')}`}
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.username && errors.username && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.username}
                </div>
              )}
            </div>
            
            {/* Email field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${touched.email && (errors.email ? 'is-invalid' : 'is-valid')}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.email}
                </div>
              )}
            </div>
            
            {/* Password field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${touched.password && (errors.password ? 'is-invalid' : 'is-valid')}`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password}
                </div>
              )}
              {formData.password && !errors.password && (
                <div className="form-text text-success">
                  <i className="fas fa-check-circle mr-1"></i>
                  Password strength: Strong
                </div>
              )}
            </div>
            
            {/* Confirm Password field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${touched.confirmPassword && (errors.confirmPassword ? 'is-invalid' : 'is-valid')}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            
            {/* Phone field (optional) */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="text-tertiary">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(555) 555-5555"
              />
              {touched.phone && errors.phone && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.phone}
                </div>
              )}
            </div>
            
            {/* Terms checkbox */}
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="custom-control-input"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="custom-control-label" htmlFor="terms">
                  I agree to the <a href="#" className="text-brand">Terms and Conditions</a>
                </label>
              </div>
              {touched.terms && errors.terms && (
                <div className="form-text text-danger">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.terms}
                </div>
              )}
            </div>
            
            <button type="submit" className="btn btn-primary">
              Submit Form
            </button>
          </form>
        </div>
        
        <div className="card mt-4">
          <h2 className="text-xl font-semibold mb-3">Design System Notes</h2>
          <ul className="pl-4">
            <li className="mb-2">Real-time validation with visual feedback</li>
            <li className="mb-2">Semantic error messages with icons</li>
            <li className="mb-2">Valid/invalid state styling for inputs</li>
            <li className="mb-2">Custom checkbox styling</li>
            <li className="mb-2">Form submission handling with success message</li>
            <li className="mb-2">Accessible form labels and error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 6. Modal and Alert Examples
const ModalExample = ({ theme }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('default');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const showAlertMessage = (type) => {
    setAlertType(type);
    setShowAlert(true);
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  
  const getModalContent = () => {
    switch (modalType) {
      case 'confirmation':
        return (
          <>
            <div className="modal-header">
              <h5 className="modal-title">Confirm Action</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to submit your application? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => {
                  closeModal();
                  showAlertMessage('success');
                }}
              >
                Confirm
              </button>
            </div>
          </>
        );
        
      case 'form':
        return (
          <>
            <div className="modal-header">
              <h5 className="modal-title">Contact Information</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="modalName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="modalName" />
                </div>
                <div className="form-group">
                  <label htmlFor="modalEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="modalEmail" />
                </div>
                <div className="form-group">
                  <label htmlFor="modalMessage" className="form-label">Message</label>
                  <textarea className="form-control" id="modalMessage" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>Cancel</button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  closeModal();
                  showAlertMessage('info');
                }}
              >
                Send Message
              </button>
            </div>
          </>
        );
        
      case 'notification':
        return (
          <>
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Document Approved</h5>
              <button type="button" className="close text-white" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
                <i className="fas fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <p className="text-center">Your W-2 document has been approved. Thank you for your submission.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={closeModal}>Got it</button>
            </div>
          </>
        );
        
      default:
        return (
          <>
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>This is a basic modal dialog window.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={closeModal}>Save changes</button>
            </div>
          </>
        );
    }
  };
  
  const getAlertContent = () => {
    switch (alertType) {
      case 'success':
        return (
          <div className="alert alert-success" role="alert">
            <div className="d-flex">
              <i className="fas fa-check-circle mt-1 mr-3"></i>
              <div>
                <strong>Success!</strong> Your application has been submitted.
              </div>
            </div>
          </div>
        );
        
      case 'warning':
        return (
          <div className="alert alert-warning" role="alert">
            <div className="d-flex">
              <i className="fas fa-exclamation-triangle mt-1 mr-3"></i>
              <div>
                <strong>Warning!</strong> Your session will expire in 5 minutes.
              </div>
            </div>
          </div>
        );
        
      case 'danger':
        return (
          <div className="alert alert-danger" role="alert">
            <div className="d-flex">
              <i className="fas fa-exclamation-circle mt-1 mr-3"></i>
              <div>
                <strong>Error!</strong> There was a problem processing your request.
              </div>
            </div>
          </div>
        );
        
      case 'info':
        return (
          <div className="alert alert-info" role="alert">
            <div className="d-flex">
              <i className="fas fa-info-circle mt-1 mr-3"></i>
              <div>
                <strong>Info!</strong> Your message has been sent to your loan officer.
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {showAlert && getAlertContent()}
        
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Modal Examples</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Basic Modal</h3>
                <p className="text-secondary mb-3">A simple dialog window with standard header, body, and footer.</p>
                <button className="btn btn-primary mt-auto" onClick={() => openModal('default')}>
                  Open Basic Modal
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Confirmation Modal</h3>
                <p className="text-secondary mb-3">Use for confirming important actions before proceeding.</p>
                <button className="btn btn-primary mt-auto" onClick={() => openModal('confirmation')}>
                  Open Confirmation Modal
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Form Modal</h3>
                <p className="text-secondary mb-3">Modal containing a form for user input collection.</p>
                <button className="btn btn-primary mt-auto" onClick={() => openModal('form')}>
                  Open Form Modal
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Notification Modal</h3>
                <p className="text-secondary mb-3">Styled modal for important notifications or confirmations.</p>
                <button className="btn btn-primary mt-auto" onClick={() => openModal('notification')}>
                  Open Notification Modal
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mt-4">
          <h2 className="text-2xl font-semibold mb-4">Alert Examples</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Success Alert</h3>
                <p className="text-secondary mb-3">Use for successful operations and confirmations.</p>
                <button 
                  className="btn btn-success mt-auto" 
                  onClick={() => showAlertMessage('success')}
                >
                  Show Success Alert
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Warning Alert</h3>
                <p className="text-secondary mb-3">Use for warnings that need user attention.</p>
                <button 
                  className="btn btn-warning mt-auto" 
                  onClick={() => showAlertMessage('warning')}
                >
                  Show Warning Alert
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Error Alert</h3>
                <p className="text-secondary mb-3">Use for errors and critical issues.</p>
                <button 
                  className="btn btn-danger mt-auto" 
                  onClick={() => showAlertMessage('danger')}
                >
                  Show Error Alert
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card card-compact h-100">
                <h3 className="text-lg font-medium mb-3">Info Alert</h3>
                <p className="text-secondary mb-3">Use for general information and updates.</p>
                <button 
                  className="btn btn-info mt-auto" 
                  onClick={() => showAlertMessage('info')}
                >
                  Show Info Alert
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mt-4">
          <h3 className="text-xl font-semibold mb-3">Design System Notes</h3>
          <ul className="pl-4">
            <li className="mb-2">Modal components with consistent styling</li>
            <li className="mb-2">Different modal types for various use cases</li>
            <li className="mb-2">Alert components with semantic colors and icons</li>
            <li className="mb-2">Auto-dismissing alerts with smooth transitions</li>
            <li className="mb-2">Proper focus management and accessibility</li>
          </ul>
        </div>
      </div>
      
      {/* Modal Container */}
      {showModal && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
      
      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block' }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {getModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFlowExamples;
