import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { fetchUserRepos } from '@/lib/services/repo-service'

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accessToken = (session as any).accessToken as string | undefined
  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }

  try {
    const repos = await fetchUserRepos(accessToken)
    return NextResponse.json(repos, {
      headers: {
        'Cache-Control': 'private, max-age=60',
      },
    })
  } catch (err: any) {
    const status = err?.status ?? 500
    return NextResponse.json(
      { error: err?.message ?? 'Failed to fetch repositories' },
      { status }
    )
  }
}
