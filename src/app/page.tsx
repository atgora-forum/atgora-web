import { SkipLinks } from '@/components/skip-links'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SkipLinks />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/barazo-logo-light.svg"
              alt="Barazo"
              width={120}
              height={32}
              className="h-8 w-auto dark:hidden"
              priority
            />
            <Image
              src="/barazo-logo-dark.svg"
              alt="Barazo"
              width={120}
              height={32}
              className="hidden h-8 w-auto dark:block"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container py-8" tabIndex={-1}>
        <section className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Community Forums on the <span className="text-primary">AT Protocol</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Portable identity. User data ownership. Cross-community reputation. The forum platform
              built for the decentralized web.
            </p>
          </div>

          {/* Design System Demo */}
          <div className="grid gap-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold text-card-foreground">Design System Active</h2>

            {/* Color Palette Demo */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Color Palette (Radix Colors + Flexoki)
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-primary" />
                  <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-secondary" />
                  <span className="text-xs text-muted-foreground">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-success" />
                  <span className="text-xs text-muted-foreground">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-warning" />
                  <span className="text-xs text-muted-foreground">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-destructive" />
                  <span className="text-xs text-muted-foreground">Error</span>
                </div>
              </div>
            </div>

            {/* Typography Demo */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Typography (Source Sans 3)
              </h3>
              <div className="space-y-1">
                <p className="text-2xl font-bold">Heading 2XL - Bold</p>
                <p className="text-xl font-semibold">Heading XL - Semibold</p>
                <p className="text-lg font-medium">Heading LG - Medium</p>
                <p className="text-base">Body text - Regular</p>
                <p className="text-sm text-muted-foreground">Small text - Muted</p>
              </div>
            </div>

            {/* Code Font Demo */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Monospace (Source Code Pro)
              </h3>
              <code className="rounded bg-input px-2 py-1 font-mono text-sm">
                const barazo = &quot;AT Protocol Forum&quot;;
              </code>
            </div>

            {/* Button Variants */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Button Styles</h3>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Primary Button
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Secondary Button
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Outline Button
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-destructive-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Destructive
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground">
            <p>
              Powered by Barazo v0.1.0 |{' '}
              <a
                href="https://github.com/barazo-forum"
                className="text-primary hover:text-primary-hover"
              >
                GitHub
              </a>
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
