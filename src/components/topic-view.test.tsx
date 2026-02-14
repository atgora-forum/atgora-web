/**
 * Tests for TopicView component.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { TopicView } from './topic-view'
import { mockTopics, mockUsers } from '@/mocks/data'

const topic = mockTopics[0]!

describe('TopicView', () => {
  it('renders topic title as h2', () => {
    render(<TopicView topic={topic} />)
    const heading = screen.getByRole('heading', { level: 2, name: topic.title })
    expect(heading).toBeInTheDocument()
  })

  it('renders topic content via markdown', () => {
    render(<TopicView topic={topic} />)
    expect(screen.getByText(topic.content)).toBeInTheDocument()
  })

  it('renders author handle', () => {
    render(<TopicView topic={topic} />)
    expect(screen.getByText(mockUsers[0]!.did)).toBeInTheDocument()
  })

  it('renders category link', () => {
    render(<TopicView topic={topic} />)
    const link = screen.getByRole('link', { name: topic.category })
    expect(link).toHaveAttribute('href', `/c/${topic.category}`)
  })

  it('renders tags', () => {
    render(<TopicView topic={topic} />)
    for (const tag of topic.tags ?? []) {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument()
    }
  })

  it('renders reply count', () => {
    render(<TopicView topic={topic} />)
    expect(screen.getByText(`${topic.replyCount}`, { exact: false })).toBeInTheDocument()
  })

  it('renders reaction count', () => {
    render(<TopicView topic={topic} />)
    expect(screen.getByText(`${topic.reactionCount}`, { exact: false })).toBeInTheDocument()
  })

  it('uses article element with aria-labelledby', () => {
    const { container } = render(<TopicView topic={topic} />)
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveAttribute('aria-labelledby')
  })

  it('includes anchor link for post', () => {
    const { container } = render(<TopicView topic={topic} />)
    const article = container.querySelector('article')
    expect(article).toHaveAttribute('id', 'post-1')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<TopicView topic={topic} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
