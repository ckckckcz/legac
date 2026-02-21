'use client';

import { useState } from 'react';
import { mockRepos, GitHubRepo } from '@/lib/mock-repos';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, Code2, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function GitHubRepoSelector() {
    const [selectedRepo, setSelectedRepo] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filteredRepos = mockRepos.filter(repo =>
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.language.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search repositories..."
                    className="pl-10 bg-muted/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-brand-blue/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRepos.map((repo) => (
                    <Card
                        key={repo.id}
                        className={`cursor-pointer transition-all duration-300 border-2 hover:border-brand-blue/30 active:scale-[0.98] ${selectedRepo === repo.id ? 'border-brand-blue bg-brand-blue/5' : 'bg-muted/10 border-transparent'
                            }`}
                        onClick={() => setSelectedRepo(repo.id)}
                    >
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-sm font-semibold truncate flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-white dark:bg-zinc-800 border shadow-sm">
                                        <Github className="h-3.5 w-3.5" />
                                    </div>
                                    {repo.name}
                                </CardTitle>
                                {selectedRepo === repo.id && (
                                    <div className="bg-brand-blue text-white p-1 rounded-full shadow-lg animate-in zoom-in duration-300">
                                        <Check className="h-3 w-3" />
                                    </div>
                                )}
                            </div>
                            <CardDescription className="text-xs line-clamp-1 mt-1">
                                {repo.description || 'No description provided.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex items-center gap-3">
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Star className="h-3 w-3 text-amber-500" />
                                {repo.stars}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Code2 className="h-3 w-3 text-blue-500" />
                                {repo.language}
                            </div>
                            <div className="ml-auto text-[10px] text-muted-foreground font-medium">
                                Updated {repo.updatedAt}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="ghost" size="sm" className="text-xs">Cancel</Button>
                <Button
                    disabled={selectedRepo === null}
                    size="sm"
                    className="bg-brand-blue hover:bg-brand-blue-hover text-xs px-6 font-semibold shadow-lg shadow-brand-blue/20"
                >
                    Import Documents
                </Button>
            </div>
        </div>
    );
}
