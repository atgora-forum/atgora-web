/**
 * ReactionBar - Displays reaction buttons with counts and toggle state.
 * Uses aria-pressed for toggle buttons and role="group" for the container.
 * @see specs/prd-web.md Section M7 (Reactions + Moderation UI)
 */

'use client'

import { cn } from '@/lib/utils'

interface ReactionData {
  type: string
  count: number
  reacted: boolean
}

interface ReactionBarProps {
  reactions: ReactionData[]
  onToggle: (type: string) => void
  disabled?: boolean
  className?: string
}

export function ReactionBar({
  reactions,
  onToggle,
  disabled = false,
  className,
}: ReactionBarProps) {
  return (
    <div role="group" aria-label="Reactions" className={cn('flex gap-2', className)}>
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          type="button"
          aria-pressed={reaction.reacted}
          disabled={disabled}
          onClick={() => onToggle(reaction.type)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            reaction.reacted
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          <span className="capitalize">{reaction.type}</span>
          <span>{reaction.count}</span>
        </button>
      ))}
    </div>
  )
}
