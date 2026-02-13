/**
 * Health Check API Route
 * Returns 200 OK for Docker health checks and monitoring
 */
export const dynamic = 'force-static'

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
