'use client'

import { FileText, Download, Trash2, Eye, Clock, HardDrive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export interface Document {
    id: string | number
    name: string
    type: string
    category?: string
    uploadDate: string
    size: string
    status: 'draft' | 'published' | 'archived' | string
    thumbnail?: string
}

interface DocumentCardProps {
    document: Document
}

const statusConfig: Record<string, { label: string; color: string }> = {
    draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    published: { label: 'Published', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
}

const typeColors: Record<string, string> = {
    'PDF': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Word': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Image': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Spreadsheet': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Presentation': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
}

export function DocumentCard({
    document
}: DocumentCardProps) {
    const { id, name, type, category, uploadDate, size, status, thumbnail } = document
    const currentStatus = statusConfig[status] || statusConfig.draft

    return (
        <div className="group border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Thumbnail Section */}
            <div className="relative w-full h-40 bg-muted flex items-center justify-center overflow-hidden">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <FileText className="w-12 h-12" />
                        <span className="text-xs font-medium">{type}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col">
                {/* Title and Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-sm line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <Badge variant="secondary" className={`flex-shrink-0 text-xs ${currentStatus.color}`}>
                        {currentStatus.label}
                    </Badge>
                </div>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-xs text-muted-foreground flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{category}</span>
                        <Badge variant="outline" className={typeColors[type] || 'bg-slate-100'}>
                            {type}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{uploadDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>{size}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border mt-auto">
                    <Link href={`/docs/${id}`} className="flex-1 min-w-[120px]">
                        <Button
                            variant="default"
                            size="sm"
                            className="w-full shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            title="View document"
                        >
                            <Eye className="w-4 h-4 shrink-0" />
                            <span className="font-medium whitespace-nowrap">Lihat Document</span>
                        </Button>
                    </Link>
                    <div className="flex gap-2 ml-auto">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 hover:bg-primary/5 hover:text-primary transition-colors"
                            title="Download document"
                        >
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 hover:border-red-200 transition-colors"
                            title="Delete document"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
