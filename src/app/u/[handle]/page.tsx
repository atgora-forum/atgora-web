/**
 * User profile page.
 * URL: /u/[handle]
 * Displays user info, reputation, recent posts.
 * Client component (needs param resolution + dynamic data).
 * @see specs/prd-web.md Section M8
 */

'use client'

import { useState, useEffect } from 'react'
import { User, CalendarBlank, ChatCircle } from '@phosphor-icons/react'
import { ForumLayout } from '@/components/layout/forum-layout'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ReputationBadge } from '@/components/reputation-badge'
import { BanIndicator } from '@/components/ban-indicator'

interface UserProfilePageProps {
  params: Promise<{ handle: string }> | { handle: string }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const [handle, setHandle] = useState<string | null>(null)

  useEffect(() => {
    async function resolveParams() {
      const resolved = params instanceof Promise ? await params : params
      setHandle(resolved.handle)
    }
    void resolveParams()
  }, [params])

  if (!handle) {
    return (
      <ForumLayout>
        <div className="animate-pulse space-y-4 py-8">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-32 rounded bg-muted" />
        </div>
      </ForumLayout>
    )
  }

  // TODO: Fetch user profile from API when endpoint is available
  const mockProfile = {
    did: `did:plc:mock-${handle}`,
    handle,
    displayName: handle.split('.')[0],
    reputation: 42,
    postCount: 15,
    joinedAt: '2025-06-15T00:00:00Z',
    isBanned: false,
  }

  const joinDate = new Date(mockProfile.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <ForumLayout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: handle }]} />

        {/* Profile header */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <User size={32} className="text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-foreground">{handle}</h1>
              {mockProfile.displayName && (
                <p className="text-lg text-muted-foreground">{mockProfile.displayName}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <ReputationBadge score={mockProfile.reputation} />
                <span className="flex items-center gap-1">
                  <ChatCircle size={16} aria-hidden="true" />
                  {mockProfile.postCount} posts
                </span>
                <span className="flex items-center gap-1">
                  <CalendarBlank size={16} aria-hidden="true" />
                  Joined {joinDate}
                </span>
              </div>

              {mockProfile.isBanned && (
                <div className="mt-3">
                  <BanIndicator isBanned={true} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Recent posts and replies will appear here once the API is connected.
          </p>
        </section>
      </div>
    </ForumLayout>
  )
}
