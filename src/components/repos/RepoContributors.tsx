import { GitHubContributor } from '@/lib/services/repo-service'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

interface RepoContributorsProps {
  contributors: GitHubContributor[]
  loading?: boolean
}

export function RepoContributors({ contributors, loading }: RepoContributorsProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    )
  }

  if (contributors.length === 0) {
    return <p className="text-sm text-muted-foreground">No contributors found.</p>
  }

  return (
    <div className="space-y-2">
      {contributors.map((contributor) => {
        const initials = contributor.login.slice(0, 2).toUpperCase()

        return (
          <a
            key={contributor.login}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="flex-1 text-sm font-medium">{contributor.login}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {contributor.contributions.toLocaleString()}
            </span>
          </a>
        )
      })}
    </div>
  )
}
