import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate even if API call fails, since we cleared localStorage
      navigate("/");
    }
  };

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-content">
        <div className="logo">
          SAVE<span className="highlight">MORE</span>
        </div>
        <div className="nav-actions">
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
          </div>
          {!isLoggedIn ? (
            <div className="auth-group" data-auth-state="logged-out">
              <Link to="/login" className="btn-text">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="auth-group" data-auth-state="logged-in">
              <Link to="/dashboard" className="btn btn-nav-dashboard">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-text">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
