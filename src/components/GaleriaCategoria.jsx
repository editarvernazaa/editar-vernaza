'use client';

import { useState } from 'react';

export default function GaleriaCategoria({ imagenes, nombre }) {
  const [imagenAbierta, setImagenAbierta] = useState(null);

  if (imagenes.length === 0) {
    return <p>Todavía no hay imágenes en esta categoría.</p>;
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        {imagenes.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={nombre}
            onClick={() => setImagenAbierta(img.url)}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            style={{ width: '100%', borderRadius: '8px', cursor: 'zoom-in' }}
          />
        ))}
      </div>

      {imagenAbierta && (
        <div
          onClick={() => setImagenAbierta(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={imagenAbierta}
            alt={nombre}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px' }}
          />
        </div>
      )}
    </>
  );
}