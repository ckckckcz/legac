'use client';

import { useState, useEffect } from 'react';
import { DocsShell } from '@/components/docs/DocsLayout';
import { TableOfContents, TocEntry } from '@/components/docs/TableOfContents';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocMarkdownRenderer } from '@/components/docs/DocMarkdownRenderer';
import { GitHubRepoSelector } from '@/components/repos/GitHubRepoSelector';
import { extractHeadings } from '@/lib/doc-utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Github,
  Sparkles,
  Search,
  ArrowRight,
  Layout,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const docsContent = `
# Getting Started with Legac

Legac is a high-performance document modernization platform. We help teams transform legacy documentation into clean, structured, and searchable assets using advanced AI.

## Key Features

- **AI-Powered Extraction**: Automatically identify key entities, dates, and relationships in legacy docs.
- **Markdown Modernization**: Convert standard formats (PDF, DOCX) into high-fidelity Markdown.
- **Semantic Search**: Find documents based on intent, not just keywords.
- **Zero-Config Integration**: Connect your repositories and let Legac handle the rest.

## Why Choose Legac?

Working with legacy codebases often means dealing with outdated or missing documentation. Legac solves this by auditing your existing files and generating a modern docs-as-code infrastructure.

### Secure by Design
Your data is encrypted at rest and in transit. We support private repository linking and enterpise-grade auth.

### Developer Experience
Designed with developers in mind. Use our CLI, API, or this web dashboard to manage your documentation lifecycle.
`;

const sections = [
  {
    title: 'General',
    items: [
      { label: 'Introduction', anchor: 'getting-started' },
      { label: 'Key Features', anchor: 'key-features' },
      { label: 'Why Choose Legac?', anchor: 'why-choose-legac' },
    ],
  },
  {
    title: 'Integration',
    items: [
      { label: 'GitHub Sync', anchor: 'github-sync' },
      { label: 'CLI Usage', anchor: 'cli-usage' },
    ],
  },
];

const searchEntries = [
  ...sections[0].items,
  ...sections[1].items,
];

export default function DocsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'github'>('content');
  const tocEntries = extractHeadings(docsContent);

  // Ctrl+K binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <DocsSearch
        entries={searchEntries}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />

      <DocsShell
        sections={sections}
        activeAnchor=""
        onSearchOpen={() => setSearchOpen(true)}
      >
        <div className="container max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5" />
              Product Documentation
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Transform <span className="text-brand-blue">Legacy</span> into Clarity.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Unlock the secrets of your legacy codebases with AI-driven documentation auditing and modernization.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Center Area */}
            <div className="flex-1 min-w-0">
              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-xl border w-fit mb-10">
                <Button
                  variant={activeTab === 'content' ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`gap-2 rounded-lg text-xs font-semibold px-4 transition-all ${activeTab === 'content' ? 'shadow-sm border border-brand-blue/10' : ''}`}
                  onClick={() => setActiveTab('content')}
                >
                  <BookOpen className="h-4 w-4" />
                  Documentation
                </Button>
                <Button
                  variant={activeTab === 'github' ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`gap-2 rounded-lg text-xs font-semibold px-4 transition-all ${activeTab === 'github' ? 'shadow-sm border border-brand-blue/10' : ''}`}
                  onClick={() => setActiveTab('github')}
                >
                  <Github className="h-4 w-4" />
                  Import from GitHub
                </Button>
              </div>

              {activeTab === 'content' ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="bg-white dark:bg-zinc-950 p-8 md:p-12 rounded-3xl border shadow-sm prose-card">
                    <DocMarkdownRenderer content={docsContent} />
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Extraction', icon: Cpu, desc: 'AI entities & metadata extraction.' },
                      { title: 'Modern UI', icon: Layout, desc: 'Clean, responsive design system.' },
                      { title: 'Secure', icon: ShieldCheck, desc: 'Enterprise-grade data security.' },
                    ].map((feat, idx) => (
                      <div key={feat.title} className="p-6 rounded-2xl border bg-muted/10 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all group">
                        <feat.icon className="h-8 w-8 text-brand-blue mb-4 transition-transform group-hover:scale-110" />
                        <h3 className="font-bold mb-2 uppercase tracking-wide text-xs">{feat.title}</h3>
                        <p className="text-sm text-muted-foreground">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-3xl border shadow-sm">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2">Connect Your Repository</h2>
                      <p className="text-muted-foreground text-sm">Select a GitHub repository to sync your documentation with Legac.</p>
                    </div>
                    <GitHubRepoSelector />
                  </div>

                  <div className="p-6 rounded-2xl border-2 border-dashed border-brand-blue/20 bg-brand-blue/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20">
                        <Search className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Looking for private repos?</h4>
                        <p className="text-xs text-muted-foreground mt-1">Make sure you have granted permission in your account settings.</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto text-xs font-bold gap-2">
                        Manage Auth
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Sticky ToC */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-8">
                {activeTab === 'content' && (
                  <div className="p-6 rounded-2xl border bg-muted/5">
                    <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="h-1 w-1 bg-brand-blue rounded-full" />
                      Page Outline
                    </h2>
                    <TableOfContents entries={tocEntries} />
                  </div>
                )}

                <div className="p-6 rounded-2xl border bg-brand-blue text-white shadow-xl shadow-brand-blue/30">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-xs text-brand-blue-hover dark:text-zinc-200 mb-4 leading-relaxed">
                    Join our community Discord or contact support for enterprise queries.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold gap-2">
                    Get Support
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </DocsShell>

      <style jsx global>{`
        .prose-card .prose {
          font-size: 1.0625rem !important;
        }
      `}</style>
    </>
  );
}
