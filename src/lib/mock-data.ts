export interface DocumentSubPage {
  id: string;
  name: string;
  content: string;
}

export interface Document {
  id: number | string;
  name: string;
  type: string;
  category?: string;
  size: string;
  uploadDate: string;
  status: 'published' | 'draft' | 'archived';
  thumbnail: string;
  description?: string;
  content?: string;
  pages?: DocumentSubPage[];
}

export const mockDocuments: Document[] = [
  {
    id: 'legacyver-docs',
    name: 'Legacyver: Core Analysis',
    type: 'Documentation',
    category: 'Generated AI',
    size: '12.4 KB',
    uploadDate: '2026-02-22',
    status: 'published',
    thumbnail: '📚',
    description: 'Deep dive analysis of the Legac codebase, covering architecture, auth, and UI components.',
    pages: [
      {
        id: 'index',
        name: 'Overview',
        content: `# Legac — Codebase Documentation\n\n**Primary language:** typescript  \n**Total files:** 106  \n**Analyzed at:** 2026-02-22T03:46:32.751Z  \n\n## Core Architecture\nThis documentation covers the main entry points and critical logic of the Legac platform.\n\n## Key Modules\n- [Landing Page](landing-about)\n- [Authentication System](auth)\n- [UI Components](components-overview)\n- [Document Management](document-card)`
      },
      {
        id: 'landing-about',
        name: 'Landing: About Section',
        content: `## Overview\nThis is a React component for the homepage of a web application that provides a hero section with animated text, a codebase legacy tool description, and installation instructions.\n\n## Key Features\n- Animated text using SplitText\n- Hero section with decorative gradients\n- Installation command with clipboard functionality\n\n## Dependencies\n- lucide-react (Copy, Check)\n- @/components/ui/install-command\n- @/components/ui/split-text`
      },
      {
        id: 'auth',
        name: 'Authentication System',
        content: `## Overview\nThis file configures NextAuth for GitHub OAuth authentication, handling authentication flows, token management, and session management using GitHub as the provider.\n\n## Core Functions\n\n### jwt\nProcesses JWT token creation and updates. Sets user ID, email, and image from the user object. Sets username and GitHub ID from the profile.\n\n### session\nProcesses session object creation and updates. Adds username and stores access token if present.\n\n## Dependencies\n- next-auth\n- next-auth/providers/github`
      },
      {
        id: 'document-card',
        name: 'Component: DocumentCard',
        content: `## Overview\nThis component displays document information and provides functionality to download documents as ZIP files. The DocumentCard component renders a card showing document metadata.\n\n## Functionality\n### handleDownload\nHandles downloading the document as a ZIP file. Creates a ZIP archive containing either all pages of a multi-page document or single document content.\n\n## Dependencies\n- jszip\n- lucide-react`
      },
      {
        id: 'components-overview',
        name: 'UI Components Analysis',
        content: `## Overview\nAnalysis of reusable components used across the platform.\n\n### Navbar\nMain navigation header with logo and primary actions.\n\n### Sidebar\nGlobal application navigation with narrow/expanded states.\n\n### Button & Input\nBase UI elements following the brand design system.`
      }
    ]
  },
  {
    id: 'fin-q4-2025',
    name: 'Q4 2025 Financial Report.pdf',
    type: 'PDF',
    category: 'Finance',
    size: '2.4 MB',
    uploadDate: '2026-02-15',
    status: 'published',
    thumbnail: '📊',
    description: 'Comprehensive financial analysis for the fourth quarter of 2025.'
  },
  {
    id: 'eng-api-specs',
    name: 'REST API Specification v2.0',
    type: 'Documentation',
    category: 'Engineering',
    size: '456 KB',
    uploadDate: '2026-02-20',
    status: 'draft',
    thumbnail: '🛠️',
    description: 'Updated API endpoints and data models for version 2.0.'
  },
  {
    id: 'mkt-campaign-2026',
    name: 'Spring 2026 Marketing Strategy',
    type: 'Word',
    category: 'Marketing',
    size: '1.2 MB',
    uploadDate: '2026-02-10',
    status: 'published',
    thumbnail: '📢',
    description: 'Outline for the upcoming spring marketing campaign across all channels.'
  },
  {
    id: 'hr-handbook',
    name: 'Employee Handbook 2026',
    type: 'Documentation',
    category: 'HR',
    size: '890 KB',
    uploadDate: '2026-01-05',
    status: 'archived',
    thumbnail: '👥',
    description: 'Internal policies and guidelines for all employees.'
  },
  {
    id: 'st-growth-plan',
    name: 'Growth & Expansion Plan',
    type: 'Presentation',
    category: 'Strategy',
    size: '5.1 MB',
    uploadDate: '2026-02-18',
    status: 'published',
    thumbnail: '📈',
    description: 'Roadmap for market expansion and revenue growth over the next 3 years.'
  }
];
