import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { getToken } from './services/auth';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setAuth(true);
    }
  }, []);

  return auth ? <Home onLogout={() => setAuth(false)} /> : <Auth onAuthSuccess={() => setAuth(true)} />;
}

export default App;
