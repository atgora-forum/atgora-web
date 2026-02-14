/**
 * CategoryNav - Hierarchical category navigation.
 * Renders category tree with proper accessibility.
 * Used in sidebar and as standalone navigation.
 * @see specs/prd-web.md Section 4 (Navigation)
 */

import Link from 'next/link'
import { Folder, FolderOpen } from '@phosphor-icons/react/dist/ssr'
import type { CategoryTreeNode } from '@/lib/api/types'
import { cn } from '@/lib/utils'

interface CategoryNavProps {
  categories: CategoryTreeNode[]
  currentSlug?: string
  className?: string
}

export function CategoryNav({ categories, currentSlug, className }: CategoryNavProps) {
  return (
    <nav aria-label="Categories" className={className}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </h2>
      <ul className="space-y-1">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} currentSlug={currentSlug} depth={0} />
        ))}
      </ul>
    </nav>
  )
}

interface CategoryItemProps {
  category: CategoryTreeNode
  currentSlug?: string
  depth: number
  parentSlug?: string
}

function CategoryItem({ category, currentSlug, depth, parentSlug }: CategoryItemProps) {
  const isActive = currentSlug === category.slug
  const hasChildren = category.children.length > 0
  const categoryPath = parentSlug ? `/c/${parentSlug}/${category.slug}` : `/c/${category.slug}`

  return (
    <li>
      <Link
        href={categoryPath}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
          'hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          isActive
            ? 'bg-primary-muted font-medium text-primary'
            : 'text-muted-foreground hover:text-foreground',
          depth > 0 && 'ml-4'
        )}
      >
        {hasChildren ? (
          <FolderOpen className="h-4 w-4 shrink-0" weight="regular" aria-hidden="true" />
        ) : (
          <Folder className="h-4 w-4 shrink-0" weight="regular" aria-hidden="true" />
        )}
        <span className="truncate">{category.name}</span>
      </Link>
      {hasChildren && (
        <ul className="mt-0.5 space-y-0.5">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              currentSlug={currentSlug}
              depth={depth + 1}
              parentSlug={category.slug}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
