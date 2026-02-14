/**
 * Default OpenGraph image for social sharing.
 * Generates a 1200x630 branded image with community name.
 * @see specs/prd-web.md Section 5 (OpenGraph)
 */

import { ImageResponse } from 'next/og'

export const alt = 'Barazo - Community Forums on the AT Protocol'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage(): Promise<ImageResponse> {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#1c1917',
        color: '#e8e4e0',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#31748f',
            fontSize: '36px',
            fontWeight: 700,
            color: '#e8e4e0',
          }}
        >
          B
        </div>
        <span style={{ fontSize: '56px', fontWeight: 700 }}>Barazo</span>
      </div>
      <div
        style={{
          fontSize: '24px',
          color: '#a0a0a0',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        Community Forums on the AT Protocol
      </div>
      <div
        style={{
          display: 'flex',
          gap: '32px',
          marginTop: '40px',
          fontSize: '18px',
          color: '#31748f',
        }}
      >
        <span>Portable Identity</span>
        <span>Data Ownership</span>
        <span>Cross-Community</span>
      </div>
    </div>,
    { ...size }
  )
}
