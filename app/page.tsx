import Link from 'next/link'
import { getAllProyectos, getAllPosts } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'
import PostCard from '@/components/PostCard'

export default async function HomePage() {
  const [proyectos, posts] = await Promise.all([
    getAllProyectos(),
    getAllPosts(),
  ])

  const featuredProjects = proyectos.slice(0, 3)
  const latestPosts = posts.slice(0, 3)

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-4xl">
          <p className="text-sm font-mono uppercase tracking-widest text-accent mb-6">
            Portfolio & Blog
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-balance">
            Diseñando ideas <br />
            <span className="text-accent">que importan</span>.
          </h1>
          <p className="text-lg md:text-xl text-ink/60 mt-8 max-w-2xl leading-relaxed">
            Hola, soy Leopoldo Solís. Aquí comparto mis proyectos creativos,
            pensamientos en el blog y todo lo que me apasiona del diseño.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors"
            >
              Ver proyectos →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 rounded-full font-medium hover:border-ink transition-colors"
            >
              Leer el blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-ink/10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-ink/50 mb-2">
                Trabajo seleccionado
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Proyectos destacados
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="hidden md:inline-flex text-sm font-medium hover:text-accent transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proyecto) => (
              <ProjectCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-ink/10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-ink/50 mb-2">
                Desde el blog
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Últimos posts
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex text-sm font-medium hover:text-accent transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}