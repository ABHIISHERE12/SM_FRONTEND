import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useParallax, useFadeUp, useScrollParallax } from '../hooks/useAnimations';
import { useEffect, useState } from 'react';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Subtle parallax for floating cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.querySelector('.floating-cards-container');
      if (!container) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      container.style.transform = `rotateY(${xPercent * 2}deg) rotateX(${-yPercent * 2}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useParallax();
  useFadeUp();
  useScrollParallax();

  // Testimonial carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero container section-padding">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-intro fade-up">
              A basic app that understands the psychology behind saving and spending money
            </span>
            <h1 className="fade-up delay-1">
              Save Smart.<br />Spend Smarter.
            </h1>
            <p className="fade-up delay-2">
              The first goal-based savings platform built specifically for students.
            </p>
            <div className="hero-actions fade-up delay-2">
              <Link to="/signup" className="btn btn-primary">Start Saving Now</Link>
              <a href="#demo" className="btn btn-outline">View Demo</a>
            </div>
          </div>
          <div className="hero-right fade-up delay-3">
            {!isLoggedIn ? (
              // Logged Out: Floating Cards Visual
              <div className="hero-visual">
                <div className="floating-cards-container">
                  {/* Main Balance Card */}
                  <div className="float-card balance-card">
                    <div className="card-user">
                      <div className="user-avatar-sm">AR</div>
                      <span>Alex Rivera</span>
                    </div>
                    <p className="card-label">Total Balance</p>
                    <h2 className="balance-amount">₹12,840<span className="decimal">.50</span></h2>
                    <div className="sparkline-mini">
                      <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M0,15 Q25,10 50,12 T100,8" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>

                  {/* Goal Card */}
                  <div className="float-card goal-card">
                    <div className="goal-header">
                      <span className="goal-emoji">🌍</span>
                      <span className="goal-name">Summer Trip</span>
                    </div>
                    <p className="goal-progress">82% saved</p>
                  </div>

                  {/* Streak Card */}
                  <div className="float-card streak-card">
                    <div className="streak-number">14 🔥</div>
                    <p className="streak-label">Day<br/>Streak</p>
                  </div>
                </div>
              </div>
            ) : (
              // Logged In: Dashboard Snippet
              <div className="hero-visual">
                <div className="hero-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <div className="savings-card">
                      <p className="card-label">Total Savings</p>
                      <h2 className="savings-amount">₹12,450</h2>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '82%'}}></div>
                      </div>
                      <p className="progress-text">82% of your goal</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container section-padding">
        <div className="section-header">
          <h2 className="fade-up">Built for Disciplined Growth</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card fade-up">
            <div className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Goal Based</h3>
            <p>Structured saving for what matters most to you.</p>
          </div>
          <div className="feature-card fade-up delay-1">
            <div className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3>Smart Locks</h3>
            <p>Lock your savings with conditions that build discipline.</p>
          </div>
          <div className="feature-card fade-up delay-2">
            <div className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
              </svg>
            </div>
            <h3>Track Growth</h3>
            <p>Visual progress rings that show exactly how close you are.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="container section-padding how-redesign">
        <div className="editorial-layout">
          <div className="editorial-left">
            <span className="section-label fade-up">HOW IT WORKS</span>
            <h2 className="fade-up delay-1">Saving made simple.</h2>
            <p className="fade-up delay-2">
              We've automated the discipline, so you can focus on the reward. Our structured system ensures your money stays safe until your goals are met.
            </p>
            <div className="fade-up delay-3">
              <Link to="/signup" className="btn-text learn-more-cta">
                Learn more about our system →
              </Link>
            </div>
          </div>
          
          <div className="editorial-right">
            <div className="staggered-grid">
              {/* Card 1: Wide */}
              <div className="work-card card-wide fade-up">
                <div className="card-content">
                  <div className="card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div className="card-text">
                    <h3>Set Your Goal</h3>
                    <p>Choose what you're saving for and define your target amount with customized timelines.</p>
                  </div>
                </div>
                <div className="card-visual-component">
                  <div className="mini-goal-ui">
                    <div className="mini-field">
                      <span>Goal Name</span>
                      <div className="mini-input">MacBook Pro</div>
                    </div>
                    <div className="mini-row">
                      <div className="mini-field">
                        <span>Target</span>
                        <div className="mini-pill">₹1,50,000</div>
                      </div>
                      <div className="mini-field">
                        <span>Time</span>
                        <div className="mini-pill">12 Months</div>
                      </div>
                    </div>
                    <div className="mini-btn">Create Goal</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Vertical */}
              <div className="work-card card-vertical card-dark fade-up delay-1">
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3>Lock & Grow</h3>
                <p>Smart withdrawal rules protect your savings until milestones are reached.</p>
              </div>

              {/* Card 3: Vertical */}
              <div className="work-card card-vertical card-accent fade-up delay-2">
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                </div>
                <h3>Track Progress</h3>
                <p>Monitor your savings visually in real time with intuitive growth trackers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container section-padding testimonials-section">
        <div className="trust-header fade-up">
          <span className="badge-trust">TRUSTED BY 5,000+ STUDENTS</span>
          <h2>What student savers are saying.</h2>
        </div>
        
        <div className="testimonial-carousel fade-up delay-1">
          <div className="carousel-track-container">
            <ul className="carousel-track">
              <li className={`testimonial-slide ${currentSlide === 0 ? 'active' : ''}`}>
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="quote-text">
                    Finally a savings app that doesn't feel like a bank. It feels like a tool for my future. It actually makes me motivated to save for my degree.
                  </p>
                  <div className="testimonial-user">
                    <div className="user-avatar">AR</div>
                    <div className="user-meta">
                      <strong>Alex Rivera</strong>
                      <span>Stanford University</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`testimonial-slide ${currentSlide === 1 ? 'active' : ''}`}>
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="quote-text">
                    The smart locks actually helped me stop dipping into my lunch money. Game changer for anyone struggling with discipline.
                  </p>
                  <div className="testimonial-user">
                    <div className="user-avatar">JC</div>
                    <div className="user-meta">
                      <strong>Jordan Chen</strong>
                      <span>MIT Scholar</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className={`testimonial-slide ${currentSlide === 2 ? 'active' : ''}`}>
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="quote-text">
                    SaveMore turned my chaotic spending into intentional saving. I managed to save for a new laptop in just 6 months.
                  </p>
                  <div className="testimonial-user">
                    <div className="user-avatar">SM</div>
                    <div className="user-meta">
                      <strong>Sarah Miller</strong>
                      <span>UC Berkeley</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="carousel-nav">
            <button 
              className={`carousel-indicator ${currentSlide === 0 ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(0)}
            ></button>
            <button 
              className={`carousel-indicator ${currentSlide === 1 ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(1)}
            ></button>
            <button 
              className={`carousel-indicator ${currentSlide === 2 ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(2)}
            ></button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container section-padding final-cta">
        {!isLoggedIn ? (
          <div className="cta-glass-card fade-up auth-group" data-auth-state="logged-out">
            <div className="cta-content">
              <span className="section-label">Ready to start?</span>
              <h2 className="cta-title">Start Saving <span className="highlight">Today.</span></h2>
              <p className="cta-subtitle">Join thousands of students building their financial future with SaveMore.</p>
              <div className="cta-actions">
                <Link to="/signup" className="btn btn-primary btn-lg">Create Your Account</Link>
              </div>
            </div>
            <div className="cta-glow-1"></div>
            <div className="cta-glow-2"></div>
          </div>
        ) : (
          <div className="cta-glass-card fade-up auth-group" data-auth-state="logged-in">
            <div className="radial-progress-card snippet-version">
              <div className="card-interior">
                <div className="radial-visual-group">
                  <div className="radial-container-sm">
                    <svg viewBox="0 0 100 100" className="radial-svg-segmented">
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14f195" />
                          <stop offset="100%" stopColor="#00e5ff" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      {/* Track */}
                      <circle cx="50" cy="50" r="45" className="radial-track" />
                      
                      {/* Progress Fill */}
                      <circle cx="50" cy="50" r="45" className="radial-progress" 
                        stroke="url(#progressGradient)"
                        style={{'--progress-offset': 'calc(283 * (1 - 0.82))'}} />
                        
                      {/* Endpoint Glow Dot (Rotated to 82%) */}
                      <circle cx="50" cy="5" r="3" fill="#fff" style={{
                        transformOrigin: '50px 50px',
                        transform: 'rotate(295.2deg)',
                        filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))'
                      }} />
                    </svg>
                    <div className="radial-center-sm">
                      <span className="percentage-val-sm">82<span className="pct">%</span></span>
                    </div>
                  </div>
                </div>
                <div className="card-details-group">
                  <div className="card-header-mini">
                    <h3>Savings Progress</h3>
                    <p>Real-time tracking of your financial goals</p>
                  </div>
                  <div className="card-stats-grid">
                    <div className="card-stat-row">
                      <span className="stat-label">Status:</span>
                      <span className="stat-val status-positive">
                        Active 
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div className="card-stat-row">
                      <span className="stat-label">Progress:</span>
                      <span className="stat-val">82%</span>
                    </div>
                    <div className="card-stat-row">
                      <span className="stat-label">Current:</span>
                      <span className="stat-val highlight-val">₹2,100</span>
                    </div>
                    <div className="card-stat-row">
                      <span className="stat-label">Deadline:</span>
                      <span className="stat-val">June 15, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="snippet-cta-footer">
              <Link to="/dashboard" className="btn btn-primary btn-premium-cta">Go to your savings</Link>
            </div>
            <div className="cta-glow-1"></div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
