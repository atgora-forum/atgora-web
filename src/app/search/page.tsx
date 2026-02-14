/**
 * Search results page.
 * URL: /search?q={query}
 * Displays full-text search results with type indicators.
 * noindex per specs/prd-web.md robots.txt section.
 * @see specs/prd-web.md Section M9
 */

'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChatCircle, Article, Heart } from '@phosphor-icons/react'
import { ForumLayout } from '@/components/layout/forum-layout'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SearchInput } from '@/components/search-input'
import { searchContent } from '@/lib/api/client'
import type { SearchResult, SearchResponse } from '@/lib/api/types'

export default function SearchPage() {
  return (
    <ForumLayout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Search</h1>

          <div className="max-w-lg">
            <SearchInput placeholder="Search topics and replies..." />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="animate-pulse space-y-4 py-4">
              <div className="h-16 rounded bg-muted" />
              <div className="h-16 rounded bg-muted" />
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </ForumLayout>
  )
}

function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''

  const [results, setResults] = useState<SearchResult[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const performSearch = useCallback(async (q: string) => {
    if (!q) {
      setResults([])
      setTotal(null)
      setSearched(false)
      return
    }

    setLoading(true)
    try {
      const response: SearchResponse = await searchContent({ q })
      setResults(response.results)
      setTotal(response.total)
      setSearched(true)
    } catch {
      setResults([])
      setTotal(0)
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialQuery) {
      void performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div aria-live="polite">
      {loading && (
        <div className="animate-pulse space-y-4 py-4">
          <div className="h-16 rounded bg-muted" />
          <div className="h-16 rounded bg-muted" />
        </div>
      )}

      {!loading && !searched && !initialQuery && (
        <p className="py-8 text-center text-muted-foreground">
          Enter a search term to find topics and replies.
        </p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">
          No results found for &ldquo;{initialQuery}&rdquo;. Try a different search term.
        </p>
      )}

      {!loading && searched && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {total} result{total !== 1 ? 's' : ''} for &ldquo;{initialQuery}&rdquo;
          </p>

          <ul className="space-y-3">
            {results.map((result) => (
              <li key={result.uri}>
                <SearchResultCard result={result} formatDate={formatDate} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

interface SearchResultCardProps {
  result: SearchResult
  formatDate: (dateStr: string) => string
}

function SearchResultCard({ result, formatDate }: SearchResultCardProps) {
  const isTopic = result.type === 'topic'
  const href = isTopic ? `/t/${result.category ?? '-'}/${result.rkey}` : `/t/-/${result.rkey}`

  return (
    <article className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-card-hover">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          {isTopic ? (
            <Article size={16} className="text-muted-foreground" aria-hidden="true" />
          ) : (
            <ChatCircle size={16} className="text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground capitalize">
              {result.type}
            </span>
            {result.category && (
              <span className="text-xs text-muted-foreground">{result.category}</span>
            )}
          </div>

          <Link
            href={href}
            className="mt-1 block font-medium text-foreground hover:text-primary hover:underline"
          >
            {isTopic && result.title ? result.title : result.content.slice(0, 100)}
          </Link>

          {!isTopic && result.rootTitle && (
            <p className="mt-1 text-xs text-muted-foreground">
              In topic: <span className="font-medium">{result.rootTitle}</span>
            </p>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(result.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Heart size={12} aria-hidden="true" />
              {result.reactionCount}
            </span>
            {isTopic && result.replyCount !== null && (
              <span className="flex items-center gap-1">
                <ChatCircle size={12} aria-hidden="true" />
                {result.replyCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
