export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-line">
      <div className="flex flex-col"> 
        <img src="/logo.png" alt="Editar Vernaza" className="h-12 mt-3" />
      </div>

      <div className="flex items-center gap-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink hover:text-gold transition-colors no-underline"
        >
          📍 Ubicación
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline bg-gold text-cream px-4 py-2 rounded-full hover:bg-gold-dark transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}