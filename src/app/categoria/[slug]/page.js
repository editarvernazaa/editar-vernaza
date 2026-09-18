import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GaleriaCategoria from '@/components/GaleriaCategoria';
import { categoriaFrases } from '@/lib/categoriaFrases';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoria = await prisma.categoria.findUnique({ where: { slug } });

  if (!categoria) {
    return { title: 'Categoría no encontrada' };
  }

  return {
    title: `${categoria.nombre} | Editar Vernaza`,
    description: `Invitaciones de ${categoria.nombre} personalizadas, hechas a mano en Quito, Ecuador.`,
  };
}

export default async function CategoriaPage({ params }) {
  const { slug } = await params;

  const categoria = await prisma.categoria.findUnique({
    where: { slug },
    include: { imagenes: true },
  });

  if (!categoria) {
    notFound();
  }

  const frase = categoriaFrases[categoria.slug] ?? 'diseños hechos para tu ocasión especial';

  return (
    <main className="px-8 py-10 max-w-7xl mx-auto">
      <p className="text-sm text-ink/60 mb-6">
        <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
        {' / '}
        <span className="text-ink">{categoria.nombre}</span>
      </p>

      <p className="uppercase tracking-widest text-xs text-gold mb-3">
        Colección {categoria.nombre}
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
        <span className="font-script text-5xl md:text-6xl text-ink">{frase}</span>
      </h1>
      <div className="flex items-center gap-3 mt-5 mb-10">
        <span className="w-10 h-px bg-gold" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      </div>

      <GaleriaCategoria imagenes={categoria.imagenes} nombre={categoria.nombre} />
    </main>
  );
}