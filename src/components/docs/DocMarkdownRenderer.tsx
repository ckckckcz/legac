'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

interface DocMarkdownRendererProps {
    content?: string;
}

export function DocMarkdownRenderer({ content }: DocMarkdownRendererProps) {
    if (!content) {
        return (
            <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-muted/50">
                <p className="text-muted-foreground">No content available.</p>
            </div>
        );
    }

    return (
        <div className="prose prose-slate dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:mb-6 
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-brand-blue hover:prose-a:underline
      prose-strong:font-semibold
      prose-blockquote:border-l-4 prose-blockquote:border-brand-blue/50 prose-blockquote:bg-brand-blue/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      prose-pre:bg-muted/80 prose-pre:p-4 prose-pre:rounded-xl prose-pre:border
      prose-table:w-full prose-table:border-collapse
      prose-th:bg-muted/50 prose-th:p-2 prose-th:text-left
      prose-td:p-2 prose-td:border-t
    ">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
