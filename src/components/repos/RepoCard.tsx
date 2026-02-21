import { GitHubRepo } from '@/lib/services/repo-service'
import { getLanguageIconUrl, getLanguageDisplayName } from '@/lib/utils/language-icon'
import { Card } from '@/components/ui/card'
import { Star, GitFork, Lock, Globe, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepoCardProps {
  repo: GitHubRepo
  onClick: (repo: GitHubRepo) => void
}

function LanguageIndicator({ language }: { language: string }) {
  const iconUrl = getLanguageIconUrl(language)
  const displayName = getLanguageDisplayName(language)

  return (
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/70">
      {iconUrl && (
        <img
          src={iconUrl}
          alt={displayName}
          width={12}
          height={12}
          className="shrink-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
        />
      )}
      <span>{displayName}</span>
    </div>
  )
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  const lastUpdated = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
      onClick={() => onClick(repo)}
    >
      <div className="absolute right-3 top-3">
        <div className={cn(
          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          repo.private
            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        )}>
          {repo.private ? <Lock size={10} /> : <Globe size={10} />}
          {repo.private ? 'Private' : 'Public'}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 pr-16">
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors group-hover:border-primary/20 group-hover:bg-primary/5",
            repo.private ? "border-amber-500/20 bg-amber-500/5" : "border-emerald-500/20 bg-emerald-500/5"
          )}>
            {repo.private ? (
              <Lock className="h-4 w-4 text-amber-600/70" />
            ) : (
              <Globe className="h-4 w-4 text-emerald-600/70" />
            )}
          </div>
          <h3 className="truncate text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {repo.name}
          </h3>
        </div>

        <p className="line-clamp-2 min-h-[32px] text-xs leading-relaxed text-muted-foreground/80">
          {repo.description ?? 'No description provided.'}
        </p>
        <div className="mt-1 flex items-center justify-between border-t border-border/40 pt-3">
          <div className="flex items-center gap-4">
            {repo.language && <LanguageIndicator language={repo.language} />}

            <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
              <div className="flex items-center gap-1 group-hover:text-amber-500 transition-colors">
                <Star className="h-3 w-3" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                <GitFork className="h-3 w-3" />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/40">
            <Calendar size={10} />
            <span>{lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </Card>
  )
}
