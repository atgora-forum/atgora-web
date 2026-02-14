/**
 * Type-safe API client for barazo-api.
 * Server-side: uses fetch directly with the internal API URL.
 * Client-side: uses fetch with the public API URL.
 */

import type {
  CategoriesResponse,
  CategoryWithTopicCount,
  CommunitySettings,
  CommunityStats,
  TopicsResponse,
  RepliesResponse,
  PaginationParams,
} from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

interface FetchOptions {
  headers?: Record<string, string>
  signal?: AbortSignal
}

class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_URL}${path}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: options.signal,
  })

  if (!response.ok) {
    const body = await response.text().catch(() => 'Unknown error')
    throw new ApiError(response.status, `API ${response.status}: ${body}`)
  }

  return response.json() as Promise<T>
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const entries = Object.entries(params).filter(
    (entry): entry is [string, string | number] => entry[1] !== undefined
  )
  if (entries.length === 0) return ''
  return '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
}

// --- Category endpoints ---

export function getCategories(options?: FetchOptions): Promise<CategoriesResponse> {
  return apiFetch<CategoriesResponse>('/api/categories', options)
}

export function getCategoryBySlug(
  slug: string,
  options?: FetchOptions
): Promise<CategoryWithTopicCount> {
  return apiFetch<CategoryWithTopicCount>(`/api/categories/${encodeURIComponent(slug)}`, options)
}

// --- Topic endpoints ---

export interface GetTopicsParams extends PaginationParams {
  category?: string
  sort?: 'latest' | 'popular'
}

export function getTopics(
  params: GetTopicsParams = {},
  options?: FetchOptions
): Promise<TopicsResponse> {
  const query = buildQuery({
    limit: params.limit,
    cursor: params.cursor,
    category: params.category,
    sort: params.sort,
  })
  return apiFetch<TopicsResponse>(`/api/topics${query}`, options)
}

// --- Reply endpoints ---

export function getReplies(
  topicUri: string,
  params: PaginationParams = {},
  options?: FetchOptions
): Promise<RepliesResponse> {
  const query = buildQuery({
    limit: params.limit,
    cursor: params.cursor,
  })
  return apiFetch<RepliesResponse>(
    `/api/topics/${encodeURIComponent(topicUri)}/replies${query}`,
    options
  )
}

// --- Community endpoints ---

export function getCommunitySettings(options?: FetchOptions): Promise<CommunitySettings> {
  return apiFetch<CommunitySettings>('/api/admin/settings', {
    ...options,
    headers: { ...options?.headers },
  })
}

export function getCommunityStats(
  accessToken: string,
  options?: FetchOptions
): Promise<CommunityStats> {
  return apiFetch<CommunityStats>('/api/admin/stats', {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export { ApiError }
