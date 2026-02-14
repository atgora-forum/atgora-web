/**
 * Tests for new topic page.
 */

import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  redirect: vi.fn(),
}))

describe('NewTopicPage', () => {
  it('renders create topic heading', async () => {
    const { default: NewTopicPage } = await import('./page')
    render(<NewTopicPage />)
    expect(screen.getByRole('heading', { name: 'Create New Topic' })).toBeInTheDocument()
  })

  it('renders topic form', async () => {
    const { default: NewTopicPage } = await import('./page')
    render(<NewTopicPage />)
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Topic' })).toBeInTheDocument()
  })

  it('renders breadcrumbs', async () => {
    const { default: NewTopicPage } = await import('./page')
    render(<NewTopicPage />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('New Topic')).toBeInTheDocument()
  })
})
