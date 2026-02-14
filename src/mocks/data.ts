/**
 * Mock data for testing. Realistic AT Protocol forum data
 * matching barazo-api response schemas.
 */

import type { CategoryTreeNode, CategoryWithTopicCount, Topic } from '@/lib/api/types'

const COMMUNITY_DID = 'did:plc:test-community-123'
const NOW = '2026-02-14T12:00:00.000Z'
const YESTERDAY = '2026-02-13T12:00:00.000Z'
const TWO_DAYS_AGO = '2026-02-12T12:00:00.000Z'

// --- Users ---

export const mockUsers = [
  { did: 'did:plc:user-alice-001', handle: 'alice.bsky.social' },
  { did: 'did:plc:user-bob-002', handle: 'bob.bsky.social' },
  { did: 'did:plc:user-carol-003', handle: 'carol.example.com' },
  { did: 'did:plc:user-dave-004', handle: 'dave.bsky.social' },
  { did: 'did:plc:user-eve-005', handle: 'eve.forum.example' },
] as const

// --- Categories ---

export const mockCategories: CategoryTreeNode[] = [
  {
    id: 'cat-general',
    slug: 'general',
    name: 'General Discussion',
    description: 'Talk about anything related to the community',
    parentId: null,
    sortOrder: 0,
    communityDid: COMMUNITY_DID,
    maturityRating: 'safe',
    createdAt: TWO_DAYS_AGO,
    updatedAt: TWO_DAYS_AGO,
    children: [],
  },
  {
    id: 'cat-dev',
    slug: 'development',
    name: 'Development',
    description: 'Technical discussions, code, and project updates',
    parentId: null,
    sortOrder: 1,
    communityDid: COMMUNITY_DID,
    maturityRating: 'safe',
    createdAt: TWO_DAYS_AGO,
    updatedAt: TWO_DAYS_AGO,
    children: [
      {
        id: 'cat-frontend',
        slug: 'frontend',
        name: 'Frontend',
        description: 'UI, UX, and frontend frameworks',
        parentId: 'cat-dev',
        sortOrder: 0,
        communityDid: COMMUNITY_DID,
        maturityRating: 'safe',
        createdAt: TWO_DAYS_AGO,
        updatedAt: TWO_DAYS_AGO,
        children: [],
      },
      {
        id: 'cat-backend',
        slug: 'backend',
        name: 'Backend',
        description: 'APIs, databases, and server infrastructure',
        parentId: 'cat-dev',
        sortOrder: 1,
        communityDid: COMMUNITY_DID,
        maturityRating: 'safe',
        createdAt: TWO_DAYS_AGO,
        updatedAt: TWO_DAYS_AGO,
        children: [],
      },
    ],
  },
  {
    id: 'cat-feedback',
    slug: 'feedback',
    name: 'Feedback & Ideas',
    description: 'Suggestions and feature requests',
    parentId: null,
    sortOrder: 2,
    communityDid: COMMUNITY_DID,
    maturityRating: 'safe',
    createdAt: TWO_DAYS_AGO,
    updatedAt: TWO_DAYS_AGO,
    children: [],
  },
  {
    id: 'cat-meta',
    slug: 'meta',
    name: 'Meta',
    description: 'About this community',
    parentId: null,
    sortOrder: 3,
    communityDid: COMMUNITY_DID,
    maturityRating: 'safe',
    createdAt: TWO_DAYS_AGO,
    updatedAt: TWO_DAYS_AGO,
    children: [],
  },
]

export const mockCategoryWithTopicCount: CategoryWithTopicCount = {
  ...mockCategories[0]!,
  topicCount: 12,
}

// --- Topics ---

export const mockTopics: Topic[] = [
  {
    uri: `at://${mockUsers[0]!.did}/forum.barazo.topic.post/3kf1abc`,
    rkey: '3kf1abc',
    authorDid: mockUsers[0]!.did,
    title: 'Welcome to Barazo Forums',
    content: 'This is the first topic on our new federated forum platform.',
    contentFormat: null,
    category: 'general',
    tags: ['welcome', 'introduction'],
    communityDid: COMMUNITY_DID,
    cid: 'bafyreib1',
    replyCount: 5,
    reactionCount: 12,
    lastActivityAt: NOW,
    createdAt: TWO_DAYS_AGO,
    indexedAt: TWO_DAYS_AGO,
  },
  {
    uri: `at://${mockUsers[1]!.did}/forum.barazo.topic.post/3kf2def`,
    rkey: '3kf2def',
    authorDid: mockUsers[1]!.did,
    title: 'Building with the AT Protocol',
    content: 'A deep dive into building applications on the AT Protocol.',
    contentFormat: null,
    category: 'development',
    tags: ['atproto', 'tutorial'],
    communityDid: COMMUNITY_DID,
    cid: 'bafyreib2',
    replyCount: 8,
    reactionCount: 23,
    lastActivityAt: YESTERDAY,
    createdAt: TWO_DAYS_AGO,
    indexedAt: TWO_DAYS_AGO,
  },
  {
    uri: `at://${mockUsers[2]!.did}/forum.barazo.topic.post/3kf3ghi`,
    rkey: '3kf3ghi',
    authorDid: mockUsers[2]!.did,
    title: 'Feature Request: Dark Mode Improvements',
    content: 'I would love to see more theme customization options.',
    contentFormat: null,
    category: 'feedback',
    tags: ['feature-request', 'ui'],
    communityDid: COMMUNITY_DID,
    cid: 'bafyreib3',
    replyCount: 3,
    reactionCount: 7,
    lastActivityAt: YESTERDAY,
    createdAt: YESTERDAY,
    indexedAt: YESTERDAY,
  },
  {
    uri: `at://${mockUsers[3]!.did}/forum.barazo.topic.post/3kf4jkl`,
    rkey: '3kf4jkl',
    authorDid: mockUsers[3]!.did,
    title: 'Understanding Portable Identity',
    content: 'How does identity work across federated services?',
    contentFormat: null,
    category: 'general',
    tags: ['identity', 'federation'],
    communityDid: COMMUNITY_DID,
    cid: 'bafyreib4',
    replyCount: 15,
    reactionCount: 31,
    lastActivityAt: NOW,
    createdAt: YESTERDAY,
    indexedAt: YESTERDAY,
  },
  {
    uri: `at://${mockUsers[4]!.did}/forum.barazo.topic.post/3kf5mno`,
    rkey: '3kf5mno',
    authorDid: mockUsers[4]!.did,
    title: 'Self-Hosting Guide',
    content: 'Step-by-step guide to running your own Barazo instance.',
    contentFormat: null,
    category: 'meta',
    tags: ['self-hosting', 'guide'],
    communityDid: COMMUNITY_DID,
    cid: 'bafyreib5',
    replyCount: 2,
    reactionCount: 9,
    lastActivityAt: NOW,
    createdAt: NOW,
    indexedAt: NOW,
  },
]
