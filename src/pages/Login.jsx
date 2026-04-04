import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      console.error("Login error:", err);
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
            <h1>Welcome Back</h1>
            <p>Build your financial future, one goal at a time.</p>
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
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-group">
                <input type="checkbox" disabled={loading} /> Remember me
              </label>
              <a href="#" className="btn-text">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-auth"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to SaveMore"}
            </button>
          </form>

          <footer className="auth-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
