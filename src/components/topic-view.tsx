/**
 * TopicView - Displays a full topic post with content and metadata.
 * Used on the topic detail page.
 * @see specs/prd-web.md Section 4 (Topic Components)
 */

import Link from 'next/link'
import { ChatCircle, Heart, Clock, Tag } from '@phosphor-icons/react/dist/ssr'
import type { Topic } from '@/lib/api/types'
import { cn } from '@/lib/utils'
import { formatRelativeTime, formatCompactNumber } from '@/lib/format'
import { MarkdownContent } from './markdown-content'

interface TopicViewProps {
  topic: Topic
  className?: string
}

export function TopicView({ topic, className }: TopicViewProps) {
  const headingId = `topic-heading-${topic.rkey}`

  return (
    <article
      id="post-1"
      className={cn('rounded-lg border border-border bg-card', className)}
      aria-labelledby={headingId}
    >
      {/* Header */}
      <div className="border-b border-border p-4 sm:p-6">
        <h2 id={headingId} className="text-xl font-bold text-foreground sm:text-2xl">
          {topic.title}
        </h2>

        {/* Author + timestamp */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{topic.authorDid}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={topic.createdAt}>{formatRelativeTime(topic.createdAt)}</time>
        </div>

        {/* Category + Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            href={`/c/${topic.category}`}
            className="rounded-full bg-primary-muted px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {topic.category}
          </Link>
          {topic.tags?.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Tag className="h-3 w-3" weight="regular" aria-hidden="true" />#{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <MarkdownContent content={topic.content} />
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-4 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:px-6">
        <span
          className="flex items-center gap-1.5"
          aria-label={`${formatCompactNumber(topic.replyCount)} replies`}
        >
          <ChatCircle className="h-4 w-4" weight="regular" aria-hidden="true" />
          {formatCompactNumber(topic.replyCount)}
        </span>
        <span
          className="flex items-center gap-1.5"
          aria-label={`${formatCompactNumber(topic.reactionCount)} reactions`}
        >
          <Heart className="h-4 w-4" weight="regular" aria-hidden="true" />
          {formatCompactNumber(topic.reactionCount)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" weight="regular" aria-hidden="true" />
          Last activity {formatRelativeTime(topic.lastActivityAt)}
        </span>
      </div>
    </article>
  )
}
