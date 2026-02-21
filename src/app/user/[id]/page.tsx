'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { DocumentGrid } from '@/components/document-grid'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, Filter, Plus, X } from 'lucide-react'

// Mock data untuk documents
const mockDocuments = [
    {
        id: '1',
        name: 'Q4 Financial Report 2024',
        type: 'PDF',
        category: 'Finance',
        uploadDate: 'Dec 15, 2024',
        size: '2.4 MB',
        status: 'published' as const,
        thumbnail: undefined,
    },
    {
        id: '2',
        name: 'Project Proposal - Website Redesign',
        type: 'Word',
        category: 'Projects',
        uploadDate: 'Dec 10, 2024',
        size: '1.2 MB',
        status: 'draft' as const,
        thumbnail: undefined,
    },
    {
        id: '3',
        name: 'Team Photo from Conference',
        type: 'Image',
        category: 'Marketing',
        uploadDate: 'Dec 8, 2024',
        size: '3.8 MB',
        status: 'published' as const,
        thumbnail: undefined,
    },
    {
        id: '4',
        name: 'Budget Spreadsheet Q1 2025',
        type: 'Spreadsheet',
        category: 'Finance',
        uploadDate: 'Dec 5, 2024',
        size: '856 KB',
        status: 'draft' as const,
        thumbnail: undefined,
    },
    {
        id: '5',
        name: 'Product Launch Presentation',
        type: 'Presentation',
        category: 'Marketing',
        uploadDate: 'Nov 28, 2024',
        size: '4.2 MB',
        status: 'published' as const,
        thumbnail: undefined,
    },
    {
        id: '6',
        name: 'Employee Handbook 2025',
        type: 'PDF',
        category: 'HR',
        uploadDate: 'Nov 20, 2024',
        size: '1.9 MB',
        status: 'published' as const,
        thumbnail: undefined,
    },
    {
        id: '7',
        name: 'UI Design System Assets',
        type: 'Presentation',
        category: 'Design',
        uploadDate: 'Nov 15, 2024',
        size: '5.1 MB',
        status: 'archived' as const,
        thumbnail: undefined,
    },
    {
        id: '8',
        name: 'Customer Analytics Data',
        type: 'Spreadsheet',
        category: 'Analytics',
        uploadDate: 'Nov 10, 2024',
        size: '2.1 MB',
        status: 'published' as const,
        thumbnail: undefined,
    },
]

const categories = ['All', 'Finance', 'Projects', 'Marketing', 'HR', 'Design', 'Analytics']
const fileTypes = ['All', 'PDF', 'Word', 'Image', 'Spreadsheet', 'Presentation']

export default function DocumentManagementPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedType, setSelectedType] = useState('All')

    // Filter documents based on search and filters
    const filteredDocuments = mockDocuments.filter((doc) => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
        const matchesType = selectedType === 'All' || doc.type === selectedType
        return matchesSearch && matchesCategory && matchesType
    })

    const handleUpload = () => {
        setShowUploadModal(true)
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onUploadClick={handleUpload} />

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Upload Document</h2>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="p-1 hover:bg-accent rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
                            <p className="text-sm text-muted-foreground">Drag and drop your file here or click to browse</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setShowUploadModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button className="flex-1">Upload</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:ml-0">
                {/* Top Navigation Bar */}
                <div className="sticky top-0 z-20 border-b border-border bg-background">
                    <div className="p-6">
                        <div className="flex flex-col gap-4">
                            {/* Header */}
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Document Management</h1>
                                <p className="text-muted-foreground">
                                    Manage and organize all your documents in one place
                                </p>
                            </div>

                            {/* Search and Controls */}
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search Bar */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search documents..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>

                                {/* Upload Button - Desktop */}
                                <Button
                                    onClick={handleUpload}
                                    className="bg-primary hover:bg-primary/90 hidden md:flex"
                                    size="lg"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Upload
                                </Button>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Filter className="w-4 h-4" />
                                    <span>Filter by:</span>
                                </div>

                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-full md:w-48">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="w-full md:w-48">
                                        <SelectValue placeholder="File Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fileTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="p-6">
                    {filteredDocuments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDocuments.map((doc) => (
                                <DocumentCard key={doc.id} document={doc} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <span className="text-2xl">📄</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">No documents found</h3>
                            <p className="text-muted-foreground mb-4">
                                Try adjusting your search or filters to find what you're looking for
                            </p>
                            <Button onClick={handleUpload} variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Upload Your First Document
                            </Button>
                        </div>
                    )}

                    {/* Results Count */}
                    <div className="mt-8 text-sm text-muted-foreground text-center">
                        Showing {filteredDocuments.length} of {mockDocuments.length} documents
                    </div>
                </div>
            </main>
        </div>
    )
}
