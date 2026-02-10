<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo.svg">
  <img align="right" alt="ATgora Logo" src="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo.svg" width="96">
</picture>

# atgora-web

**Forum frontend for ATgora**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

---

## 🚧 Status: Pre-Alpha Development

The default frontend for ATgora - community forums built on the AT Protocol.

**Current phase:** Planning complete, implementation starting Q1 2026

---

## What is this?

The atgora-web is the user-facing interface for ATgora forums. It provides:

- **Forum UI** - Topics, replies, categories, search, profiles
- **Authentication flow** - OAuth with AT Protocol PDS providers
- **Admin panel** - Forum settings, moderation, analytics
- **Responsive design** - Mobile-first, accessible (WCAG 2.2 AA)
- **SEO-optimized** - JSON-LD, OpenGraph, sitemaps
- **Themeable** - Dark/light mode, customizable branding

**API-first:** Consumes atgora-api REST endpoints. Can be fully replaced with custom frontend.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 16, React 19 |
| Styling | TailwindCSS, Radix Colors, Flexoki |
| Components | shadcn/ui (admin), custom components |
| Icons | Phosphor Icons |
| Typography | Source Sans 3, Source Code Pro (self-hosted) |
| Syntax Highlighting | Shiki + Flexoki theme |
| Validation | Zod |
| Testing | Vitest, @axe-core/playwright |
| Accessibility | eslint-plugin-jsx-a11y (strict) |

---

## Key Features (Planned MVP)

- **Core forum pages** - Homepage, categories, topics, replies, search, profiles
- **Authentication** - AT Protocol OAuth (works with Bluesky, any PDS)
- **Markdown editor** - Rich editing with preview
- **Reactions** - Configurable per forum
- **Admin panel** - Categories, moderation, forum settings, content maturity controls
- **Accessibility** - WCAG 2.2 AA compliant, keyboard navigation, screen reader tested
- **SEO** - Server-side rendering, JSON-LD, sitemap generation
- **Dark mode** - Manual toggle, respects system preference

---

## Prerequisites

- Node.js 24 LTS
- pnpm
- atgora-api running (see [atgora-api](https://github.com/atgora-forum/atgora-api))

---

## Quick Start

**Clone and install:**
```bash
git clone https://github.com/atgora-forum/atgora-web.git
cd atgora-web
pnpm install
```

**Configure environment:**
```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your atgora-api instance
```

**Run development server:**
```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001)

**Run tests:**
```bash
pnpm test
pnpm lint
pnpm typecheck
```

---

## Development

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

**Accessibility requirements:**
- Semantic HTML (`<button>`, not `<div onClick>`)
- Keyboard navigable (test with Tab key only)
- ARIA attributes where needed
- Visible focus indicators
- vitest-axe tests for all components
- Minimum Lighthouse accessibility score: 95

**SEO requirements:**
- JSON-LD structured data on all page types
- OpenGraph + Twitter Cards
- Canonical URLs
- Sitemaps

---

## Deployment

**Production deployment via Docker:**
```bash
docker pull ghcr.io/atgora-forum/atgora-web:latest
```

See [atgora-deploy](https://github.com/atgora-forum/atgora-deploy) for full deployment templates.

---

## Customization

ATgora forums can be customized:

**Easy (admin panel):**
- Forum name, description, logo
- Color scheme (primary color picker)
- Reaction set configuration

**Advanced (code):**
- Fork this repo
- Modify components, styles
- Deploy custom frontend
- Still consumes atgora-api endpoints

---

## Documentation

- **User Guides:** [atgora.forum/docs](https://atgora.forum/docs) (coming soon)
- **PRD:** [docs/prd.md](docs/prd.md)

---

## License

**MIT** - Encourages customization and theming. Forum admins can modify freely.

See [LICENSE](LICENSE) for full terms.

---

## Related Repositories

- **[atgora-api](https://github.com/atgora-forum/atgora-api)** - Backend API (AGPL-3.0)
- **[atgora-lexicons](https://github.com/atgora-forum/atgora-lexicons)** - AT Protocol schemas
- **[atgora-deploy](https://github.com/atgora-forum/atgora-deploy)** - Deployment templates

---

## Community

- 🌐 **Website:** [atgora.forum](https://atgora.forum) (coming soon)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/orgs/atgora-forum/discussions)
- 🐛 **Issues:** [Report bugs](https://github.com/atgora-forum/atgora-web/issues)

---

© 2026 ATgora. Licensed under MIT.
