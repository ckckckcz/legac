const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

/**
 * Returns the devicons CDN URL for a given GitHub repository language string.
 * Falls back to null if the language has no known mapping.
 *
 * Icon URL format:
 *   https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-{version}.svg
 */
export function getLanguageIconUrl(language: string | null): string | null {
  if (!language) return null

  const normalized = language.toLowerCase().trim()
  const entry = LANGUAGE_MAP[normalized]
  if (!entry) return null

  const [name, version] = entry
  return `${BASE}/${name}/${name}-${version}.svg`
}

/**
 * Returns a human-readable display name for a language.
 * Mostly preserves the original casing from GitHub, with a few corrections.
 */
export function getLanguageDisplayName(language: string): string {
  return DISPLAY_NAMES[language.toLowerCase().trim()] ?? language
}

/** [deviconName, version] */
type IconEntry = [string, string]

const LANGUAGE_MAP: Record<string, IconEntry> = {
  // Web / scripting
  javascript: ['javascript', 'original'],
  typescript: ['typescript', 'original'],
  html: ['html5', 'original'],
  'html5': ['html5', 'original'],
  css: ['css3', 'original'],
  'css3': ['css3', 'original'],
  scss: ['sass', 'original'],
  sass: ['sass', 'original'],
  less: ['less', 'plain-wordmark'],

  // Systems / compiled
  c: ['c', 'original'],
  'c++': ['cplusplus', 'original'],
  'c#': ['csharp', 'original'],
  rust: ['rust', 'original'],
  go: ['go', 'original'],
  swift: ['swift', 'original'],
  kotlin: ['kotlin', 'original'],
  java: ['java', 'original'],
  scala: ['scala', 'original'],
  dart: ['dart', 'original'],

  // Scripting / dynamic
  python: ['python', 'original'],
  ruby: ['ruby', 'original'],
  php: ['php', 'original'],
  perl: ['perl', 'original'],
  lua: ['lua', 'original'],
  r: ['r', 'original'],
  matlab: ['matlab', 'original'],
  groovy: ['groovy', 'original'],
  elixir: ['elixir', 'original'],
  erlang: ['erlang', 'original'],
  haskell: ['haskell', 'original'],
  clojure: ['clojure', 'original'],
  julia: ['julia', 'original'],
  'f#': ['fsharp', 'original'],

  // Shell / infra
  shell: ['bash', 'original'],
  bash: ['bash', 'original'],
  powershell: ['powershell', 'original'],
  dockerfile: ['docker', 'original'],
  terraform: ['terraform', 'original'],
  nix: ['nixos', 'original'],

  // Data / config
  sql: ['postgresql', 'original'],
  'pl/sql': ['oracle', 'original'],

  // Mobile
  'objective-c': ['objectivec', 'plain'],

  // Markup / other
  vue: ['vuejs', 'original'],
  svelte: ['svelte', 'original'],
  'jupyter notebook': ['jupyter', 'original'],
  coffeescript: ['coffeescript', 'original'],
  elm: ['elm', 'plain'],
  ocaml: ['ocaml', 'original'],
  zig: ['zig', 'original'],
}

const DISPLAY_NAMES: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  html5: 'HTML',
  css: 'CSS',
  css3: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  'c++': 'C++',
  'c#': 'C#',
  'f#': 'F#',
  go: 'Go',
  rust: 'Rust',
  python: 'Python',
  ruby: 'Ruby',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  dart: 'Dart',
  php: 'PHP',
  shell: 'Shell',
  bash: 'Bash',
  dockerfile: 'Docker',
  'jupyter notebook': 'Jupyter',
  'objective-c': 'Obj-C',
  'pl/sql': 'PL/SQL',
}
