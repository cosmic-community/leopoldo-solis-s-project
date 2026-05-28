import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

export default function PostCard({ post }: { post: Post }) {
  const titulo = getMetafieldValue(post.metadata?.titulo) || post.title
  const extracto = getMetafieldValue(post.metadata?.extracto)
  const fecha = getMetafieldValue(post.metadata?.fecha_publicacion)
  const imagen = post.metadata?.imagen_destacada
  const categoria = post.metadata?.categoria

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-ink/5 hover:border-ink/20 transition-all hover:shadow-xl animate-slide-up"
    >
      {imagen && (
        <div className="aspect-[16/9] overflow-hidden bg-ink/5">
          <img
            src={`${imagen.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
            alt={titulo}
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-ink/50">
          {categoria && <CategoryBadge categoria={categoria} />}
          {fecha && (
            <time className="font-mono">
              {new Date(fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors mb-2">
          {titulo}
        </h3>
        {extracto && (
          <p className="text-ink/60 text-sm line-clamp-3">{extracto}</p>
        )}
      </div>
    </Link>
  )
}