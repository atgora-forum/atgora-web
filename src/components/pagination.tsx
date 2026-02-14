/**
 * Pagination component with WCAG 2.2 AA compliance.
 * Uses aria-current="page" and proper navigation landmark.
 */

import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

function pageUrl(baseUrl: string, page: number): string {
  if (page === 1) return baseUrl
  return `${baseUrl}?page=${page}`
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      {/* Previous */}
      {currentPage <= 1 ? (
        <span
          aria-label="Previous page"
          aria-disabled="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground opacity-50"
        >
          <CaretLeft className="h-4 w-4" weight="bold" aria-hidden="true" />
        </span>
      ) : (
        <Link
          href={pageUrl(baseUrl, currentPage - 1)}
          aria-label="Previous page"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors',
            'hover:bg-card-hover hover:text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          )}
        >
          <CaretLeft className="h-4 w-4" weight="bold" aria-hidden="true" />
        </Link>
      )}

      {/* Page numbers */}
      {pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex h-10 w-10 items-center justify-center text-sm text-muted-foreground"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={pageUrl(baseUrl, page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-card-hover hover:text-foreground'
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage >= totalPages ? (
        <span
          aria-label="Next page"
          aria-disabled="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground opacity-50"
        >
          <CaretRight className="h-4 w-4" weight="bold" aria-hidden="true" />
        </span>
      ) : (
        <Link
          href={pageUrl(baseUrl, currentPage + 1)}
          aria-label="Next page"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors',
            'hover:bg-card-hover hover:text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          )}
        >
          <CaretRight className="h-4 w-4" weight="bold" aria-hidden="true" />
        </Link>
      )}
    </nav>
  )
}

/**
 * Generates page numbers with ellipsis for large page counts.
 * Always shows first, last, and pages around current.
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (currentPage > 3) {
    pages.push('...')
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push('...')
  }

  pages.push(totalPages)

  return pages
}
