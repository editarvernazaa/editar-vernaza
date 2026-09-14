import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Carrusel from '@/components/Carrusel';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Editar Vernaza | Invitaciones para eventos sociales en Quito',
  description: 'Invitaciones personalizadas para matrimonios, quince años, bautizos, comuniones, graduaciones y más. Diseños exclusivos hechos en Quito, Ecuador.',
  openGraph: {
    title: 'Editar Vernaza | Invitaciones para eventos sociales',
    description: 'Invitaciones personalizadas para cada ocasión especial.',
  },
};

export default async function Home() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { id: 'asc' },
  });

  const carrusel = await prisma.carrusel.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <main style={{ padding: '2rem' }}>
      <Carrusel items={carrusel} />

      <h1 style={{ marginTop: '2rem' }}>Editar Vernaza</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {cat.nombre}
          </Link>
        ))}
      </div>
    </main>
  );
}