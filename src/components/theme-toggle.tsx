/**
 * Theme Toggle Component
 * Dark/Light mode toggle for the header
 * Uses next-themes for persistence
 */
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from '@phosphor-icons/react'
import { useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  /* eslint-disable react-hooks/set-state-in-effect -- Required for hydration mismatch prevention */
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return (
      <button
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground',
          className
        )}
        disabled
        aria-hidden="true"
      >
        <span className="h-5 w-5" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors',
        'hover:bg-card-hover hover:text-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-5 w-5" weight="regular" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" weight="regular" aria-hidden="true" />
      )}
    </button>
  )
}
