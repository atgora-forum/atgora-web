/**
 * Focus management for client-side navigation.
 * Next.js does NOT move focus after route transitions.
 * This hook moves focus to the main content area after navigation.
 * @see WCAG 2.4.3 (Focus Order), standards/frontend.md
 */

'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function useFocusOnNavigate() {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname

      // Focus the main content area after navigation
      const main = document.getElementById('main-content')
      if (main) {
        main.focus({ preventScroll: false })
      }
    }
  }, [pathname])
}
