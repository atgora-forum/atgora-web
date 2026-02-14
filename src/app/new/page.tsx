/**
 * New topic page - Create a new forum topic.
 * URL: /new
 * Client component (requires auth context + form state).
 * @see specs/prd-web.md Section 3.2
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CreateTopicInput } from '@/lib/api/types'
import { createTopic } from '@/lib/api/client'
import { getTopicUrl } from '@/lib/format'
import { ForumLayout } from '@/components/layout/forum-layout'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { TopicForm } from '@/components/topic-form'

export default function NewTopicPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: CreateTopicInput) => {
    setSubmitting(true)
    setError(null)

    try {
      // TODO: Get access token from auth context when auth is implemented
      const accessToken = ''
      const topic = await createTopic(values, accessToken)
      router.push(getTopicUrl(topic))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create topic')
      setSubmitting(false)
    }
  }

  return (
    <ForumLayout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'New Topic' }]} />

        <h1 className="text-2xl font-bold text-foreground">Create New Topic</h1>

        {error && (
          <div
            className="rounded-md border border-destructive/50 bg-destructive/10 p-4"
            role="alert"
          >
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <TopicForm onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </ForumLayout>
  )
}
