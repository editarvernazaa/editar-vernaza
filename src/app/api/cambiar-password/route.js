import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { obtenerAdminId } from '@/lib/auth';

export async function POST(request) {
  const adminId = await obtenerAdminId();
  if (!adminId) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { passwordActual, passwordNueva } = await request.json();

  if (!passwordActual || !passwordNueva) {
    return Response.json({ error: 'Faltan datos' }, { status: 400 });
  }

  if (passwordNueva.length < 8) {
    return Response.json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    return Response.json({ error: 'No encontrado' }, { status: 404 });
  }

  const valido = await bcrypt.compare(passwordActual, admin.passwordHash);
  if (!valido) {
    return Response.json({ error: 'La contraseña actual no es correcta' }, { status: 401 });
  }

  const nuevoHash = await bcrypt.hash(passwordNueva, 10);
  await prisma.admin.update({
    where: { id: adminId },
    data: { passwordHash: nuevoHash },
  });

  return Response.json({ ok: true });
}