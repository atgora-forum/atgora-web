# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Instead, use GitHub's private vulnerability reporting:

1. Go to the repository
2. Click "Security" tab
3. Click "Report a vulnerability"
4. Fill in the details

Or email: security@barazo.forum

We will respond within 72 hours with next steps.

## Security Scope for This Repo

barazo-web is the Next.js frontend -- it renders user-generated content, handles client-side OAuth flows, and communicates with the API. The following areas are in scope for security reports:

### Cross-Site Scripting (XSS)

- **Stored XSS** -- user-generated content (topics, replies, profiles) rendering unsanitized HTML
- **Reflected XSS** -- URL parameters or search queries reflected in page output without escaping
- **DOM-based XSS** -- client-side JavaScript constructing DOM from untrusted data
- **Markdown rendering** -- malicious markdown/HTML bypassing the sanitization pipeline

### Cross-Site Request Forgery (CSRF)

- **State-changing actions** -- actions (create topic, react, report, moderate) that can be triggered by external sites
- **OAuth state parameter** -- CSRF in the AT Protocol OAuth callback flow

### Content Security Policy (CSP)

- **CSP bypass** -- techniques to execute scripts or load resources that violate the Content Security Policy
- **Inline script injection** -- circumventing CSP nonce or hash requirements
- **External resource loading** -- loading unauthorized third-party scripts or styles

### Authentication & Session

- **OAuth token leakage** -- access tokens exposed in URLs, logs, or browser history
- **Session fixation** -- reusing or injecting session identifiers
- **Open redirect** -- OAuth callback or navigation URLs redirecting to external malicious sites

### Information Disclosure

- **Server-side rendering leaks** -- SSR exposing API keys, internal URLs, or admin data in HTML source
- **Error messages** -- stack traces or internal paths exposed to users
- **SEO metadata injection** -- manipulating JSON-LD, OpenGraph, or sitemap output with user-controlled data

### Client-Side Security

- **Local storage/cookie exposure** -- sensitive data stored insecurely in the browser
- **Clickjacking** -- missing or bypassable frame-busting (X-Frame-Options / frame-ancestors)
- **Prototype pollution** -- client-side prototype pollution via URL parameters or user input

## Security Practices

- All user-generated content sanitized before rendering
- Content Security Policy headers configured via Next.js
- HTTPS-only (enforced by Caddy reverse proxy with HSTS)
- No inline scripts or eval (CSP-compatible)
- eslint-plugin-jsx-a11y in strict mode (catches some security-adjacent issues)
- No secret values in client-side bundles (`NEXT_PUBLIC_` prefix convention)
- Dependencies updated weekly via Dependabot
- CodeQL security scanning on every PR

## Disclosure Policy

We follow responsible disclosure:

- 90 days before public disclosure
- Credit given to reporter (if desired)
- CVE assigned when applicable
