import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'Blog — Leopoldo Solís',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-16">
        <p className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
          Pensamientos
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">Blog</h1>
        <p className="text-lg text-ink/60 mt-6 max-w-2xl">
          Reflexiones, ideas y artículos sobre diseño, creatividad y todo lo que me inspira.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink/50 text-lg">No hay posts publicados aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}