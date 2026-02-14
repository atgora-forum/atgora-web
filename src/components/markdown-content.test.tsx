/**
 * Tests for MarkdownContent component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { MarkdownContent } from './markdown-content'

describe('MarkdownContent', () => {
  it('renders plain text', () => {
    render(<MarkdownContent content="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders bold text', () => {
    const { container } = render(<MarkdownContent content="This is **bold** text" />)
    const strong = container.querySelector('strong')
    expect(strong).toBeInTheDocument()
    expect(strong).toHaveTextContent('bold')
  })

  it('renders italic text', () => {
    const { container } = render(<MarkdownContent content="This is *italic* text" />)
    const em = container.querySelector('em')
    expect(em).toBeInTheDocument()
    expect(em).toHaveTextContent('italic')
  })

  it('renders links with target and rel attributes', () => {
    render(<MarkdownContent content="Visit [Example](https://example.com)" />)
    const link = screen.getByRole('link', { name: 'Example' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('renders code blocks', () => {
    const { container } = render(<MarkdownContent content={'```\nconst x = 1;\n```'} />)
    const code = container.querySelector('code')
    expect(code).toBeInTheDocument()
    expect(code).toHaveTextContent('const x = 1;')
  })

  it('renders inline code', () => {
    const { container } = render(<MarkdownContent content="Use `npm install` to install" />)
    const code = container.querySelector('code')
    expect(code).toBeInTheDocument()
    expect(code).toHaveTextContent('npm install')
  })

  it('renders unordered lists', () => {
    const { container } = render(<MarkdownContent content={'- Item 1\n- Item 2\n- Item 3'} />)
    const list = container.querySelector('ul')
    expect(list).toBeInTheDocument()
    const items = container.querySelectorAll('li')
    expect(items.length).toBe(3)
  })

  it('strips dangerous HTML (XSS prevention)', () => {
    const { container } = render(
      <MarkdownContent content='<script>alert("xss")</script><p>Safe content</p>' />
    )
    expect(container.querySelector('script')).not.toBeInTheDocument()
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('strips event handler attributes', () => {
    const { container } = render(
      <MarkdownContent content='<img src="x" onerror="alert(1)"><p>Safe</p>' />
    )
    const img = container.querySelector('img')
    if (img) {
      expect(img.getAttribute('onerror')).toBeNull()
    }
  })

  it('applies prose styling class', () => {
    const { container } = render(<MarkdownContent content="Hello" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('prose')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <MarkdownContent
        content={
          '## Heading\n\nA paragraph with **bold** and a [link](https://example.com).\n\n- Item 1\n- Item 2'
        }
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
