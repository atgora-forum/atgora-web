/**
 * ReputationBadge - Displays user reputation score and optional level.
 * @see specs/prd-web.md Section M8 (ReputationBadge)
 */

import { Star } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface ReputationBadgeProps {
  score: number
  level?: string
  className?: string
}

export function ReputationBadge({ score, level, className }: ReputationBadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-sm', className)}
      aria-label={`Reputation: ${score}`}
    >
      <Star className="h-3.5 w-3.5 text-amber-500" weight="fill" aria-hidden="true" />
      <span className="font-medium text-foreground">{score}</span>
      {level && <span className="text-muted-foreground">{level}</span>}
    </span>
  )
}
