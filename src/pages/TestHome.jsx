// Simple test component to verify React is working
const TestHome = () => {
  return (
    <div style={{padding: '100px', color: 'white', background: '#0a0f1e'}}>
      <h1 style={{fontSize: '48px'}}>TEST - React is Working!</h1>
      <p style={{fontSize: '24px'}}>If you see this, React is rendering correctly.</p>
      <p>The issue is likely with CSS or component structure.</p>
    </div>
  );
};

export default TestHome;
