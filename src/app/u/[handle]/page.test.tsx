/**
 * Tests for user profile page.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserProfilePage from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  redirect: vi.fn(),
}))

describe('UserProfilePage', () => {
  it('renders user handle in heading', () => {
    render(<UserProfilePage params={{ handle: 'alice.bsky.social' }} />)
    expect(screen.getByRole('heading', { name: /alice\.bsky\.social/i })).toBeInTheDocument()
  })

  it('renders breadcrumbs', () => {
    render(<UserProfilePage params={{ handle: 'alice.bsky.social' }} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    // Handle appears in both breadcrumbs and heading; check breadcrumb specifically
    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i })
    expect(breadcrumb).toBeInTheDocument()
  })

  it('renders profile sections', () => {
    render(<UserProfilePage params={{ handle: 'alice.bsky.social' }} />)
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument()
  })
})
