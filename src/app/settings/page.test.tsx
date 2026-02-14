/**
 * Tests for settings page.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import SettingsPage from './page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  redirect: vi.fn(),
}))

describe('SettingsPage', () => {
  it('renders settings heading', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
  })

  it('renders content safety section', () => {
    render(<SettingsPage />)
    expect(screen.getByText(/content safety/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/maturity level/i)).toBeInTheDocument()
  })

  it('renders muted words input', () => {
    render(<SettingsPage />)
    expect(screen.getByLabelText(/muted words/i)).toBeInTheDocument()
  })

  it('renders cross-posting section', () => {
    render(<SettingsPage />)
    expect(screen.getByText(/cross-posting/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bluesky/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/frontpage/i)).toBeInTheDocument()
  })

  it('renders notification preferences section', () => {
    render(<SettingsPage />)
    // Find the fieldset legend specifically (not the header notification bell's ARIA text)
    const legends = screen.getAllByText(/notifications/i)
    expect(legends.some((el) => el.tagName === 'LEGEND')).toBe(true)
  })

  it('renders save button', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('renders breadcrumbs', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<SettingsPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
