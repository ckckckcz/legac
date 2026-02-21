export interface Document {
    id: number;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: 'published' | 'draft' | 'archived';
    thumbnail: string;
    content?: string;
}

export const mockDocuments: Document[] = [
    {
        id: 1,
        name: 'Project Proposal 2024',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2024-02-15',
        status: 'published',
        thumbnail: '📄',
        content: `
## Executive Summary
This proposal outlines the strategic plan for revamping the Legac platform to improve user engagement and documentation workflows.

## Objectives
1. **Modernize UI**: Implementing a sleek, premium design.
2. **Improved Performance**: Optimizing load times and AI generation speed.
3. **Enhanced Documentation**: New viewer with Markdown support and ToC.

## Roadmap
1. Phase 1: Authentication & Profile Revamp (Done)
2. Phase 2: Documentation Viewer (Current)
3. Phase 3: AI Integration & Repository Linking (Next)

### Budget Allocation
| Category | Allocation |
| :--- | :--- |
| Development | 60% |
| Design | 25% |
| Operations | 15% |
`
    },
    {
        id: 2,
        name: 'Financial Report Q1',
        type: 'xlsx',
        size: '1.8 MB',
        uploadDate: '2024-02-14',
        status: 'draft',
        thumbnail: '📊',
        content: '# Financial Report Q1\n\nConten for financial report goes here.'
    },
    {
        id: 3,
        name: 'Team Meeting Notes',
        type: 'docx',
        size: '456 KB',
        uploadDate: '2024-02-13',
        status: 'published',
        thumbnail: '📝',
        content: '## Meeting Notes - Feb 13\n\n- Discussed doc viewer\n- Finalized color palette\n- Assigned tasks'
    },
    {
        id: 4,
        name: 'Brand Guidelines',
        type: 'pdf',
        size: '5.2 MB',
        uploadDate: '2024-02-12',
        status: 'published',
        thumbnail: '🎨',
        content: '# Brand Guidelines\n\nUse #34558b for primary brand color.'
    },
    {
        id: 5,
        name: 'Product Roadmap',
        type: 'pptx',
        size: '3.1 MB',
        uploadDate: '2024-02-11',
        status: 'draft',
        thumbnail: '📈',
    },
    {
        id: 6,
        name: 'Company Logo Variations',
        type: 'png',
        size: '2.9 MB',
        uploadDate: '2024-02-10',
        status: 'published',
        thumbnail: '🖼️',
    },
    {
        id: 7,
        name: 'API Documentation',
        type: 'pdf',
        size: '4.5 MB',
        uploadDate: '2024-02-09',
        status: 'published',
        thumbnail: '📚',
    },
    {
        id: 8,
        name: 'Design System Figma',
        type: 'figma',
        size: '8.7 MB',
        uploadDate: '2024-02-08',
        status: 'draft',
        thumbnail: '🎭',
    },
];
