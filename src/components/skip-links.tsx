/**
 * Skip Links Component
 * WCAG 2.2 AA requirement - allows keyboard users to skip navigation
 * @see decisions/frontend.md Section 6
 */
'use client'

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-50">
      <a
        href="#main-content"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
    </div>
  )
}
