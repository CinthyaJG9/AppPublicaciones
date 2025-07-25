import { useState } from 'react';
import { register } from '../services/api';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registrado correctamente');
      onRegister();
    } catch (err) {
      alert('Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Nombre" onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Registrarse</button>
    </form>
  );
}
