/**
 * Tests for ReportDialog component.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ReportDialog } from './report-dialog'

describe('ReportDialog', () => {
  it('renders report button', () => {
    render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /report/i })).toBeInTheDocument()
  })

  it('opens dialog on button click', async () => {
    const user = userEvent.setup()
    render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows reason categories matching AT Protocol types', async () => {
    const user = userEvent.setup()
    render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    expect(screen.getByLabelText(/spam/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sexual content/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/harassment/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rule violation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/misleading/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/other/i)).toBeInTheDocument()
  })

  it('requires reason selection before submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ReportDialog subjectUri="at://test" onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    await user.click(screen.getByRole('button', { name: /submit report/i }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText(/select a reason/i)).toBeInTheDocument()
  })

  it('submits report with selected reason and optional text', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ReportDialog subjectUri="at://test" onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    await user.click(screen.getByLabelText(/spam/i))
    await user.type(screen.getByLabelText(/additional details/i), 'This is spam content')
    await user.click(screen.getByRole('button', { name: /submit report/i }))
    expect(onSubmit).toHaveBeenCalledWith({
      subjectUri: 'at://test',
      reason: 'spam',
      details: 'This is spam content',
    })
  })

  it('closes dialog on cancel', async () => {
    const user = userEvent.setup()
    render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('hides report button when disabled', () => {
    render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} disabled />)
    expect(screen.queryByRole('button', { name: /report/i })).not.toBeInTheDocument()
  })

  it('passes axe accessibility check when dialog is open', async () => {
    const user = userEvent.setup()
    const { container } = render(<ReportDialog subjectUri="at://test" onSubmit={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /report/i }))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
