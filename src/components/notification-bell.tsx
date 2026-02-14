/**
 * NotificationBell - Header notification icon with unread count badge.
 * ARIA live region announces count changes for screen readers.
 * @see specs/prd-web.md Section M10 (Notifications)
 */

import Link from 'next/link'
import { Bell } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface NotificationBellProps {
  unreadCount: number
  className?: string
}

export function NotificationBell({ unreadCount, className }: NotificationBellProps) {
  const displayCount = unreadCount > 99 ? '99+' : String(unreadCount)
  const hasUnread = unreadCount > 0

  return (
    <div className={cn('relative', className)}>
      <Link
        href="/notifications"
        aria-label={hasUnread ? `Notifications (${unreadCount} unread)` : 'Notifications'}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Bell size={20} weight={hasUnread ? 'fill' : 'regular'} aria-hidden="true" />
        {hasUnread && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {displayCount}
          </span>
        )}
      </Link>
      <div role="status" aria-live="polite" className="sr-only">
        {hasUnread
          ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
          : 'No unread notifications'}
      </div>
    </div>
  )
}
