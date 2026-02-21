'use client'

import { DocumentCard } from '@/components/document-card'
import { mockDocuments } from '@/lib/mock-data'


export function DocumentGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
            ))}
        </div>
    )
}
