/**
 * BanIndicator - Shows ban status on user profiles.
 * Displays ban reason and expiry if available.
 * @see specs/prd-web.md Section M7 (Ban indicator on user profiles)
 */

import { Prohibit } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface BanIndicatorProps {
  isBanned: boolean
  reason?: string
  expiresAt?: string
  className?: string
}

export function BanIndicator({ isBanned, reason, expiresAt, className }: BanIndicatorProps) {
  if (!isBanned) return null

  const expiryText = expiresAt
    ? `Expires ${new Date(expiresAt).toLocaleDateString()}`
    : 'Permanent ban'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1',
        className
      )}
      role="status"
    >
      <Prohibit size={14} className="shrink-0 text-destructive" aria-hidden="true" />
      <span className="text-xs font-medium text-destructive">Banned</span>
      {reason && <span className="text-xs text-destructive/80">&middot; {reason}</span>}
      <span className="text-xs text-destructive/60">&middot; {expiryText}</span>
    </div>
  )
}
