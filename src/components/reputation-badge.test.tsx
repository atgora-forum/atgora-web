/**
 * Tests for ReputationBadge component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ReputationBadge } from './reputation-badge'

describe('ReputationBadge', () => {
  it('renders reputation score', () => {
    render(<ReputationBadge score={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders with accessible label', () => {
    render(<ReputationBadge score={42} />)
    expect(screen.getByLabelText(/reputation.*42/i)).toBeInTheDocument()
  })

  it('renders level label when provided', () => {
    render(<ReputationBadge score={100} level="Trusted" />)
    expect(screen.getByText('Trusted')).toBeInTheDocument()
  })

  it('renders without level label when not provided', () => {
    render(<ReputationBadge score={10} />)
    expect(screen.queryByText('Trusted')).not.toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<ReputationBadge score={42} level="Member" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
