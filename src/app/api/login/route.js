import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  const { email, password } = await request.json();

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  const valido = await bcrypt.compare(password, admin.passwordHash);

  if (!valido) {
    return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  const token = await new SignJWT({ adminId: admin.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  });

  return Response.json({ ok: true });
}