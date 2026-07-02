import type { ReactNode } from 'react'

interface PageHeaderProps {
  kicker: string
  title: string
  children?: ReactNode
}

export default function PageHeader({ kicker, title, children }: PageHeaderProps) {
  return (
    <div className="py-16">
      <div className="rise-in">
        <span className="island-kicker">{kicker}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  )
}
