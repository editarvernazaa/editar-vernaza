import { prisma } from '@/lib/prisma';
import { put, del } from '@vercel/blob';
import { verificarAdmin } from '@/lib/verificarAdmin';


export async function POST(request) {
  const esAdmin = await verificarAdmin();
  if (!esAdmin) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categoriaId = searchParams.get('categoriaId');
  const filename = searchParams.get('filename');

  if (!categoriaId || !filename) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  const blob = await put(filename, request.body, {
    access: 'public',
  });

  const imagen = await prisma.imagen.create({
    data: {
      url: blob.url,
      categoriaId: Number(categoriaId),
    },
  });

  return Response.json(imagen);
}

export async function DELETE(request) {
  const esAdmin = await verificarAdmin();
  if (!esAdmin) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const imagen = await prisma.imagen.findUnique({ where: { id: Number(id) } });
  if (!imagen) {
    return Response.json({ error: 'No encontrada' }, { status: 404 });
  }

  await del(imagen.url);
  await prisma.imagen.delete({ where: { id: Number(id) } });

  return Response.json({ ok: true });
}