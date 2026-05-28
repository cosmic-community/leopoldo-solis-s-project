// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const titulo = getMetafieldValue(post.metadata?.titulo) || post.title
  const extracto = getMetafieldValue(post.metadata?.extracto)
  const contenido = getMetafieldValue(post.metadata?.contenido)
  const fecha = getMetafieldValue(post.metadata?.fecha_publicacion)
  const imagen = post.metadata?.imagen_destacada
  const categoria = post.metadata?.categoria

  return (
    <article className="animate-fade-in">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <Link
          href="/blog"
          className="text-sm text-ink/60 hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Volver al blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6 text-sm text-ink/50">
            {categoria && <CategoryBadge categoria={categoria} />}
            {fecha && (
              <time className="font-mono">
                {new Date(fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-balance">
            {titulo}
          </h1>
          {extracto && (
            <p className="text-xl text-ink/60 mt-6 leading-relaxed">{extracto}</p>
          )}
        </div>
      </div>

      {imagen && (
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={`${imagen.imgix_url}?w=2000&h=1125&fit=crop&auto=format,compress`}
              alt={titulo}
              width={1000}
              height={563}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {contenido && (
        <div className="max-w-3xl mx-auto px-6 py-12 prose-custom text-lg">
          <div dangerouslySetInnerHTML={{ __html: contenido }} />
        </div>
      )}
    </article>
  )
}