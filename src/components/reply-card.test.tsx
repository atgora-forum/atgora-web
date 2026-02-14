/**
 * Tests for ReplyCard component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ReplyCard } from './reply-card'
import { mockReplies } from '@/mocks/data'

const reply = mockReplies[0]!
const nestedReply = mockReplies[1]! // depth 1

describe('ReplyCard', () => {
  it('renders reply content', () => {
    render(<ReplyCard reply={reply} postNumber={2} />)
    expect(screen.getByText(reply.content)).toBeInTheDocument()
  })

  it('renders author handle', () => {
    render(<ReplyCard reply={reply} postNumber={2} />)
    expect(screen.getByText(reply.authorDid)).toBeInTheDocument()
  })

  it('renders as article with aria-labelledby', () => {
    const { container } = render(<ReplyCard reply={reply} postNumber={2} />)
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveAttribute('aria-labelledby')
  })

  it('renders anchor id for post number', () => {
    const { container } = render(<ReplyCard reply={reply} postNumber={2} />)
    const article = container.querySelector('article')
    expect(article).toHaveAttribute('id', 'post-2')
  })

  it('renders post number link', () => {
    render(<ReplyCard reply={reply} postNumber={2} />)
    const link = screen.getByRole('link', { name: 'Link to post #2' })
    expect(link).toHaveAttribute('href', '#post-2')
  })

  it('renders reaction count', () => {
    render(<ReplyCard reply={reply} postNumber={2} />)
    expect(screen.getByText(`${reply.reactionCount}`)).toBeInTheDocument()
  })

  it('applies depth indentation for nested replies', () => {
    const { container } = render(<ReplyCard reply={nestedReply} postNumber={3} />)
    const wrapper = container.firstChild as HTMLElement
    // Depth 1 should have margin-left
    expect(wrapper.className).toContain('ml-')
  })

  it('does not indent top-level replies', () => {
    const { container } = render(<ReplyCard reply={reply} postNumber={2} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).not.toContain('ml-')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<ReplyCard reply={reply} postNumber={2} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
