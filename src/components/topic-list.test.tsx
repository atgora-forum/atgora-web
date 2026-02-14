import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TopicList } from './topic-list'
import { mockTopics } from '@/mocks/data'

describe('TopicList', () => {
  it('renders all topics', () => {
    render(<TopicList topics={mockTopics} />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(mockTopics.length)
  })

  it('renders topic titles', () => {
    render(<TopicList topics={mockTopics} />)
    for (const topic of mockTopics) {
      expect(screen.getByRole('link', { name: topic.title })).toBeInTheDocument()
    }
  })

  it('renders empty state when no topics', () => {
    render(<TopicList topics={[]} />)
    expect(screen.getByText(/no topics yet/i)).toBeInTheDocument()
  })

  it('renders with heading', () => {
    render(<TopicList topics={mockTopics} heading="Recent Topics" />)
    expect(screen.getByRole('heading', { name: 'Recent Topics' })).toBeInTheDocument()
  })
})
