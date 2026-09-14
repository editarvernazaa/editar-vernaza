import { prisma } from '@/lib/prisma';
import PanelAdmin from '@/components/PanelAdmin';
import CarruselAdmin from '@/components/CarruselAdmin';

export const dynamic = 'force-dynamic';

export default async function PanelPage() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { id: 'asc' },
    include: { imagenes: true },
  });

  const carrusel = await prisma.carrusel.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <>
      <PanelAdmin categorias={categorias} />
      <CarruselAdmin items={carrusel} />
    </>
  );
}