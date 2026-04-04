import { useAuth } from '../context/AuthContext';

const DebugHome = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <div style={{ padding: '100px', color: 'white', background: '#0a1128' }}>
      <h1>DEBUG HOME PAGE</h1>
      <p>If you can see this, React is working!</p>
      <p>Auth Status: {isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT'}</p>
      <p>Current URL: {window.location.href}</p>
    </div>
  );
};

export default DebugHome;
