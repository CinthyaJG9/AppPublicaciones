import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="p-4">
      <h1>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h1>
      {isLogin ? <Login onLogin={onAuthSuccess} /> : <Register onRegister={() => setIsLogin(true)} />}
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500">
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
}
