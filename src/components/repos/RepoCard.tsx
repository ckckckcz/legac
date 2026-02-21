import { GitHubRepo } from '@/lib/services/repo-service'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, GitFork, Lock, Globe } from 'lucide-react'

interface RepoCardProps {
  repo: GitHubRepo
  onClick: (repo: GitHubRepo) => void
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/50"
      onClick={() => onClick(repo)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {repo.private ? (
              <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            ) : (
              <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
            <span className="font-semibold text-sm truncate">{repo.name}</span>
          </div>
          <Badge
            variant={repo.private ? 'secondary' : 'outline'}
            className="text-xs shrink-0"
          >
            {repo.private ? 'Private' : 'Public'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {repo.description ?? 'No description provided.'}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          {repo.language && (
            <Badge variant="secondary" className="text-xs font-normal">
              {repo.language}
            </Badge>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stargazers_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks_count.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
