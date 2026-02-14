import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Pagination } from './pagination'

describe('Pagination', () => {
  it('renders page numbers', () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/c/general" />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('marks current page with aria-current', () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/c/general" />)
    const currentLink = screen.getByText('3')
    expect(currentLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders previous and next links', () => {
    render(<Pagination currentPage={2} totalPages={5} baseUrl="/c/general" />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('disables previous on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/c/general" />)
    const prev = screen.getByLabelText('Previous page')
    expect(prev).toHaveAttribute('aria-disabled', 'true')
  })

  it('disables next on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} baseUrl="/c/general" />)
    const next = screen.getByLabelText('Next page')
    expect(next).toHaveAttribute('aria-disabled', 'true')
  })

  it('has accessible navigation landmark', () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/c/general" />)
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
  })

  it('does not render when totalPages is 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} baseUrl="/c/general" />)
    expect(container.firstChild).toBeNull()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(<Pagination currentPage={2} totalPages={5} baseUrl="/c/general" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
