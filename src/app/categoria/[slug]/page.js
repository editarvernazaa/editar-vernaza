import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

      {categoria.imagenes.length === 0 ? (
        <p>Todavía no hay imágenes en esta categoría.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '1.5rem',
          }}
        >
          {categoria.imagenes.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={categoria.nombre}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          ))}
        </div>
      )}
    </main>
  );
}