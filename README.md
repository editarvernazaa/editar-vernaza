# Editar Vernaza — Página web

Página web para Editar Vernaza (invitaciones y detalles para eventos sociales), con panel de administrador para gestionar las categorías, imágenes y el carrusel del inicio.

## Stack

- **Frontend + Backend**: Next.js (App Router)
- **Base de datos**: PostgreSQL, alojada en [Neon](https://neon.tech)
- **ORM**: Prisma (con `@prisma/adapter-pg`, sin motor binario)
- **Almacenamiento de imágenes**: Vercel Blob
- **Autenticación**: JWT propio (login del admin), con `bcryptjs` para contraseñas
- **Estilos**: Tailwind CSS
- **Despliegue**: Vercel

## Correr el proyecto en local

1. Instalar dependencias:

```
   npm install
```

2. Crear un archivo `.env` en la raíz con estas variables (pide los valores reales a quien administre el proyecto):

```
   DATABASE_URL=
   JWT_SECRET=
   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   NEXT_PUBLIC_WHATSAPP_NUMBER=
   NEXT_PUBLIC_MAPS_URL=
   BLOB_READ_WRITE_TOKEN=
```

3. Generar el cliente de Prisma y crear las tablas (si es la primera vez, contra una base local vacía):

```
   npx prisma generate
   npx prisma migrate dev
```

4. Correr el proyecto:

```
   npm run dev
```

## Crear o resetear el usuario administrador

Con `ADMIN_EMAIL` y `ADMIN_PASSWORD` puestos en el `.env`, correr:

```
npx tsx scripts/create-admin.ts
```

## Despliegue

El proyecto se despliega automáticamente en Vercel con cada `git push` a la rama `main`. Las variables de entorno de producción se configuran en Vercel → Settings → Environment Variables (deben coincidir con las del `.env` local, pero apuntando a la base de datos de Neon en vez de una local).

## Estructura del proyecto

- `/categoria/[slug]` — página pública de cada categoría, con galería de imágenes
- `/admin` — login del administrador
- `/admin/panel` — panel para subir/borrar imágenes del carrusel y las categorías, y cambiar la contraseña