'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import CambiarPassword from '@/components/CambiarPassword';

export default function PanelAdmin({ categorias, carrusel }) {
  const [seccion, setSeccion] = useState('carrusel');
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const categoriaActual = categorias.find((c) => c.id === seccion);
  const esCarrusel = seccion === 'carrusel';
  const itemsActuales = esCarrusel ? carrusel : categoriaActual?.imagenes ?? [];

  function claseBoton(activo) {
    return `shrink-0 flex items-center gap-2 px-3 py-2 rounded-full md:rounded-lg text-sm whitespace-nowrap transition-colors ${
      activo ? 'bg-gold text-white' : 'text-ink/80 hover:bg-line/40 border border-line md:border-0'
    }`;
  }

  async function handleUpload(e) {
    e.preventDefault();
    setError('');

    const fileInput = e.target.elements.file;
    const file = fileInput.files[0];

    if (!file) {
      setError('Selecciona una imagen primero');
      return;
    }

    setSubiendo(true);

    const url = esCarrusel
      ? `/api/carrusel?filename=${encodeURIComponent(file.name)}`
      : `/api/imagenes?categoriaId=${seccion}&filename=${encodeURIComponent(file.name)}`;

    const res = await fetch(url, { method: 'POST', body: file });

    setSubiendo(false);

    if (res.ok) {
      fileInput.value = '';
      router.refresh();
    } else {
      setError('No se pudo subir la imagen');
    }
  }

  async function handleDelete(id) {
    const confirmar = confirm('¿Desea borrar esta imagen?');
    if (!confirmar) return;

    const url = esCarrusel ? `/api/carrusel?id=${id}` : `/api/imagenes?id=${id}`;
    const res = await fetch(url, { method: 'DELETE' });

    if (res.ok) {
      router.refresh();
    } else {
      setError('No se pudo borrar la imagen');
    }
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-line bg-cream gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="font-display text-lg sm:text-xl text-ink truncate">
            Editar <span className="font-script text-xl sm:text-2xl text-gold">Vernaza</span>
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-wide border border-line rounded-full px-3 py-1 text-ink/60">
            Panel admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-ink/70 hover:text-gold transition-colors shrink-0"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Menú horizontal: solo en celular/tablet */}
        <nav className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 border-b border-line">
          <button onClick={() => setSeccion('carrusel')} className={claseBoton(esCarrusel)}>
            Carrusel
          </button>
          {categorias.map((cat) => (
            <button key={cat.id} onClick={() => setSeccion(cat.id)} className={claseBoton(seccion === cat.id)}>
              {cat.nombre}
            </button>
          ))}
          <button onClick={() => setSeccion('cuenta')} className={claseBoton(seccion === 'cuenta')}>
            Seguridad
          </button>
        </nav>

        {/* Barra lateral: solo en pantallas medianas para arriba */}
        <aside className="hidden md:block w-56 border-r border-line p-4 shrink-0">
          <p className="text-xs uppercase tracking-widest text-ink/50 mb-3">Galerías</p>
          <nav className="space-y-1">
            <button
              onClick={() => setSeccion('carrusel')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                esCarrusel ? 'bg-gold text-white' : 'text-ink/80 hover:bg-line/40'
              }`}
            >
              Carrusel principal
              <span className={esCarrusel ? 'text-white/80' : 'text-ink/40'}>{carrusel.length}</span>
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSeccion(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  seccion === cat.id ? 'bg-gold text-white' : 'text-ink/80 hover:bg-line/40'
                }`}
              >
                {cat.nombre}
                <span className={seccion === cat.id ? 'text-white/80' : 'text-ink/40'}>{cat.imagenes.length}</span>
              </button>
            ))}
            <button
              onClick={() => setSeccion('cuenta')}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm text-left transition-colors mt-3 ${
                seccion === 'cuenta' ? 'bg-gold text-white' : 'text-ink/80 hover:bg-line/40'
              }`}
            >
              Seguridad
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-8">
          {seccion === 'cuenta' ? (
            <CambiarPassword />
          ) : (
            <>
              <p className="uppercase tracking-widest text-xs text-gold mb-2">
                {esCarrusel ? 'Página de inicio' : 'Categoría'}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink mb-6">
                {esCarrusel ? 'Carrusel principal' : categoriaActual?.nombre}
              </h1>

              <form onSubmit={handleUpload} className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png, image/webp"
                  required
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-white file:cursor-pointer hover:file:bg-gold-dark file:transition-colors"
                />
                <button
                  type="submit"
                  disabled={subiendo}
                  className="bg-gold text-white px-5 py-2 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-60 sm:w-auto w-full"
                >
                  {subiendo ? 'Subiendo...' : 'Subir imagen'}
                </button>
              </form>
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

              {itemsActuales.length === 0 ? (
                <p className="text-ink/50 text-sm">Todavía no hay imágenes aquí.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {itemsActuales.map((img) => (
                    <div key={img.id} className="rounded-xl overflow-hidden border border-line">
                      <img src={img.url} alt="" className="w-full aspect-[4/3] object-cover" />
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="w-full text-xs text-red-600 hover:bg-red-50 py-2 transition-colors"
                      >
                        Borrar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}