'use client';

import { useState, useEffect } from 'react';
import { DocsShell } from '@/components/docs/DocsLayout';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocMarkdownRenderer } from '@/components/docs/DocMarkdownRenderer';
import { extractHeadings } from '@/lib/doc-utils';
import type { Document } from '@/lib/mock-data';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch document from API
  useEffect(() => {
    if (status !== 'authenticated' || !params.id) return;
    setLoading(true);
    fetch(`/api/docs/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setDocument(data.doc || null);
      })
      .catch(err => {
        console.error('Failed to fetch document:', err);
        setDocument(null);
      })
      .finally(() => setLoading(false));
  }, [status, params.id]);

  // Handle sub-pages
  const activePageId = searchParams.get('page') || 'index';
  const activePage = document?.pages?.find(p => p.id === activePageId);
  const content = activePage ? activePage.content : document?.content;

  const sidebarSections = [
    {
      title: document?.name || 'Documentation',
      items: document?.pages?.map(p => ({
        label: p.name,
        anchor: p.id
      })) || [{ label: 'Overview', anchor: '#' }],
    },
  ];

  const tocEntries = content ? extractHeadings(content) : [];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'loading' || loading) return <div className="min-h-screen bg-white" />;
  if (!document) return <div className="min-h-screen bg-white flex items-center justify-center text-zinc-900">Document not found</div>;

  return (
    <DocsShell
      sections={sidebarSections}
      activeAnchor={activePageId}
      onSearchOpen={() => setSearchOpen(true)}
    >
      <DocsSearch
        entries={tocEntries}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />

      <div className="min-h-full">
        {/* Sticky Header - Style follows Parent Page */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1 text-foreground">
                  {activePage?.name || document.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activePageId === 'index' ? 'Documentation overview and file analysis.' : `Browsing ${activePage?.name}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/user/${session?.user?.id || 'dashboard'}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-xs font-semibold gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Profile
                  </Button>
                </Link>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          {/* Main Content Area */}
          <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto">
            {/* Content Card (Optional: can be plain or on a card) */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-8 lg:p-12">
                <DocMarkdownRenderer content={content} />
              </div>
            </div>

            {/* Footer Nav */}
            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              {(() => {
                const pages = document.pages || [];
                const currentIndex = pages.findIndex(p => p.id === activePageId);
                const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
                const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

                return (
                  <>
                    {prevPage ? (
                      <Link href={`/docs/${document.id}?page=${prevPage.id}`} className="flex flex-col gap-1 group text-left max-w-[45%]">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Previous</span>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{prevPage.name}</span>
                      </Link>
                    ) : <div />}

                    {nextPage ? (
                      <Link href={`/docs/${document.id}?page=${nextPage.id}`} className="flex flex-col gap-1 group text-right max-w-[45%]">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Next</span>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{nextPage.name}</span>
                      </Link>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </main>

          {/* Right Sidebar (ToC) */}
          <aside className="hidden xl:block w-72 shrink-0 px-8 py-10 border-l border-border">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.1em] mb-4">On This Page</h4>
                <nav className="flex flex-col gap-3">
                  {tocEntries.map((entry) => (
                    <a
                      key={entry.anchor}
                      href={entry.anchor}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      {entry.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DocsShell>
  );
}
