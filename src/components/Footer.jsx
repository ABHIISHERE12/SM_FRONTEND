import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const footer = document.querySelector('.footer');
    const footerGlow = document.createElement('div');
    footerGlow.className = 'footer-glow';
    
    if (footer) {
      footer.appendChild(footerGlow);
      
      const handleMouseMove = (e) => {
        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        footerGlow.style.left = `${x}px`;
        footerGlow.style.top = `${y}px`;
      };

      footer.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        footer.removeEventListener('mousemove', handleMouseMove);
        if (footerGlow.parentNode) {
          footerGlow.parentNode.removeChild(footerGlow);
        }
      };
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              SAVE<span className="highlight">MORE</span>
            </div>
            <p className="footer-desc">
              The first goal-based savings platform built specifically for students.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it Works</a></li>
              <li><a href="#demo">Demo</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 SaveMore. All rights reserved.</p>
          <div className="social-links">
            <a href="#twitter">𝕏</a>
            <a href="#linkedin">in</a>
            <a href="#github">gh</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
