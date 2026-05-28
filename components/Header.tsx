import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight hover:text-accent transition-colors">
          Leopoldo Solís
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/proyectos" className="hover:text-accent transition-colors">
            Proyectos
          </Link>
          <Link href="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/categorias" className="hover:text-accent transition-colors">
            Categorías
          </Link>
        </nav>
      </div>
    </header>
  )
}