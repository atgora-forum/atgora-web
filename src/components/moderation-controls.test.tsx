/**
 * Tests for ModerationControls component.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ModerationControls } from './moderation-controls'

describe('ModerationControls', () => {
  it('renders nothing when user is not a moderator', () => {
    render(<ModerationControls isModerator={false} onAction={vi.fn()} />)
    expect(screen.queryByRole('group')).not.toBeInTheDocument()
  })

  it('renders moderation actions for moderators', () => {
    render(<ModerationControls isModerator={true} onAction={vi.fn()} />)
    expect(screen.getByRole('group', { name: /moderation/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lock/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pin/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('shows confirmation dialog before executing destructive action', async () => {
    const user = userEvent.setup()
    render(<ModerationControls isModerator={true} onAction={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('executes action after confirmation', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<ModerationControls isModerator={true} onAction={onAction} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    await user.click(screen.getByRole('button', { name: /confirm/i }))
    expect(onAction).toHaveBeenCalledWith('delete')
  })

  it('cancels action when dialog is dismissed', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<ModerationControls isModerator={true} onAction={onAction} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onAction).not.toHaveBeenCalled()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('reflects locked state', () => {
    render(<ModerationControls isModerator={true} isLocked={true} onAction={vi.fn()} />)
    expect(screen.getByRole('button', { name: /unlock/i })).toBeInTheDocument()
  })

  it('reflects pinned state', () => {
    render(<ModerationControls isModerator={true} isPinned={true} onAction={vi.fn()} />)
    expect(screen.getByRole('button', { name: /unpin/i })).toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<ModerationControls isModerator={true} onAction={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
