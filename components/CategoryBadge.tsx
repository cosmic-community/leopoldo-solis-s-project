import Link from 'next/link'
import type { Categoria } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryBadge({ categoria }: { categoria: Categoria }) {
  const nombre = getMetafieldValue(categoria.metadata?.nombre) || categoria.title
  const color = getMetafieldValue(categoria.metadata?.color) || '#0a0a0a'

  return (
    <Link
      href={`/categorias/${categoria.slug}`}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-transform hover:scale-105"
      style={{
        backgroundColor: `${color}15`,
        color: color,
        borderColor: `${color}40`,
      }}
    >
      {nombre}
    </Link>
  )
}