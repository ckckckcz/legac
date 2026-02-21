import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { fetchRepoContributors, fetchRepoCommits } from '@/lib/services/repo-service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accessToken = (session as any).accessToken as string | undefined
  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }

  const { owner, repo } = await params

  try {
    const [allContributors, commits] = await Promise.all([
      fetchRepoContributors(owner, repo, accessToken),
      fetchRepoCommits(owner, repo, accessToken),
    ])

    const contributors = allContributors.slice(0, 10)

    return NextResponse.json(
      { contributors, commits },
      {
        headers: {
          'Cache-Control': 'private, max-age=60',
        },
      }
    )
  } catch (err: any) {
    const status = err?.status ?? 500
    if (status === 404) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: err?.message ?? 'Failed to fetch repository details' },
      { status }
    )
  }
}
