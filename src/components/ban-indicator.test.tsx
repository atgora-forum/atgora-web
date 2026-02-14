/**
 * Tests for BanIndicator component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { BanIndicator } from './ban-indicator'

describe('BanIndicator', () => {
  it('renders nothing when user is not banned', () => {
    const { container } = render(<BanIndicator isBanned={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('shows banned status', () => {
    render(<BanIndicator isBanned={true} />)
    expect(screen.getByText(/banned/i)).toBeInTheDocument()
  })

  it('shows ban reason when provided', () => {
    render(<BanIndicator isBanned={true} reason="Spam" />)
    expect(screen.getByText(/spam/i)).toBeInTheDocument()
  })

  it('shows ban expiry when provided', () => {
    render(<BanIndicator isBanned={true} expiresAt="2026-03-01T00:00:00Z" />)
    expect(screen.getByText(/expires/i)).toBeInTheDocument()
  })

  it('shows permanent ban when no expiry', () => {
    render(<BanIndicator isBanned={true} />)
    expect(screen.getByText(/permanent/i)).toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<BanIndicator isBanned={true} reason="Harassment" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
