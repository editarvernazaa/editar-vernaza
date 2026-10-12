'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SIZES_ZOOM = '(max-width: 672px) 100vw, 672px';

export default function GaleriaCategoria({ imagenes, nombre }) {
  const [indice, setIndice] = useState(null);
  const [toqueInicio, setToqueInicio] = useState(null);

  const total = imagenes.length;
  const abierta = indice !== null;

  function anterior() {
    setIndice((i) => (i === 0 ? total - 1 : i - 1));
  }

  function siguiente() {
    setIndice((i) => (i === total - 1 ? 0 : i + 1));
  }

  useEffect(() => {
    if (!abierta) return;

    function onKeyDown(e) {
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'Escape') setIndice(null);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [abierta, total]);

  function onTouchEnd(e) {
    if (toqueInicio === null) return;
    const diferencia = e.changedTouches[0].clientX - toqueInicio;
    if (diferencia > 50) anterior();
    if (diferencia < -50) siguiente();
    setToqueInicio(null);
  }

  if (total === 0) {
    return <p className="text-ink/60">Todavía no hay imágenes en esta categoría.</p>;
  }

  const idxAnterior = abierta ? (indice === 0 ? total - 1 : indice - 1) : null;
  const idxSiguiente = abierta ? (indice === total - 1 ? 0 : indice + 1) : null;
  const vecinas = abierta && total > 1 ? [...new Set([idxAnterior, idxSiguiente])] : [];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagenes.map((img, i) => (
          <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-line">
            <Image
              src={img.url}
              alt={nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onClick={() => setIndice(i)}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              className="proteger-imagen object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>

      {abierta && (
        <div
          onClick={() => setIndice(null)}
          onTouchStart={(e) => setToqueInicio(e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 bg-ink/85 flex items-center justify-center z-[1000] cursor-zoom-out px-4"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndice(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream/90 text-ink hover:bg-gold hover:text-white transition-colors flex items-center justify-center"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 text-ink hover:bg-gold hover:text-white transition-colors flex items-center justify-center z-10"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <div
            className="relative w-full max-w-2xl aspect-square"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={imagenes[indice].url}
              alt={nombre}
              fill
              sizes={SIZES_ZOOM}
              draggable={false}
              className="proteger-imagen object-contain rounded-lg"
            />
          </div>

          <div className="hidden relative" aria-hidden="true">
            {vecinas.map((n) => (
              <Image
                key={imagenes[n].id}
                src={imagenes[n].url}
                alt=""
                fill
                sizes={SIZES_ZOOM}
                loading="eager"
              />
            ))}
          </div>

          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                siguiente();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/90 text-ink hover:bg-gold hover:text-white transition-colors flex items-center justify-center z-10"
              aria-label="Foto siguiente"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-cream/80">
            {indice + 1} / {total}
          </p>
        </div>
      )}
    </>
  );
}