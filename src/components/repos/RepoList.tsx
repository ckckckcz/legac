'use client'

import { useEffect, useState } from 'react'
import { GitHubRepo } from '@/lib/services/repo-service'
import { RepoCard } from './RepoCard'
import { RepoDetail } from './RepoDetail'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Info } from 'lucide-react'

export function RepoList() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [publicOnly, setPublicOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    fetch('/api/repos')
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error ?? `Error ${res.status}`)
        }
        return res.json() as Promise<GitHubRepo[]>
      })
      .then((data) => {
        setRepos(data)
        // If every repo is public, we're likely missing the repo scope
        const hasPrivate = data.some((r) => r.private)
        setPublicOnly(!hasPrivate && data.length > 0)
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load repositories')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleCardClick(repo: GitHubRepo) {
    setSelectedRepo(repo)
    setSheetOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Public-only notice */}
      {publicOnly && !loading && (
        <div className="flex items-start gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 shrink-0" />
          <span>
            Showing public repositories only. Grant <code>repo</code> access to see private
            repositories.
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-14" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Repo grid */}
      {!loading && !error && (
        <>
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} onClick={handleCardClick} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <p className="font-medium">No repositories found</p>
              {searchQuery && (
                <p className="text-sm mt-1">
                  No results for &ldquo;{searchQuery}&rdquo;. Try a different search.
                </p>
              )}
            </div>
          )}
          {repos.length > 0 && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>
          )}
        </>
      )}

      {/* Detail sheet */}
      <RepoDetail
        repo={selectedRepo}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
