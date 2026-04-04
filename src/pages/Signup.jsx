import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strengthClass, setStrengthClass] = useState("");
  const [showMeter, setShowMeter] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (val.length > 0) {
      setShowMeter(true);
      if (val.length < 6) {
        setStrengthClass("strength-low");
      } else if (val.length < 10) {
        setStrengthClass("strength-mid");
      } else {
        setStrengthClass("strength-high");
      }
    } else {
      setShowMeter(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="bg-gradient-mesh"></div>
      <div className="bg-noise"></div>

      <div className="auth-container fade-up">
        <div className="auth-card">
          <header className="auth-header">
            <div className="logo">
              SAVE<span className="highlight">MORE</span>
            </div>
            <h1>Create Account</h1>
            <p>Join 5,000+ students on their saving journey.</p>
          </header>

          {error && (
            <div
              className="error-message"
              style={{
                color: "#ff4757",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
                disabled={loading}
              />
              <div
                className="strength-meter"
                style={{ display: showMeter ? "block" : "none" }}
              >
                <div className={`strength-bar ${strengthClass}`}></div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-auth"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Your Account"}
            </button>
          </form>

          <footer className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Signup;
