import type { ReactNode } from 'react'
import { Label } from '../ui/label'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export default function FormField({
  label,
  required = false,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label
        className={`mb-1.5 block ${required ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ''}`}
      >
        {label}
      </Label>
      {children}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  )
}
