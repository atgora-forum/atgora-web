/**
 * MarkdownPreview - Live preview of markdown content.
 * Uses the shared MarkdownContent component for rendering.
 * @see specs/prd-web.md Section 4 (Editor Components)
 */

import { cn } from '@/lib/utils'
import { MarkdownContent } from './markdown-content'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <p className="block text-sm font-medium text-foreground">Preview</p>
      <div className="min-h-[200px] rounded-md border border-border bg-card p-4">
        {content ? (
          <MarkdownContent content={content} />
        ) : (
          <p className="text-sm text-muted-foreground">Nothing to preview</p>
        )}
      </div>
    </div>
  )
}
