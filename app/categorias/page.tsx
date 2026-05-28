import Link from 'next/link'
import { getAllCategorias, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Categorías — Leopoldo Solís',
}

export default async function CategoriasPage() {
  const categorias = await getAllCategorias()

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-16">
        <p className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
          Explorar
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">Categorías</h1>
        <p className="text-lg text-ink/60 mt-6 max-w-2xl">
          Descubre el contenido organizado por temas.
        </p>
      </div>

      {categorias.length === 0 ? (
        <p className="text-ink/50 text-lg">No hay categorías disponibles aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((cat) => {
            const nombre = getMetafieldValue(cat.metadata?.nombre) || cat.title
            const descripcion = getMetafieldValue(cat.metadata?.descripcion)
            const color = getMetafieldValue(cat.metadata?.color) || '#0a0a0a'

            return (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="group block p-8 rounded-2xl border-2 transition-all hover:shadow-xl animate-slide-up"
                style={{
                  borderColor: `${color}30`,
                  backgroundColor: `${color}08`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
                <h2 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {nombre}
                </h2>
                {descripcion && (
                  <p className="text-ink/60 text-sm">{descripcion}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}