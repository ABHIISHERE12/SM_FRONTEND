import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { transactionsAPI } from "../services/api";

/**
 * Layout — Premium sidebar + topbar shell
 * Consistent across Dashboard, Wallet, Analytics pages
 */
const Layout = ({ children, title, subtitle, balance }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  const [topupError, setTopupError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavClass = (path) => {
    const isActive =
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path));
    return `nav-link${isActive ? " active" : ""}`;
  };

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (!amount || amount <= 0) {
      setTopupError("Enter a valid amount");
      return;
    }

    if (!user) return;
    const userId = user.id || user._id;
    const balanceKey = `user_${userId}_walletBalance`;

    setIsProcessing(true);
    // Simulate API delay
    setTimeout(async () => {
      try {
        const res = await transactionsAPI.create({
          type: "income",
          amount,
          description: "Wallet Top-up",
          category: "salary",
          date: new Date()
        });

        if (res.data?.success) {
          const currentBalance = JSON.parse(localStorage.getItem(balanceKey) || "5000");
          const newBalance = currentBalance + amount;
          localStorage.setItem(balanceKey, JSON.stringify(newBalance));

          // Critical: Dispatch storage event to update other components
          window.dispatchEvent(new Event('storage'));
          setShowTopupModal(false);
          setTopupAmount("");
          setTopupError("");
        } else {
          setTopupError(res.data?.message || "Failed to process top-up. Try again.");
        }
      } catch (err) {
        setTopupError(err.response?.data?.message || "Failed to process top-up. Try again.");
      } finally {
        setIsProcessing(false);
      }
    }, 800);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Wallet", path: "/wallet" },
    { label: "Analytics", path: "/analytics" },
  ];

  return (
    <div className="db-shell">
      {/* ── Background Effects ── */}
      <div className="db-bg-mesh" />
      <div className="db-bg-stars" />
      <div className="db-bg-grain" />

      {/* ── Sidebar ── */}
      <aside className="db-sidebar">
        <div className="db-sidebar__logo">
          SAVEMORE
        </div>

        <nav className="db-sidebar__nav">
          {navItems.map(({ label, path }) => (
            <button
              key={path}
              className={getNavClass(path)}
              onClick={() => navigate(path)}
              aria-label={label}
            >
              <span className="nav-link-label">{label}</span>
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="db-sidebar__footer">
          {user && (
            <div className="db-sidebar__user">
              <div className="db-sidebar__avatar">
                {(user.name || user.email || "U")[0].toUpperCase()}
              </div>
              <div className="db-sidebar__user-info">
                <p className="db-sidebar__user-name">
                  {user.name || "User"}
                </p>
                <p className="db-sidebar__user-role">Free Plan</p>
              </div>
            </div>
          )}
          <button className="btn btn-ghost db-sidebar__logout" onClick={handleLogout} style={{ width: '100%', justifyContent: 'flex-start', gap: 'var(--sp-2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="db-main">
        {/* Topbar / Header */}
        <header className="db-header">
          <div className="db-header__content">
            <div className="db-header__left">
              <span className="db-hero__eyebrow">{subtitle}</span>
              <h1 className="db-header__title">{title}</h1>
            </div>
            
            {balance !== undefined && (
              <div className="db-header__right">
                <div className="db-balance-pill">
                  <div className="db-balance-pill__info">
                    <span className="db-balance-pill__label">Wallet Balance</span>
                    <span className="db-balance-pill__amount">₹{balance.toFixed(2)}</span>
                  </div>
                  <button 
                    className="db-balance-pill__add" 
                    onClick={() => setShowTopupModal(true)}
                    title="Top-up Wallet"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="db-content">
          {children}
        </main>
      </div>

      {/* ── Top-up Modal ── */}
      {showTopupModal && (
        <div className="modal-overlay">
          <div className="db-modal">
            <div className="modal-header">
              <h2 className="modal-title">Top-up Wallet</h2>
              <button className="modal-close" onClick={() => setShowTopupModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Amount to Add (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={topupAmount}
                  onChange={(e) => {
                    setTopupAmount(e.target.value);
                    setTopupError("");
                  }}
                  autoFocus
                />
                {topupError && (
                  <p className="form-error">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {topupError}
                  </p>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)' }}>
                {[500, 1000, 5000].map(amt => (
                  <button 
                    key={amt} 
                    className="btn btn-ghost" 
                    style={{ fontSize: 'var(--text-xs)', padding: 'var(--sp-2)' }}
                    onClick={() => setTopupAmount(amt.toString())}
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={handleTopup}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm Top-up"}
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ flex: 1 }}
                onClick={() => setShowTopupModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
