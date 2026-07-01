import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page-wrap py-16">
      <div className="island-shell rounded-2xl p-12 text-center">
        <h1 className="display-title text-forest text-5xl font-bold tracking-tight">
          Localive
        </h1>
        <p className="text-brown mt-4 text-lg">
          Edit <code>src/routes/index.tsx</code> to get started.
        </p>
      </div>
    </div>
  )
}
