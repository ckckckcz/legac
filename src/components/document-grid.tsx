'use client'

import { DocumentCard } from '@/components/document-card'

const mockDocuments = [
    {
        id: 1,
        name: 'Project Proposal 2024',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2024-02-15',
        status: 'published',
        thumbnail: '📄',
    },
    {
        id: 2,
        name: 'Financial Report Q1',
        type: 'xlsx',
        size: '1.8 MB',
        uploadDate: '2024-02-14',
        status: 'draft',
        thumbnail: '📊',
    },
    {
        id: 3,
        name: 'Team Meeting Notes',
        type: 'docx',
        size: '456 KB',
        uploadDate: '2024-02-13',
        status: 'published',
        thumbnail: '📝',
    },
    {
        id: 4,
        name: 'Brand Guidelines',
        type: 'pdf',
        size: '5.2 MB',
        uploadDate: '2024-02-12',
        status: 'published',
        thumbnail: '🎨',
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
]

export function DocumentGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
            ))}
        </div>
    )
}
