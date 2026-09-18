import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';
import { verificarAdmin } from '@/lib/auth';

export async function POST(request) {
  const esAdmin = await verificarAdmin();
  if (!esAdmin) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const blob = await put(filename, request.body, { access: 'public', addRandomSuffix: true });

  const item = await prisma.carrusel.create({
    data: { url: blob.url },
  });

  return Response.json(item);
}

export async function DELETE(request) {
  const esAdmin = await verificarAdmin();
  if (!esAdmin) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const item = await prisma.carrusel.findUnique({ where: { id: Number(id) } });
  if (!item) {
    return Response.json({ error: 'No encontrado' }, { status: 404 });
  }

  await del(item.url);
  await prisma.carrusel.delete({ where: { id: Number(id) } });

  return Response.json({ ok: true });
}