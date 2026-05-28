import { getAllProyectos } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const metadata = {
  title: 'Proyectos — Leopoldo Solís',
}

export default async function ProyectosPage() {
  const proyectos = await getAllProyectos()

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
      <div className="mb-16">
        <p className="text-sm font-mono uppercase tracking-widest text-accent mb-4">
          Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Proyectos
        </h1>
        <p className="text-lg text-ink/60 mt-6 max-w-2xl">
          Una colección de trabajos que reflejan mi proceso creativo y pasión por el diseño.
        </p>
      </div>

      {proyectos.length === 0 ? (
        <p className="text-ink/50 text-lg">No hay proyectos disponibles aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      )}
    </div>
  )
}