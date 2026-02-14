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
  CreateTopicInput,
  Topic,
  TopicsResponse,
  UpdateTopicInput,
  RepliesResponse,
  SearchResponse,
  NotificationsResponse,
  PaginationParams,
} from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

interface FetchOptions {
  headers?: Record<string, string>
  signal?: AbortSignal
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
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
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: options.signal,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
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

export function getTopicByRkey(rkey: string, options?: FetchOptions): Promise<Topic> {
  return apiFetch<Topic>(`/api/topics/by-rkey/${encodeURIComponent(rkey)}`, options)
}

export function createTopic(
  input: CreateTopicInput,
  accessToken: string,
  options?: FetchOptions
): Promise<Topic> {
  return apiFetch<Topic>('/api/topics', {
    ...options,
    method: 'POST',
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: input,
  })
}

export function updateTopic(
  rkey: string,
  input: UpdateTopicInput,
  accessToken: string,
  options?: FetchOptions
): Promise<Topic> {
  return apiFetch<Topic>(`/api/topics/${encodeURIComponent(rkey)}`, {
    ...options,
    method: 'PUT',
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: input,
  })
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

// --- Search endpoints ---

export interface SearchParams extends PaginationParams {
  q: string
}

export function searchContent(
  params: SearchParams,
  options?: FetchOptions
): Promise<SearchResponse> {
  const query = buildQuery({
    q: params.q,
    limit: params.limit,
    cursor: params.cursor,
  })
  return apiFetch<SearchResponse>(`/api/search${query}`, options)
}

// --- Notification endpoints ---

export function getNotifications(
  accessToken: string,
  params: PaginationParams = {},
  options?: FetchOptions
): Promise<NotificationsResponse> {
  const query = buildQuery({
    limit: params.limit,
    cursor: params.cursor,
  })
  return apiFetch<NotificationsResponse>(`/api/notifications${query}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export function markNotificationsRead(
  accessToken: string,
  ids: string[],
  options?: FetchOptions
): Promise<void> {
  return apiFetch<void>('/api/notifications/read', {
    ...options,
    method: 'PUT',
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: { ids },
  })
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
