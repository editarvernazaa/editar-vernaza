import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Footer() {
  const categorias = await prisma.categoria.findMany({ orderBy: { id: 'asc' } });
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL;
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-20 px-8 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-xl text-ink">
            Editar <span className="font-script text-2xl text-gold">Vernaza</span>
          </span>
          <p className="text-xs text-ink/60 mt-2 max-w-[220px]">
            Invitaciones y detalles para eventos sociales.
          </p>
        </div>


        <div>
          <p className="font-display text-sm uppercase tracking-wide text-ink mb-4">Enlaces</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ink/70">
            {categorias.map((cat) => (
              <li key={cat.id}>
                <Link href={`/categoria/${cat.slug}`} className="hover:text-gold transition-colors">
                  {cat.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-wide text-ink mb-4">Horarios</p>
          <p className="text-sm text-ink/70">Lunes a Viernes</p>
          <p className="text-sm text-ink/70 mb-3">09:00am - 17:30pm</p>
          <p className="text-sm text-ink/70">Sábados</p>
          <p className="text-sm text-ink/70">09:00am - 12:30pm</p>
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-wide text-ink mb-4">Contáctanos</p>
          <p className="text-sm text-ink/70">Telf. 02 280 1761</p>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink/70 hover:text-gold transition-colors">
            WhatsApp
          </a>
          <a href="mailto:alexisvernaza@yahoo.com" className="block text-sm text-ink/70 hover:text-gold transition-colors">
            alexisvernaza@yahoo.com
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink/70 hover:text-gold transition-colors mt-2">
            Av. Jose Ordóñez Oe3-984 y Octavio Cordero, Quito
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-ink/50 mt-10">
        © {anio} Editar Vernaza. Todos los derechos reservados.
      </p>
    </footer>
  );
}