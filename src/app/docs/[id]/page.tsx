'use client';

import { useState, useEffect } from 'react';
import { DocsShell } from '@/components/docs/DocsLayout';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocMarkdownRenderer } from '@/components/docs/DocMarkdownRenderer';
import { extractHeadings } from '@/lib/doc-utils';
import { mockDocuments } from '@/lib/mock-data';
import { useSession } from 'next-auth/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Github
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentViewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const document = mockDocuments.find((doc) => doc.id.toString() === params.id);

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

  if (status === 'loading') return <div className="min-h-screen bg-white" />;
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

      <div className="flex w-full bg-white">
        {/* Main Content Area */}
        <main className="flex-1 px-6 lg:px-10 py-10 max-w-4xl mx-auto">
          {/* Header Area with Title & Buttons */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
              {activePage?.name || document.name}
            </h1>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 px-3 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 rounded-md gap-2"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                Copy Page
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 border border-zinc-200 bg-zinc-50/50">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 border border-zinc-200 bg-zinc-50/50">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-[17px] text-zinc-600 leading-7 mb-4">
            {activePageId === 'index' ? 'Documentation overview and file analysis for the current repository.' : `View detailed documentation for ${activePage?.name}.`}
          </div>

          {/* Content */}
          <DocMarkdownRenderer content={content} />

          {/* Footer Nav */}
          <div className="mt-16 flex items-center justify-between border-t border-zinc-100 pt-8">
            {(() => {
              const pages = document.pages || [];
              const currentIndex = pages.findIndex(p => p.id === activePageId);
              const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
              const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

              return (
                <>
                  {prevPage ? (
                    <Link href={`/docs/${document.id}?page=${prevPage.id}`} className="flex flex-col gap-1 group text-left max-w-[45%]">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Previous</span>
                      <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-950 transition-colors line-clamp-1">{prevPage.name}</span>
                    </Link>
                  ) : <div />}

                  {nextPage ? (
                    <Link href={`/docs/${document.id}?page=${nextPage.id}`} className="flex flex-col gap-1 group text-right max-w-[45%]">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Next</span>
                      <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-950 transition-colors line-clamp-1">{nextPage.name}</span>
                    </Link>
                  ) : <div />}
                </>
              );
            })()}
          </div>
        </main>

        {/* Right Sidebar (ToC + Deploy) */}
        <aside className="hidden xl:block w-64 shrink-0 px-6 border-l border-zinc-100">
          <div className="sticky top-[80px] py-10 space-y-10 h-fit">
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold text-zinc-950 mb-4">On This Page</h4>
              <nav className="flex flex-col gap-3">
                {tocEntries.map((entry) => (
                  <a
                    key={entry.anchor}
                    href={entry.anchor}
                    className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    {entry.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Push to Repository Card */}
            <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-4 shadow-sm">
              <h5 className="text-[13px] font-bold text-zinc-950 leading-tight">
                Push to Your Repository
              </h5>
              <p className="text-[12px] text-zinc-500 leading-relaxed">
                Sync your documentation changes directly to your connected GitHub project.
              </p>
              <Button className="w-full bg-zinc-950 text-white hover:bg-zinc-800 h-9 text-xs font-bold rounded-md">
                <Github className="h-3.5 w-3.5 mr-2" />
                Push now
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </DocsShell>
  );
}
