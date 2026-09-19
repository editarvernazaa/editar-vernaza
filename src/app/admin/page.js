'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/panel');
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Hubo un problema de conexión');
    }
  }

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-8 py-16 overflow-hidden">
      <img
        src="/fondo-login.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-cream/40" />

      <div className="relative w-full max-w-sm">
        <p className="uppercase tracking-widest text-xs text-gold text-center mb-2">
          Panel privado
        </p>
        <h1 className="font-display text-3xl text-ink text-center mb-8">
          Iniciar sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-cream/85 backdrop-blur-sm rounded-2xl p-6 border border-line">
          <div>
            <label className="block text-sm text-ink/70 mb-1">Correo</label>
            <input
              type="email"
              value={email}
              placeholder="nombre@correo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-line bg-white focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-ink/70 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={mostrarPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg border border-line bg-white focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setMostrarPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-gold transition-colors"
              >
                {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gold text-white py-2.5 rounded-full hover:bg-gold-dark transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}