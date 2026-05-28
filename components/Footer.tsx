export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} Leopoldo Solís. Todos los derechos reservados.
        </p>
        <p className="text-sm opacity-70">
          Hecho con creatividad y café ☕
        </p>
      </div>
    </footer>
  )
}