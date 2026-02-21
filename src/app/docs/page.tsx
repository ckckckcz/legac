'use client'

import { useState, useEffect, useRef } from 'react'
import { DocsShell } from '@/components/docs/DocsLayout'
import { TableOfContents, TocEntry } from '@/components/docs/TableOfContents'
import { DocsSearch } from '@/components/docs/DocsSearch'
import type { DocsSection } from '@/components/docs/DocsLayout'

const sections: DocsSection[] = [
  {
    title: 'Introduction',
    items: [
      { label: 'Getting Started', anchor: 'getting-started' },
      { label: 'Overview', anchor: 'overview' },
      { label: 'Quick Start', anchor: 'quick-start' },
    ],
  },
  {
    title: 'About',
    count: 70,
    items: [
      { label: 'What is Legac?', anchor: 'what-is-legac' },
      { label: 'How it works', anchor: 'how-it-works' },
      { label: 'Key Concepts', anchor: 'key-concepts' },
      { label: 'FAQ', anchor: 'faq' },
    ],
  },
  {
    title: 'Account',
    count: 50,
    items: [
      { label: 'Sign Up', anchor: 'sign-up' },
      { label: 'Login', anchor: 'login' },
      { label: 'Profile Settings', anchor: 'account-settings' },
      { label: 'Billing', anchor: 'billing' },
      { label: 'Security', anchor: 'security' },
    ],
  },
  {
    title: 'AI',
    count: 4,
    items: [
      { label: 'AI Overview', anchor: 'ai-overview' },
      { label: 'Summarization', anchor: 'summarization' },
      { label: 'Search', anchor: 'search' },
      { label: 'Extraction', anchor: 'extraction' },
    ],
  },
  {
    title: 'Blog',
    count: 20,
    items: [
      { label: 'Latest Posts', anchor: 'latest-posts' },
      { label: 'Announcements', anchor: 'announcements' },
      { label: 'Case Studies', anchor: 'case-studies' },
      { label: 'Tutorials', anchor: 'tutorials' },
    ],
  },
]

const tocEntries: TocEntry[] = [
  { label: 'Overview', anchor: '#overview' },
  { label: 'Getting Started', anchor: '#getting-started' },
  { label: 'Uploading Documents', anchor: '#uploading-documents' },
  { label: 'Organizing with Categories', anchor: '#organizing-with-categories' },
  { label: 'Using AI Features', anchor: '#using-ai-features' },
  { label: 'Account Settings', anchor: '#account-settings' },
  { label: 'Frequently Asked Questions', anchor: '#faq' },
]

// Flatten sections into searchable entries for DocsSearch
const searchEntries = sections.flatMap((section) => [
  { label: section.title, anchor: section.items[0]?.anchor ?? '' },
  ...section.items,
])

// Anchor IDs present in the main content (used by IntersectionObserver)
const contentSectionIds = [
  'overview',
  'getting-started',
  'uploading-documents',
  'organizing-with-categories',
  'using-ai-features',
  'account-settings',
  'faq',
]

function useActiveSection(sectionIds: string[]) {
  const [activeAnchor, setActiveAnchor] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    observerRef.current = observer

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])

  return activeAnchor
}

export default function DocsPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const activeAnchor = useActiveSection(contentSectionIds)

  // Ctrl+K / Cmd+K global binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <DocsSearch
        entries={searchEntries}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />

      <DocsShell
        sections={sections}
        activeAnchor={activeAnchor}
        onSearchOpen={() => setSearchOpen(true)}
      >
        <div className="container max-w-4xl mx-auto px-6 py-8">
          {/* Page title */}
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground mb-6">
            Everything you need to get started with Legac and make the most of your document library.
          </p>

          {/* Table of Contents */}
          <TableOfContents entries={tocEntries} />

          {/* Body sections */}
          <section id="overview" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Legac is a document management platform that helps you store, organize, and search your
              important documents. Using AI-powered features, you can extract key information, generate
              summaries, and find exactly what you need — fast.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you&apos;re managing a small collection of personal files or a large enterprise
              document library, Legac provides the tools you need to stay organized and efficient.
            </p>
          </section>

          <section id="getting-started" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To get started with Legac, create an account and sign in. Once authenticated, you&apos;ll
              land on the main dashboard where you can upload your first document using the{' '}
              <strong>Upload Document</strong> button in the sidebar.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Documents are automatically indexed upon upload, making them immediately searchable.
              You can organize documents into categories, add tags, and use the AI tools to extract
              meaningful insights from your content.
            </p>
          </section>

          <section id="uploading-documents" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Uploading Documents</h2>
            <p className="text-muted-foreground leading-relaxed">
              Supported file types include PDF, DOCX, TXT, and Markdown. Click{' '}
              <strong>Upload Document</strong> in the sidebar, select your file, and Legac will
              process and index it in the background. Large files may take a few moments to process
              — you&apos;ll be notified when they&apos;re ready.
            </p>
          </section>

          <section id="organizing-with-categories" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Organizing with Categories</h2>
            <p className="text-muted-foreground leading-relaxed">
              Categories let you group related documents together. You can assign a document to one
              or more categories from the document detail view. Use the sidebar&apos;s{' '}
              <strong>Categories</strong> view to browse all documents within a specific category.
            </p>
          </section>

          <section id="using-ai-features" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Using AI Features</h2>
            <p className="text-muted-foreground leading-relaxed">
              Legac&apos;s AI capabilities include automatic summarization, semantic search, and
              structured data extraction. These features are available on supported document types
              and can be accessed from the document detail view under the <strong>AI</strong> tab.
            </p>
          </section>

          <section id="account-settings" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
            <p className="text-muted-foreground leading-relaxed">
              Manage your profile, connected accounts, and notification preferences from the{' '}
              <strong>Profile</strong> page, accessible via the sidebar. Security settings including
              session management and connected OAuth providers are also available there.
            </p>
          </section>

          <section id="faq" className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Q: Is my data private?</strong>
              <br />
              Yes. Your documents are stored securely and are only accessible to your account.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Q: What file size limits apply?</strong>
              <br />
              Individual file uploads are currently limited to 50 MB. Contact support if you need to
              process larger files.
            </p>
          </section>
        </div>
      </DocsShell>
    </>
  )
}
