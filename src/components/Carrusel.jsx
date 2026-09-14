'use client';

import { useState } from 'react';

export default function Carrusel({ items }) {
  const [indice, setIndice] = useState(0);

  if (items.length === 0) return null;

  function anterior() {
    setIndice((i) => (i === 0 ? items.length - 1 : i - 1));
  }

  function siguiente() {
    setIndice((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      <img
        src={items[indice].url}
        alt=""
        style={{ width: '100%', borderRadius: '8px', display: 'block' }}
      />
      {items.length > 1 && (
        <>
          <button
            onClick={anterior}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            ‹
          </button>
          <button
            onClick={siguiente}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}