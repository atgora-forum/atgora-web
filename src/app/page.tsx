/**
 * Homepage - Forum landing page.
 * Shows recent topics, category sidebar, and community overview.
 * Server-side rendered for SEO.
 * @see specs/prd-web.md Section 3.1
 */

import type { Metadata } from 'next'
import { getCategories, getTopics } from '@/lib/api/client'
import { ForumLayout } from '@/components/layout/forum-layout'
import { TopicList } from '@/components/topic-list'
import { CategoryNav } from '@/components/category-nav'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Barazo - Community Forums on the AT Protocol',
  description:
    'Federated community forums with portable identity, user data ownership, and cross-community reputation.',
}

export default async function HomePage() {
  const [categoriesResult, topicsResult] = await Promise.all([
    getCategories(),
    getTopics({ limit: 20, sort: 'latest' }),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Barazo',
    url: 'https://barazo.forum',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://barazo.forum/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <ForumLayout sidebar={<CategoryNav categories={categoriesResult.categories} />}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Welcome / Stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome to the Community</h1>
        <p className="mt-1 text-muted-foreground">
          Discussions powered by the AT Protocol. Your identity, your data.
        </p>
      </div>

      {/* Category cards (mobile) */}
      <div className="mb-6 lg:hidden">
        <CategoryNav categories={categoriesResult.categories} />
      </div>

      {/* Recent Topics */}
      <TopicList topics={topicsResult.topics} heading="Recent Topics" />
    </ForumLayout>
  )
}
