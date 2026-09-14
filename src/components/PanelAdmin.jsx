'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PanelAdmin({ categorias }) {
  const [categoriaId, setCategoriaId] = useState(categorias[0]?.id ?? '');
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const categoriaActual = categorias.find((c) => c.id === Number(categoriaId));

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

    const res = await fetch(
      `/api/imagenes?categoriaId=${categoriaId}&filename=${encodeURIComponent(file.name)}`,
      { method: 'POST', body: file }
    );

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

    const res = await fetch(`/api/imagenes?id=${id}`, { method: 'DELETE' });

    if (res.ok) {
      router.refresh();
    } else {
      setError('No se pudo borrar la imagen');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de administrador</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <label>Categoría: </label>
        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleUpload} style={{ marginBottom: '2rem' }}>
        <input type="file" name="file" accept="image/jpeg, image/png, image/webp" required />
        <button type="submit" disabled={subiendo}>
          {subiendo ? 'Subiendo...' : 'Subir imagen'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <h2>Imágenes de {categoriaActual?.nombre}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {categoriaActual?.imagenes.map((img) => (
          <div key={img.id}>
            <img src={img.url} alt="" style={{ width: '100%', borderRadius: '8px' }} />
            <button onClick={() => handleDelete(img.id)} style={{ marginTop: '4px' }}>
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}