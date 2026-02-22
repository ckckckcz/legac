'use client'

import { DocumentCard } from '@/components/document-card'
import type { Document } from '@/lib/mock-data'

interface DocumentGridProps {
    documents?: Document[]
}

export function DocumentGrid({ documents = [] }: DocumentGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
            ))}
        </div>
    )
}
