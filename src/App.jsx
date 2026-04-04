import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Analytics from "./pages/Analytics";
import "./assets/css/style.css";
import "./assets/css/dashboard.css";
import "./assets/css/auth.css";
import "./assets/css/modal.css";
import "./assets/css/hero-simple.css";
import "./assets/css/transactions.css";
import "./assets/css/goals.css";

// Layout wrapper for pages with Navbar and Footer
const MainLayout = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-mesh"></div>
      <div className="bg-stars"></div>
      <div className="bg-grain"></div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Protected Route Component - must be inside AuthProvider
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// App Routes Component - has access to AuthContext
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
