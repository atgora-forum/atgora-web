/**
 * Tests for default OpenGraph image generation.
 * @see specs/prd-web.md Section 5 (OG image)
 */

import { describe, it, expect } from 'vitest'
import OGImage, { alt, size, contentType } from './opengraph-image'

describe('opengraph-image', () => {
  it('exports correct metadata', () => {
    expect(alt).toBe('Barazo - Community Forums on the AT Protocol')
    expect(size).toEqual({ width: 1200, height: 630 })
    expect(contentType).toBe('image/png')
  })

  it('returns an ImageResponse', async () => {
    const response = await OGImage()
    expect(response).toBeDefined()
    expect(response.headers.get('content-type')).toBe('image/png')
  })
})
