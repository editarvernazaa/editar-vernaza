import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GaleriaCategoria from '@/components/GaleriaCategoria';

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

  return (
    <main style={{ padding: '2rem' }}>
      <Link href="/">← Volver al inicio</Link>
      <h1>{categoria.nombre}</h1>

      <GaleriaCategoria imagenes={categoria.imagenes} nombre={categoria.nombre} />
    </main>
  );
}