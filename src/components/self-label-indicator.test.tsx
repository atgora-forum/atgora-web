/**
 * Tests for SelfLabelIndicator component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { SelfLabelIndicator } from './self-label-indicator'

describe('SelfLabelIndicator', () => {
  it('renders nothing when no labels are provided', () => {
    const { container } = render(<SelfLabelIndicator labels={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('shows content warning with label text', () => {
    render(<SelfLabelIndicator labels={['sexual']} />)
    expect(screen.getByText(/content warning/i)).toBeInTheDocument()
    expect(screen.getByText(/sexual/i)).toBeInTheDocument()
  })

  it('shows reveal button to show hidden content', () => {
    render(
      <SelfLabelIndicator labels={['sexual']}>
        <p>Hidden content</p>
      </SelfLabelIndicator>
    )
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show content/i })).toBeInTheDocument()
  })

  it('reveals content when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <SelfLabelIndicator labels={['sexual']}>
        <p>Hidden content</p>
      </SelfLabelIndicator>
    )
    await user.click(screen.getByRole('button', { name: /show content/i }))
    expect(screen.getByText('Hidden content')).toBeInTheDocument()
  })

  it('allows hiding content again', async () => {
    const user = userEvent.setup()
    render(
      <SelfLabelIndicator labels={['sexual']}>
        <p>Hidden content</p>
      </SelfLabelIndicator>
    )
    await user.click(screen.getByRole('button', { name: /show content/i }))
    expect(screen.getByText('Hidden content')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /hide content/i }))
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('shows multiple labels', () => {
    render(<SelfLabelIndicator labels={['sexual', 'graphic-media']} />)
    expect(screen.getByText(/sexual/i)).toBeInTheDocument()
    expect(screen.getByText(/graphic-media/i)).toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <SelfLabelIndicator labels={['sexual']}>
        <p>Hidden content</p>
      </SelfLabelIndicator>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
