'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CambiarPassword() {
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (passwordNueva !== passwordConfirmar) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    setEnviando(true);

    const res = await fetch('/api/cambiar-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passwordActual, passwordNueva }),
    });

    if (res.ok) {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/admin');
    } else {
      const data = await res.json();
      setEnviando(false);
      setError(data.error ?? 'No se pudo cambiar la contraseña');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-4xl text-ink mb-2">Cambiar contraseña</h1>
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-px bg-gold" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">
            Contraseña actual
          </label>
          <div className="relative">
            <input
              type={mostrarActual ? 'text' : 'password'}
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
              required
              className="w-full px-4 py-3 pr-20 rounded-lg border border-line bg-white focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="button"
              onClick={() => setMostrarActual((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-gold hover:text-gold-dark transition-colors"
            >
              {mostrarActual ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              type={mostrarNueva ? 'text' : 'password'}
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
              className="w-full px-4 py-3 pr-20 rounded-lg border border-line bg-white focus:outline-none focus:border-gold transition-colors placeholder:text-ink/40"
            />
            <button
              type="button"
              onClick={() => setMostrarNueva((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-gold hover:text-gold-dark transition-colors"
            >
              {mostrarNueva ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gold mb-2">
            Confirmar nueva contraseña
          </label>
          <div className="relative">
            <input
              type={mostrarConfirmar ? 'text' : 'password'}
              value={passwordConfirmar}
              onChange={(e) => setPasswordConfirmar(e.target.value)}
              placeholder="Repite la nueva contraseña"
              required
              minLength={8}
              className="w-full px-4 py-3 pr-20 rounded-lg border border-line bg-white focus:outline-none focus:border-gold transition-colors placeholder:text-ink/40"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmar((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wide text-gold hover:text-gold-dark transition-colors"
            >
              {mostrarConfirmar ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-gold text-white py-3 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-60"
        >
          {enviando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}