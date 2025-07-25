import { useState } from 'react';
import { login } from '../services/api';
import { saveToken } from '../services/auth';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      saveToken(res.data.token);
      onLogin();  // Notifica al componente principal
    } catch (err) {
      alert(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
