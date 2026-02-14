/**
 * Tests for UserProfileCard component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { UserProfileCard } from './user-profile-card'

const mockUser = {
  did: 'did:plc:test-user',
  handle: 'alice.bsky.social',
  displayName: 'Alice',
  reputation: 42,
  postCount: 15,
  joinedAt: '2025-01-01T00:00:00Z',
}

describe('UserProfileCard', () => {
  it('renders trigger with user handle', () => {
    render(<UserProfileCard user={mockUser} />)
    expect(screen.getByText('alice.bsky.social')).toBeInTheDocument()
  })

  it('shows card on hover', async () => {
    const user = userEvent.setup()
    render(<UserProfileCard user={mockUser} />)
    await user.hover(screen.getByText('alice.bsky.social'))

    // Wait for hover delay
    await act(async () => {
      await new Promise((r) => setTimeout(r, 250))
    })

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByLabelText(/reputation/i)).toBeInTheDocument()
  })

  it('shows card on keyboard focus', async () => {
    const user = userEvent.setup()
    render(<UserProfileCard user={mockUser} />)
    await user.tab()

    // Wait for focus delay
    await act(async () => {
      await new Promise((r) => setTimeout(r, 250))
    })

    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('hides card on Escape', async () => {
    const user = userEvent.setup()
    render(<UserProfileCard user={mockUser} />)
    await user.hover(screen.getByText('alice.bsky.social'))
    await act(async () => {
      await new Promise((r) => setTimeout(r, 250))
    })
    expect(screen.getByText('Alice')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('shows post count', async () => {
    const user = userEvent.setup()
    render(<UserProfileCard user={mockUser} />)
    await user.hover(screen.getByText('alice.bsky.social'))
    await act(async () => {
      await new Promise((r) => setTimeout(r, 250))
    })
    expect(screen.getByText(/15/)).toBeInTheDocument()
  })

  it('renders as link to user profile', () => {
    render(<UserProfileCard user={mockUser} />)
    const link = screen.getByRole('link', { name: /alice\.bsky\.social/i })
    expect(link).toHaveAttribute('href', '/u/alice.bsky.social')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<UserProfileCard user={mockUser} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
