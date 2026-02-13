<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/barazo-forum/.github/main/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/barazo-forum/.github/main/assets/logo-light.svg">
  <img alt="Barazo Logo" src="https://raw.githubusercontent.com/barazo-forum/.github/main/assets/logo-dark.svg" width="120">
</picture>

# barazo-web

**Forum frontend for Barazo**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

</div>

---

## 🚧 Status: Pre-Alpha Development

The default frontend for Barazo - community forums built on the AT Protocol.

**Current phase:** Planning complete, implementation starting Q1 2026

---

## What is this?

The barazo-web is the user-facing interface for Barazo forums. It provides:

- **Forum UI** - Topics, replies, categories, search, profiles
- **Authentication flow** - OAuth with AT Protocol PDS providers
- **Admin panel** - Forum settings, moderation, analytics
- **Responsive design** - Mobile-first, accessible (WCAG 2.2 AA)
- **SEO-optimized** - JSON-LD, OpenGraph, sitemaps
- **Themeable** - Dark/light mode, customizable branding

**API-first:** Consumes barazo-api REST endpoints. Can be fully replaced with custom frontend.

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
- barazo-api running (see [barazo-api](https://github.com/barazo-forum/barazo-api))

---

## Quick Start

**Clone and install:**
```bash
git clone https://github.com/barazo-forum/barazo-web.git
cd barazo-web
pnpm install
```

**Configure environment:**
```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your barazo-api instance
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
docker pull ghcr.io/barazo-forum/barazo-web:latest
```

See [barazo-deploy](https://github.com/barazo-forum/barazo-deploy) for full deployment templates.

---

## Customization

Barazo forums can be customized:

**Easy (admin panel):**
- Forum name, description, logo
- Color scheme (primary color picker)
- Reaction set configuration

**Advanced (code):**
- Fork this repo
- Modify components, styles
- Deploy custom frontend
- Still consumes barazo-api endpoints

---

## Documentation

- **User Guides:** [barazo.forum/docs](https://barazo.forum/docs) (coming soon)
- **PRD:** [docs/prd.md](docs/prd.md)

---

## License

**MIT** - Encourages customization and theming. Forum admins can modify freely.

See [LICENSE](LICENSE) for full terms.

---

## Related Repositories

- **[barazo-api](https://github.com/barazo-forum/barazo-api)** - Backend API (AGPL-3.0)
- **[barazo-lexicons](https://github.com/barazo-forum/barazo-lexicons)** - AT Protocol schemas
- **[barazo-deploy](https://github.com/barazo-forum/barazo-deploy)** - Deployment templates

---

## Community

- 🌐 **Website:** [barazo.forum](https://barazo.forum) (coming soon)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/orgs/barazo-forum/discussions)
- 🐛 **Issues:** [Report bugs](https://github.com/barazo-forum/barazo-web/issues)

---

© 2026 Barazo. Licensed under MIT.
