import Link from 'next/link'
import type { Proyecto } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  const titulo = getMetafieldValue(proyecto.metadata?.titulo) || proyecto.title
  const descripcion = getMetafieldValue(proyecto.metadata?.descripcion)
  const cliente = getMetafieldValue(proyecto.metadata?.cliente)
  const ano = getMetafieldValue(proyecto.metadata?.ano)
  const imagen = proyecto.metadata?.imagen_principal

  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      className="group block animate-slide-up"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5 mb-4">
        {imagen ? (
          <img
            src={`${imagen.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
            alt={titulo}
            width={600}
            height={450}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/30 text-6xl">
            🎨
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
            {titulo}
          </h3>
          {descripcion && (
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">{descripcion}</p>
          )}
        </div>
        <div className="text-right shrink-0 text-sm text-ink/50">
          {cliente && <div>{cliente}</div>}
          {ano && <div className="font-mono">{ano}</div>}
        </div>
      </div>
    </Link>
  )
}