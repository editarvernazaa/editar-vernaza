'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GaleriaCategoria({ imagenes, nombre }) {
  const [imagenAbierta, setImagenAbierta] = useState(null);

  if (imagenes.length === 0) {
    return <p className="text-ink/60">Todavía no hay imágenes en esta categoría.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagenes.map((img) => (
          <div key={img.id} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-line">
            <Image
              src={img.url}
              alt={nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onClick={() => setImagenAbierta(img.url)}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              className="object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>

      {imagenAbierta && (
        <div
          onClick={() => setImagenAbierta(null)}
          className="fixed inset-0 bg-ink/85 flex items-center justify-center z-[1000] cursor-zoom-out"
        >
          <img
            src={imagenAbierta}
            alt={nombre}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </>
  );
}