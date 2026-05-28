// app/proyectos/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProyectoBySlug, getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const proyecto = await getProyectoBySlug(slug)

  if (!proyecto) {
    notFound()
  }

  const titulo = getMetafieldValue(proyecto.metadata?.titulo) || proyecto.title
  const descripcion = getMetafieldValue(proyecto.metadata?.descripcion)
  const cliente = getMetafieldValue(proyecto.metadata?.cliente)
  const ano = getMetafieldValue(proyecto.metadata?.ano)
  const urlProyecto = getMetafieldValue(proyecto.metadata?.url_proyecto)
  const tecnologias = getMetafieldValue(proyecto.metadata?.tecnologias)
  const imagen = proyecto.metadata?.imagen_principal
  const galeria = proyecto.metadata?.galeria
  const categoria = proyecto.metadata?.categoria

  return (
    <article className="animate-fade-in">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <Link
          href="/proyectos"
          className="text-sm text-ink/60 hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Volver a proyectos
        </Link>

        <div className="mb-12">
          {categoria && (
            <div className="mb-4">
              <CategoryBadge categoria={categoria} />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-balance">
            {titulo}
          </h1>
          {descripcion && (
            <p className="text-xl text-ink/60 mt-6 max-w-3xl">{descripcion}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 pb-12 border-b border-ink/10 text-sm">
          {cliente && (
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-2">Cliente</p>
              <p className="font-semibold">{cliente}</p>
            </div>
          )}
          {ano && (
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-2">Año</p>
              <p className="font-semibold">{ano}</p>
            </div>
          )}
          {tecnologias && (
            <div>
              <p className="font-mono uppercase tracking-widest text-ink/40 mb-2">Tecnologías</p>
              <p className="font-semibold">{tecnologias}</p>
            </div>
          )}
        </div>
      </div>

      {imagen && (
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={`${imagen.imgix_url}?w=2400&h=1350&fit=crop&auto=format,compress`}
              alt={titulo}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {proyecto.content && (
        <div className="max-w-3xl mx-auto px-6 py-12 prose-custom">
          <div dangerouslySetInnerHTML={{ __html: proyecto.content }} />
        </div>
      )}

      {galeria && galeria.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">Galería</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {galeria.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5">
                <img
                  src={`${img.imgix_url}?w=1600&h=1200&fit=crop&auto=format,compress`}
                  alt={`${titulo} - imagen ${idx + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {urlProyecto && (
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <a
            href={urlProyecto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-4 rounded-full font-medium hover:bg-accent transition-colors"
          >
            Visitar proyecto →
          </a>
        </div>
      )}
    </article>
  )
}