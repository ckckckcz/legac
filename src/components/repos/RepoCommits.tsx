import { GitHubCommit } from '@/lib/services/repo-service'
import { Skeleton } from '@/components/ui/skeleton'

interface RepoCommitsProps {
  commits: GitHubCommit[]
  loading?: boolean
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export function RepoCommits({ commits, loading }: RepoCommitsProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-start">
            <Skeleton className="h-5 w-16 shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (commits.length === 0) {
    return <p className="text-sm text-muted-foreground">No commits found.</p>
  }

  return (
    <div className="space-y-3">
      {commits.map((commit) => {
        const shortSha = commit.sha.slice(0, 7)
        const firstLine = commit.commit.message.split('\n')[0]

        return (
          <div key={commit.sha} className="flex gap-3 items-start text-sm">
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded hover:bg-accent transition-colors shrink-0 mt-0.5"
            >
              {shortSha}
            </a>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium leading-snug">{firstLine}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {commit.commit.author.name} &middot; {formatDate(commit.commit.author.date)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
