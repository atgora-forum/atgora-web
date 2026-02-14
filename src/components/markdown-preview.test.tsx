/**
 * Tests for MarkdownPreview component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { MarkdownPreview } from './markdown-preview'

describe('MarkdownPreview', () => {
  it('renders markdown content', () => {
    render(<MarkdownPreview content="**bold text**" />)
    expect(screen.getByText('bold text')).toBeInTheDocument()
  })

  it('renders empty state when no content', () => {
    render(<MarkdownPreview content="" />)
    expect(screen.getByText('Nothing to preview')).toBeInTheDocument()
  })

  it('has preview label', () => {
    render(<MarkdownPreview content="Hello" />)
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('renders links correctly', () => {
    render(<MarkdownPreview content="[Barazo](https://barazo.forum)" />)
    const link = screen.getByRole('link', { name: 'Barazo' })
    expect(link).toHaveAttribute('href', 'https://barazo.forum')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<MarkdownPreview content="# Heading\n\nSome **bold** text." />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
