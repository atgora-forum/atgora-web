/**
 * Tests for NotificationBell component.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { NotificationBell } from './notification-bell'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('NotificationBell', () => {
  it('renders as link to notifications page', () => {
    render(<NotificationBell unreadCount={0} />)
    const link = screen.getByRole('link', { name: /notification/i })
    expect(link).toHaveAttribute('href', '/notifications')
  })

  it('shows count badge when unread > 0', () => {
    render(<NotificationBell unreadCount={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('hides count badge when unread is 0', () => {
    render(<NotificationBell unreadCount={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows 99+ for large counts', () => {
    render(<NotificationBell unreadCount={150} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('announces count via ARIA live region', () => {
    render(<NotificationBell unreadCount={5} />)
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('5 unread notifications')
  })

  it('announces no unread via ARIA live region', () => {
    render(<NotificationBell unreadCount={0} />)
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('No unread notifications')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<NotificationBell unreadCount={3} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
