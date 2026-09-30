import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import Carrusel from '@/components/Carrusel';
import { categoriaIconos, iconoPorDefecto } from '@/lib/categoriaIconos';
import { Gem, Award, HeartHandshake, Truck } from 'lucide-react';

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
    include: { imagenes: { take: 1, orderBy: { id: 'asc' } } },
  });

  const carrusel = await prisma.carrusel.findMany({ orderBy: { id: 'asc' } });
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-rose/10 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-10 items-center px-8 py-10 max-w-7xl mx-auto">
          <div>
            <p className="uppercase tracking-widest text-xs text-gold mb-3">
              Diseños que cuentan tu historia
            </p>
            <h1 className="font-display text-5xl text-ink leading-tight">
              Invitaciones que hacen tus momentos
              <span className="font-script text-6xl text-gold block mt-2">inolvidables</span>
            </h1>
            <div className="flex items-center gap-3 mt-5 mb-5">
              <span className="w-10 h-px bg-gold" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <p className="text-ink/70 max-w-md">
              Creamos invitaciones y detalles personalizados con materiales de la más alta calidad para cada ocasión especial.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 no-underline bg-gold text-cream px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              Solicitar cotización
            </a>
          </div>

          <div className="relative">
            <Carrusel items={carrusel} />
          </div>
        </div>
      </section>

      <section className="px-8 py-14 max-w-7xl mx-auto">
        <p className="uppercase tracking-widest text-xs text-gold text-center mb-2">
          Nuestras colecciones
        </p>
        <h2 className="font-display text-3xl text-ink text-center mb-10">
          Encuentra el diseño perfecto para tu evento
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categorias.map((cat) => {
            const Icono = categoriaIconos[cat.slug] ?? iconoPorDefecto;
            const foto = cat.imagenes[0]?.url;

            return (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="group block no-underline">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  {foto ? (
                    <Image
                      src={foto}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-rose/20" />
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <Icono size={16} className="text-ink shrink-0" />
                  <div className="text-center">
                    <p className="font-display text-base text-ink">{cat.nombre}</p>
                    <p className="text-xs text-ink/60 group-hover:text-gold transition-colors">
                      Ver diseños →
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-8 py-14 max-w-7xl mx-auto">
        <p className="uppercase tracking-widest text-xs text-gold text-center mb-2">
          ¿Por qué elegirnos?
        </p>
        <h2 className="font-display text-3xl text-ink text-center mb-12">
          Calidad que se nota en cada detalle
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icono: Gem, titulo: 'Diseños Personalizados', texto: 'Creamos diseños exclusivos adaptados a tu estilo y la temática de tu evento.' },
            { icono: Award, titulo: 'Materiales Premium', texto: 'Utilizamos materiales de la más alta calidad para resultados excepcionales.' },
            { icono: HeartHandshake, titulo: 'Atención Personalizada', texto: 'Te acompañamos en todo el proceso para que tu experiencia sea perfecta.' },
            { icono: Truck, titulo: 'Entrega Puntual', texto: 'Cumplimos con los tiempos acordados para mantener a nuestros clientes satisfechos.' },
          ].map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="text-center">
              <Icono className="mx-auto text-gold mb-3" size={28} strokeWidth={1.5} />
              <p className="font-display text-sm uppercase tracking-wide text-ink mb-2">{titulo}</p>
              <p className="text-xs text-ink/60">{texto}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}