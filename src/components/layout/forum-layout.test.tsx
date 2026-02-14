import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ForumLayout } from './forum-layout'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ForumLayout', () => {
  it('renders header with logo', () => {
    render(
      <ForumLayout>
        <p>Content</p>
      </ForumLayout>
    )
    const logos = screen.getAllByAltText('Barazo')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('renders main content area', () => {
    render(
      <ForumLayout>
        <p>Test content</p>
      </ForumLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders header landmark', () => {
    render(
      <ForumLayout>
        <p>Content</p>
      </ForumLayout>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders main landmark', () => {
    render(
      <ForumLayout>
        <p>Content</p>
      </ForumLayout>
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(
      <ForumLayout>
        <p>Content</p>
      </ForumLayout>
    )
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders skip links', () => {
    render(
      <ForumLayout>
        <p>Content</p>
      </ForumLayout>
    )
    expect(screen.getByText('Skip to main content')).toBeInTheDocument()
  })

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <ForumLayout>
        <h1>Page Title</h1>
        <p>Content</p>
      </ForumLayout>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
