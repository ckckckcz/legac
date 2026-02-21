'use client'

import { useEffect, useState } from 'react'
import { GitHubRepo, GitHubContributor, GitHubCommit } from '@/lib/services/repo-service'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RepoContributors } from './RepoContributors'
import { RepoCommits } from './RepoCommits'
import { Star, GitFork, ExternalLink, Wand2 } from 'lucide-react'

interface RepoDetailProps {
  repo: GitHubRepo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface DetailData {
  contributors: GitHubContributor[]
  commits: GitHubCommit[]
}

export function RepoDetail({ repo, open, onOpenChange }: RepoDetailProps) {
  const [detail, setDetail] = useState<DetailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !repo) {
      setDetail(null)
      setError(null)
      return
    }

    const [owner, repoName] = repo.full_name.split('/')
    setLoading(true)
    setError(null)

    fetch(`/api/repos/${owner}/${repoName}/detail`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error ?? `Error ${res.status}`)
        }
        return res.json() as Promise<DetailData>
      })
      .then((data) => {
        setDetail(data)
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load details')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [open, repo])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        {repo && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-start justify-between gap-2 pr-6">
                <div className="min-w-0">
                  <SheetTitle className="text-base font-semibold leading-tight truncate">
                    {repo.full_name}
                  </SheetTitle>
                  <SheetDescription className="mt-1 line-clamp-2">
                    {repo.description ?? 'No description provided.'}
                  </SheetDescription>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
                  title="View on GitHub"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {repo.language && (
                  <Badge variant="secondary" className="text-xs">
                    {repo.language}
                  </Badge>
                )}
                <Badge variant={repo.private ? 'secondary' : 'outline'} className="text-xs">
                  {repo.private ? 'Private' : 'Public'}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count.toLocaleString()}
                </span>
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="py-5 space-y-6">
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                {/* Contributors */}
                <section>
                  <h3 className="text-sm font-semibold mb-3">Contributors</h3>
                  <RepoContributors
                    contributors={detail?.contributors ?? []}
                    loading={loading}
                  />
                </section>

                {/* Commits */}
                <section>
                  <h3 className="text-sm font-semibold mb-3">Recent Commits</h3>
                  <RepoCommits
                    commits={detail?.commits ?? []}
                    loading={loading}
                  />
                </section>
              </div>
            </ScrollArea>

            {/* Footer: Generate button */}
            <div className="px-6 py-4 border-t">
              <div className="flex flex-col gap-1.5">
                <Button disabled className="w-full gap-2">
                  <Wand2 className="h-4 w-4" />
                  Generate Legacy Code
                </Button>
                <p className="text-xs text-muted-foreground text-center">Coming soon</p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
