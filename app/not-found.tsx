import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center animate-fade-in">
      <p className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
        Error 404
      </p>
      <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
        Página no encontrada
      </h1>
      <p className="text-lg text-ink/60 mb-10 max-w-xl mx-auto">
        Parece que la página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
      >
        ← Volver al inicio
      </Link>
    </div>
  )
}