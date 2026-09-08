export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL;

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #eee',
      }}
    >
      <span style={{ fontWeight: 'bold' }}>Editar Vernaza</span>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          📍 Ubicación
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            background: '#25D366',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
          }}
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}