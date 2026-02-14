import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { CategoryNav } from './category-nav'
import { mockCategories } from '@/mocks/data'

describe('CategoryNav', () => {
  it('renders navigation landmark', () => {
    render(<CategoryNav categories={mockCategories} />)
    expect(screen.getByRole('navigation', { name: /categories/i })).toBeInTheDocument()
  })

  it('renders top-level categories', () => {
    render(<CategoryNav categories={mockCategories} />)
    expect(screen.getByRole('link', { name: 'General Discussion' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Development' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /feedback/i })).toBeInTheDocument()
  })

  it('renders subcategories', () => {
    render(<CategoryNav categories={mockCategories} />)
    expect(screen.getByRole('link', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Backend' })).toBeInTheDocument()
  })

  it('links categories to their slug URL', () => {
    render(<CategoryNav categories={mockCategories} />)
    const generalLink = screen.getByRole('link', { name: 'General Discussion' })
    expect(generalLink).toHaveAttribute('href', '/c/general')
  })

  it('links subcategories with parent path', () => {
    render(<CategoryNav categories={mockCategories} />)
    const frontendLink = screen.getByRole('link', { name: 'Frontend' })
    expect(frontendLink).toHaveAttribute('href', '/c/development/frontend')
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<CategoryNav categories={mockCategories} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
