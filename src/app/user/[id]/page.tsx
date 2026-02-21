"use client";

import * as React from "react";
import { use } from "react";
import {
    FileText,
    MoreVertical,
    Plus,
    Search,
    File,
    Clock,
    Download,
    Settings2,
    FileCode,
    FileImage,
    Filter,
    ArrowUpRight,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const documents = [
    {
        id: "1",
        name: "System Architecture - v1.pdf",
        type: "pdf",
        updatedAt: "2 hours ago",
        size: "2.4 MB",
        status: "Updated",
        color: "text-red-500",
        bgColor: "bg-red-50"
    },
    {
        id: "2",
        name: "API Documentation.docx",
        type: "docx",
        updatedAt: "Yesterday",
        size: "1.1 MB",
        status: "Published",
        color: "text-blue-500",
        bgColor: "bg-blue-50"
    },
    {
        id: "3",
        name: "Database Schema.sql",
        type: "sql",
        updatedAt: "3 days ago",
        size: "450 KB",
        status: "Draft",
        color: "text-amber-500",
        bgColor: "bg-amber-50"
    },
    {
        id: "4",
        name: "User Authentication Flow.png",
        type: "image",
        updatedAt: "1 week ago",
        size: "3.8 MB",
        status: "Final",
        color: "text-emerald-500",
        bgColor: "bg-emerald-50"
    },
    {
        id: "5",
        name: "Quarterly Report Q4.pdf",
        type: "pdf",
        updatedAt: "2 weeks ago",
        size: "5.2 MB",
        status: "Archived",
        color: "text-red-500",
        bgColor: "bg-red-50"
    },
    {
        id: "6",
        name: "Frontend Components.tsx",
        type: "tsx",
        updatedAt: "3 weeks ago",
        size: "12 KB",
        status: "Active",
        color: "text-cyan-500",
        bgColor: "bg-cyan-50"
    }
];

interface UserManageDocumentProps {
    params: Promise<{ id: string }>;
}

export default function UserManageDocument({ params }: UserManageDocumentProps) {
    const { id } = use(params);

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="size-6" />;
            case 'docx': return <FileText className="size-6" />;
            case 'sql': return <FileCode className="size-6" />;
            case 'tsx': return <FileCode className="size-6" />;
            case 'image': return <FileImage className="size-6" />;
            default: return <File className="size-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Breadcrumb / Top Nav */}
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <span className="hover:text-gray-600 cursor-pointer transition-colors">Dashboard</span>
                    <ChevronRight className="size-4 opacity-50" />
                    <span className="hover:text-gray-600 cursor-pointer transition-colors">Users</span>
                    <ChevronRight className="size-4 opacity-50" />
                    <span className="text-gray-900 font-bold">User {id}</span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Manage Documents
                        </h1>
                        <p className="text-lg text-gray-500 max-w-2xl font-medium">
                            Organize, upload, and monitor all documentation associated with this user profile.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 rounded-2xl border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold px-6 shadow-sm transition-all cursor-pointer">
                            Export Data
                        </Button>
                        <Button className="bg-[#34558b] hover:bg-[#2a4a36] text-white rounded-2xl px-8 h-12 gap-2 shadow-xl shadow-[#34558b]/20 transition-all font-bold cursor-pointer">
                            <Plus className="size-5" strokeWidth={3} />
                            Upload New
                        </Button>
                    </div>
                </div>

                {/* Search and Filters Bar */}
                <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <Input
                            placeholder="Search by filename, type or status..."
                            className="pl-13 h-14 bg-transparent border-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-400 font-medium text-base"
                        />
                    </div>
                    <div className="h-14 w-px bg-gray-100 hidden md:block" />
                    <div className="flex items-center gap-2 px-2">
                        <Button variant="ghost" className="h-12 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 gap-2 px-5 font-bold text-sm transition-colors cursor-pointer">
                            <Filter className="size-4" />
                            Status
                        </Button>
                        <Button variant="ghost" className="h-12 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 gap-2 px-5 font-bold text-sm transition-colors cursor-pointer">
                            <Settings2 className="size-4" />
                            Sort
                        </Button>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {documents.map((doc) => (
                        <Card key={doc.id} className="group relative bg-white border-gray-100 hover:border-[#34558b]/30 hover:shadow-[0_25px_50px_-12px_rgba(52,85,139,0.12)] transition-all duration-500 rounded-[2rem] overflow-hidden border-2 shadow-sm">
                            <CardHeader className="pb-3 pt-8 px-8">
                                <CardAction>
                                    <Button variant="ghost" size="icon-sm" className="bg-gray-50/80 hover:bg-gray-100 text-gray-400 rounded-xl transition-colors">
                                        <MoreVertical className="size-4" />
                                    </Button>
                                </CardAction>
                                <div className={`size-16 rounded-[1.25rem] ${doc.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner`}>
                                    <div className={doc.color}>
                                        {getFileIcon(doc.type)}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <CardTitle className="text-xl font-extrabold text-gray-900 group-hover:text-[#34558b] transition-colors leading-tight line-clamp-1">
                                        {doc.name}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-gray-100/80 text-[10px] text-gray-500 font-black uppercase tracking-widest border-none px-2.5 h-5 rounded-md">
                                            {doc.type}
                                        </Badge>
                                        <span className="text-[12px] text-gray-300 font-bold">•</span>
                                        <span className="text-[12px] text-gray-400 font-bold tracking-tight">{doc.size}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-8 pb-6">
                                <div className="flex items-center justify-between pt-5 border-t border-gray-50/80">
                                    <div className="flex items-center gap-2 text-[12px] text-gray-400 font-bold">
                                        <Clock className="size-4 text-gray-300" />
                                        {doc.updatedAt}
                                    </div>
                                    <div className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${doc.status === 'Updated' ? 'bg-emerald-50 text-emerald-600' :
                                            doc.status === 'Published' ? 'bg-blue-50 text-blue-600' :
                                                doc.status === 'Draft' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-gray-50 text-gray-500'
                                        }`}>
                                        {doc.status}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="px-8 pb-8 flex gap-3">
                                <Button className="flex-1 bg-white hover:bg-[#34558b] hover:text-white text-gray-900 border-2 border-gray-50 shadow-sm rounded-2xl h-12 font-black text-xs gap-2 transition-all cursor-pointer group/btn uppercase tracking-tight">
                                    Manage File
                                    <ArrowUpRight className="size-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                                </Button>
                                <Button variant="outline" size="icon" className="size-12 rounded-2xl border-2 border-gray-50 bg-gray-50/30 text-gray-400 hover:text-[#34558b] hover:bg-[#34558b]/5 transition-all cursor-pointer">
                                    <Download className="size-5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {/* Empty Add Card */}
                    <button className="group relative bg-white/60 border-3 border-dashed border-gray-200 hover:border-[#34558b]/40 hover:bg-white hover:shadow-2xl hover:shadow-[#34558b]/10 transition-all duration-500 rounded-[2rem] flex flex-col items-center justify-center gap-6 p-10 min-h-[350px] cursor-pointer">
                        <div className="size-20 rounded-3xl bg-gray-100 group-hover:bg-[#34558b] group-hover:scale-110 group-hover:rotate-12 flex items-center justify-center transition-all duration-500 shadow-sm">
                            <Plus className="size-8 text-gray-400 group-hover:text-white transition-colors" strokeWidth={3} />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">New Document</h3>
                            <p className="text-sm text-gray-400 font-bold max-w-[150px]">Drag and drop files or click to upload</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#34558b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
