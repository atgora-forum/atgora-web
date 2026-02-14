import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Breadcrumbs } from './breadcrumbs'

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Development', href: '/c/development' },
    { label: 'Frontend', href: '/c/development/frontend' },
  ]

  it('renders all breadcrumb items', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
  })

  it('renders links for non-current items', () => {
    render(<Breadcrumbs items={items} />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('marks last item as current page', () => {
    render(<Breadcrumbs items={items} />)
    const current = screen.getByText('Frontend')
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('has accessible navigation landmark', () => {
    render(<Breadcrumbs items={items} />)
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument()
  })

  it('renders separator between items', () => {
    render(<Breadcrumbs items={items} />)
    const separators = screen.getAllByText('/')
    expect(separators).toHaveLength(2)
  })

  it('includes JSON-LD structured data', () => {
    const { container } = render(<Breadcrumbs items={items} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const jsonLd = JSON.parse(script!.textContent!)
    expect(jsonLd['@type']).toBe('BreadcrumbList')
    expect(jsonLd.itemListElement).toHaveLength(3)
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<Breadcrumbs items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
