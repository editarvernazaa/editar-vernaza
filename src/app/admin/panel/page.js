import { prisma } from '@/lib/prisma';
import PanelAdmin from '@/components/PanelAdmin';

export const dynamic = 'force-dynamic';

export default async function PanelPage() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { id: 'asc' },
    include: { imagenes: { orderBy: { id: 'desc' } } },
  });

  const carrusel = await prisma.carrusel.findMany({ orderBy: { id: 'desc' } });

  return <PanelAdmin categorias={categorias} carrusel={carrusel} />;
}