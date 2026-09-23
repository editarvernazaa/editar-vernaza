import Image from 'next/image';

export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL;

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-line gap-2">
      <Image src="/logo.png" alt="Editar Vernaza" width={48} height={48} className="h-9 sm:h-12 w-auto" />

      <div className="flex items-center gap-2 sm:gap-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink hover:text-gold transition-colors no-underline text-sm sm:text-base"
        >
          <span className="sm:hidden">📍</span>
          <span className="hidden sm:inline">📍 Ubicación</span>
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline bg-gold text-cream px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gold-dark transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}