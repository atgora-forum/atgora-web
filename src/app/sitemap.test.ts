/**
 * Tests for sitemap generation.
 * @see specs/prd-web.md Section 5 (Sitemaps)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the API client before importing sitemap
vi.mock('@/lib/api/client', () => ({
  getCategories: vi.fn(),
  getTopics: vi.fn(),
}))

import sitemap from './sitemap'
import { getCategories, getTopics } from '@/lib/api/client'

const mockGetCategories = vi.mocked(getCategories)
const mockGetTopics = vi.mocked(getTopics)

beforeEach(() => {
  vi.clearAllMocks()

  mockGetCategories.mockResolvedValue({
    categories: [
      {
        id: '1',
        slug: 'general',
        name: 'General',
        description: null,
        parentId: null,
        sortOrder: 0,
        communityDid: 'did:plc:test',
        maturityRating: 'safe' as const,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-06-01T00:00:00Z',
        children: [
          {
            id: '2',
            slug: 'introductions',
            name: 'Introductions',
            description: null,
            parentId: '1',
            sortOrder: 0,
            communityDid: 'did:plc:test',
            maturityRating: 'safe' as const,
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-05-01T00:00:00Z',
            children: [],
          },
        ],
      },
    ],
  })

  mockGetTopics.mockResolvedValue({
    topics: [
      {
        uri: 'at://did:plc:test/forum.barazo.topic/abc123',
        rkey: 'abc123',
        authorDid: 'did:plc:author1',
        title: 'Hello World',
        content: 'First post',
        contentFormat: null,
        category: 'general',
        tags: null,
        communityDid: 'did:plc:test',
        cid: 'bafyabc',
        replyCount: 5,
        reactionCount: 3,
        lastActivityAt: '2025-06-15T12:00:00Z',
        createdAt: '2025-06-01T00:00:00Z',
        indexedAt: '2025-06-01T00:00:00Z',
      },
      {
        uri: 'at://did:plc:test/forum.barazo.topic/def456',
        rkey: 'def456',
        authorDid: 'did:plc:author2',
        title: 'Second Topic',
        content: 'Another post',
        contentFormat: null,
        category: 'general',
        tags: null,
        communityDid: 'did:plc:test',
        cid: 'bafydef',
        replyCount: 0,
        reactionCount: 1,
        lastActivityAt: '2025-06-10T08:00:00Z',
        createdAt: '2025-06-10T00:00:00Z',
        indexedAt: '2025-06-10T00:00:00Z',
      },
    ],
    cursor: null,
  })
})

describe('sitemap', () => {
  it('includes the homepage', async () => {
    const result = await sitemap()
    const urls = result.map((entry) => entry.url)
    expect(urls).toContain('https://barazo.forum')
  })

  it('includes category pages', async () => {
    const result = await sitemap()
    const urls = result.map((entry) => entry.url)
    expect(urls).toContain('https://barazo.forum/c/general')
    expect(urls).toContain('https://barazo.forum/c/introductions')
  })

  it('includes topic pages with slug and rkey', async () => {
    const result = await sitemap()
    const urls = result.map((entry) => entry.url)
    expect(urls).toContain('https://barazo.forum/t/hello-world/abc123')
    expect(urls).toContain('https://barazo.forum/t/second-topic/def456')
  })

  it('sets lastModified for topics', async () => {
    const result = await sitemap()
    const topicEntry = result.find((entry) => entry.url.includes('/t/hello-world/abc123'))
    expect(topicEntry?.lastModified).toBeDefined()
  })

  it('sets appropriate changeFrequency', async () => {
    const result = await sitemap()
    const homeEntry = result.find((entry) => entry.url === 'https://barazo.forum')
    expect(homeEntry?.changeFrequency).toBe('hourly')

    const categoryEntry = result.find((entry) => entry.url.includes('/c/general'))
    expect(categoryEntry?.changeFrequency).toBe('daily')

    const topicEntry = result.find((entry) => entry.url.includes('/t/hello-world/abc123'))
    expect(topicEntry?.changeFrequency).toBe('weekly')
  })

  it('sets priority values', async () => {
    const result = await sitemap()
    const homeEntry = result.find((entry) => entry.url === 'https://barazo.forum')
    expect(homeEntry?.priority).toBe(1.0)

    const categoryEntry = result.find((entry) => entry.url.includes('/c/general'))
    expect(categoryEntry?.priority).toBe(0.8)

    const topicEntry = result.find((entry) => entry.url.includes('/t/hello-world/abc123'))
    expect(topicEntry?.priority).toBe(0.6)
  })

  it('flattens nested category children', async () => {
    const result = await sitemap()
    const urls = result.map((entry) => entry.url)
    // Both parent and child categories should be included
    expect(urls).toContain('https://barazo.forum/c/general')
    expect(urls).toContain('https://barazo.forum/c/introductions')
  })

  it('handles API errors gracefully', async () => {
    mockGetCategories.mockRejectedValue(new Error('API down'))
    mockGetTopics.mockRejectedValue(new Error('API down'))

    const result = await sitemap()
    // Should still return at least the homepage
    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result[0].url).toBe('https://barazo.forum')
  })
})
