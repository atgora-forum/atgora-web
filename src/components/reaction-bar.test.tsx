/**
 * Tests for ReactionBar component.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ReactionBar } from './reaction-bar'

const defaultReactions = [
  { type: 'like', count: 5, reacted: false },
  { type: 'celebrate', count: 2, reacted: true },
]

describe('ReactionBar', () => {
  it('renders reaction buttons', () => {
    render(<ReactionBar reactions={defaultReactions} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /celebrate/i })).toBeInTheDocument()
  })

  it('shows reaction counts', () => {
    render(<ReactionBar reactions={defaultReactions} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /like.*5/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /celebrate.*2/i })).toBeInTheDocument()
  })

  it('marks reacted buttons with aria-pressed', () => {
    render(<ReactionBar reactions={defaultReactions} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /like/i })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: /celebrate/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('calls onToggle when clicking a reaction', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ReactionBar reactions={defaultReactions} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: /like/i }))
    expect(onToggle).toHaveBeenCalledWith('like')
  })

  it('renders empty state with no reactions', () => {
    render(<ReactionBar reactions={[]} onToggle={vi.fn()} />)
    // Should still render the container but be empty
    const group = screen.getByRole('group', { name: 'Reactions' })
    expect(group).toBeInTheDocument()
  })

  it('disables buttons when disabled prop is true', () => {
    render(<ReactionBar reactions={defaultReactions} onToggle={vi.fn()} disabled />)
    expect(screen.getByRole('button', { name: /like/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /celebrate/i })).toBeDisabled()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<ReactionBar reactions={defaultReactions} onToggle={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
