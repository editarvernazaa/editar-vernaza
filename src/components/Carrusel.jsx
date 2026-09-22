'use client';

import { useState, useEffect } from 'react';

export default function Carrusel({ items, fill = false }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndice((i) => (i === items.length - 1 ? 0 : i + 1));
    }, 4000);

    return () => clearInterval(intervalo);
  }, [items.length]);

  if (items.length === 0) return null;

  function anterior() {
    setIndice((i) => (i === 0 ? items.length - 1 : i - 1));
  }

  function siguiente() {
    setIndice((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  if (fill) {
    return (
      <>
        <img
          src={items[indice].url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {items.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === indice ? 'bg-gold' : 'bg-white/70'}`}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
        }}
      >
        <img src={items[indice].url} alt="" className="w-full aspect-[4/3] object-cover" />
      </div>
      {items.length > 1 && (
        <>
          <button onClick={anterior} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream/90 text-ink hover:bg-gold hover:text-cream transition-colors flex items-center justify-center">‹</button>
          <button onClick={siguiente} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream/90 text-ink hover:bg-gold hover:text-cream transition-colors flex items-center justify-center">›</button>
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIndice(i)} className={`w-2 h-2 rounded-full transition-colors ${i === indice ? 'bg-gold' : 'bg-line'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}