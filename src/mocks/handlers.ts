/**
 * MSW request handlers for API mocking during tests.
 * Tier 3: Hand-written handlers matching barazo-api response shapes.
 * @see plans/2026-02-09-mvp-implementation.md API Mock Strategy
 */

import { http, HttpResponse } from 'msw'
import { mockCategories, mockCategoryWithTopicCount, mockTopics } from './data'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export const handlers = [
  // GET /api/categories
  http.get(`${API_URL}/api/categories`, () => {
    return HttpResponse.json({ categories: mockCategories })
  }),

  // GET /api/categories/:slug
  http.get(`${API_URL}/api/categories/:slug`, ({ params }) => {
    const slug = params['slug'] as string
    const findCategory = (
      nodes: typeof mockCategories
    ): (typeof mockCategories)[number] | undefined => {
      for (const node of nodes) {
        if (node.slug === slug) return node
        const found = findCategory(node.children)
        if (found) return found
      }
      return undefined
    }
    const category = findCategory(mockCategories)
    if (!category) {
      return HttpResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    return HttpResponse.json({ ...category, topicCount: mockCategoryWithTopicCount.topicCount })
  }),

  // GET /api/topics
  http.get(`${API_URL}/api/topics`, ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const limitParam = url.searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : 20

    let topics = mockTopics
    if (category) {
      topics = topics.filter((t) => t.category === category)
    }

    const limited = topics.slice(0, limit)
    const hasMore = topics.length > limit

    return HttpResponse.json({
      topics: limited,
      cursor: hasMore ? 'mock-cursor-next' : null,
    })
  }),

  // GET /api/topics/:uri
  http.get(`${API_URL}/api/topics/:uri`, ({ params }) => {
    const uri = decodeURIComponent(params['uri'] as string)
    const topic = mockTopics.find((t) => t.uri === uri)
    if (!topic) {
      return HttpResponse.json({ error: 'Topic not found' }, { status: 404 })
    }
    return HttpResponse.json(topic)
  }),
]
