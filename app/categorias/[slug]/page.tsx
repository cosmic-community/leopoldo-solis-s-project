// app/categorias/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoriaBySlug,
  getAllPosts,
  getAllProyectos,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categoria = await getCategoriaBySlug(slug)

  if (!categoria) {
    notFound()
  }

  const [allPosts, allProyectos] = await Promise.all([
    getAllPosts(),
    getAllProyectos(),
  ])

  const filteredPosts = allPosts.filter(
    (post) => post.metadata?.categoria?.id === categoria.id
  )
  const filteredProyectos = allProyectos.filter(
    (proy) => proy.metadata?.categoria?.id === categoria.id
  )

  const nombre = getMetafieldValue(categoria.metadata?.nombre) || categoria.title
  const descripcion = getMetafieldValue(categoria.metadata?.descripcion)
  const color = getMetafieldValue(categoria.metadata?.color) || '#0a0a0a'

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <Link
          href="/categorias"
          className="text-sm text-ink/60 hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Todas las categorías
        </Link>

        <div className="mb-16 flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <div>
            <p className="text-sm font-mono uppercase tracking-widest text-ink/40 mb-2">
              Categoría
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              {nombre}
            </h1>
            {descripcion && (
              <p className="text-lg text-ink/60 mt-4 max-w-2xl">{descripcion}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredProyectos.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Proyectos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProyectos.map((proy) => (
                <ProjectCard key={proy.id} proyecto={proy} />
              ))}
            </div>
          </section>
        )}

        {filteredPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {filteredPosts.length === 0 && filteredProyectos.length === 0 && (
          <p className="text-ink/50 text-lg">
            No hay contenido en esta categoría aún.
          </p>
        )}
      </div>
    </div>
  )
}