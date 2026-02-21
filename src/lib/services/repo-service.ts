export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  visibility: string
}

export interface GitHubContributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface GitHubCommit {
  sha: string
  html_url: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
}

async function githubFetch<T>(url: string, accessToken: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (!res.ok) {
    let message = res.statusText
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // ignore json parse errors
    }
    throw Object.assign(new Error(message), { status: res.status })
  }

  return res.json() as Promise<T>
}

export async function fetchUserRepos(accessToken: string): Promise<GitHubRepo[]> {
  return githubFetch<GitHubRepo[]>(
    'https://api.github.com/user/repos?per_page=30&sort=updated',
    accessToken
  )
}

export async function fetchRepoContributors(
  owner: string,
  repo: string,
  accessToken: string
): Promise<GitHubContributor[]> {
  return githubFetch<GitHubContributor[]>(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    accessToken
  )
}

export async function fetchRepoCommits(
  owner: string,
  repo: string,
  accessToken: string
): Promise<GitHubCommit[]> {
  return githubFetch<GitHubCommit[]>(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
    accessToken
  )
}
