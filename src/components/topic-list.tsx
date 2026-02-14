/**
 * TopicList - Paginated list of TopicCard components.
 * Renders topics with optional heading and empty state.
 * @see specs/prd-web.md Section 4 (Topic Components)
 */

import type { Topic } from '@/lib/api/types'
import { TopicCard } from './topic-card'

interface TopicListProps {
  topics: Topic[]
  heading?: string
}

export function TopicList({ topics, heading }: TopicListProps) {
  return (
    <section>
      {heading && <h2 className="mb-4 text-xl font-semibold text-foreground">{heading}</h2>}
      {topics.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No topics yet. Be the first to start a discussion!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <TopicCard key={topic.uri} topic={topic} />
          ))}
        </div>
      )}
    </section>
  )
}
