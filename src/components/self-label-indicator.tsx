/**
 * SelfLabelIndicator - Content warning for posts with self-labels.
 * Implements blur/reveal pattern per AT Protocol self-labeling.
 * @see specs/prd-web.md Section M7 (Self-label indicators)
 * @see decisions/content-moderation.md
 */

'use client'

import { useState, type ReactNode } from 'react'
import { Eye, EyeSlash, Warning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SelfLabelIndicatorProps {
  labels: string[]
  children?: ReactNode
  className?: string
}

export function SelfLabelIndicator({ labels, children, className }: SelfLabelIndicatorProps) {
  const [revealed, setRevealed] = useState(false)

  if (labels.length === 0) return null

  return (
    <div className={cn('rounded-md border border-amber-500/30 bg-amber-500/5 p-3', className)}>
      <div className="flex items-center gap-2">
        <Warning size={16} className="shrink-0 text-amber-500" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">
          Content warning:{' '}
          {labels.map((label, i) => (
            <span key={label}>
              {i > 0 && ', '}
              <span className="font-semibold">{label}</span>
            </span>
          ))}
        </p>
      </div>

      {children && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            aria-label={revealed ? 'Hide content' : 'Show content'}
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
              'text-muted-foreground hover:bg-accent hover:text-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {revealed ? <EyeSlash size={14} /> : <Eye size={14} />}
            {revealed ? 'Hide content' : 'Show content'}
          </button>
          {revealed && <div className="mt-2">{children}</div>}
        </div>
      )}
    </div>
  )
}
