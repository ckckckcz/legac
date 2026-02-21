'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Copy, Check, Terminal } from 'lucide-react';

interface DocMarkdownRendererProps {
    content?: string;
}

const Pre = ({ children }: { children?: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);

    const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node?.props?.children) return extractText(node.props.children);
        return '';
    };

    const text = extractText(children);

    const onCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50/50">
            <div className="absolute top-3 right-4 z-10">
                <button
                    onClick={onCopy}
                    className="p-1.5 rounded-md bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-700">
                {children}
            </pre>
        </div>
    );
};

export function DocMarkdownRenderer({ content }: DocMarkdownRendererProps) {
    if (!content) return null;

    return (
        <div className="prose prose-slate max-w-none 
      prose-headings:text-zinc-950 prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-8
      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
      prose-p:text-zinc-600 prose-p:text-[15px] prose-p:leading-[1.7] prose-p:mb-5
      prose-a:text-brand-blue prose-a:underline-offset-4 hover:prose-a:text-brand-blue-hover transition-colors
      prose-strong:text-zinc-950 prose-strong:font-bold
      prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
      prose-li:text-zinc-600 prose-li:text-[15px]
      prose-code:text-zinc-800 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none
    ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                    pre: Pre,
                    h1: ({ node, ...props }) => <h1 className="text-4xl font-bold tracking-tight text-zinc-950 mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mt-12 mb-4 scroll-m-20 border-b border-zinc-100 pb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-zinc-600 font-normal" {...props} />,
                    ul: ({ node, ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-3 text-zinc-600" {...props} />,
                    ol: ({ node, ...props }) => (
                        <ol
                            className="my-10 space-y-6 relative ml-4"
                            style={{
                                listStyleType: 'none',
                                counterReset: 'step-counter',
                                borderLeft: '1px solid #f4f4f5'
                            }}
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li
                            className="relative pl-8 mb-6 last:mb-0 group flex flex-col"
                            style={{ counterIncrement: 'step-counter' }}
                        >
                            <span
                                className="absolute left-[-11px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-zinc-200 bg-white text-[10px] font-bold text-zinc-900 shadow-sm ring-4 ring-white z-10 transition-colors group-hover:border-brand-blue/30 group-hover:text-brand-blue"
                            >
                                <style jsx>{`
                                    span::before { content: counter(step-counter); }
                                `}</style>
                            </span>
                            <div className="text-[15px] leading-relaxed text-zinc-600 group-hover:text-zinc-900 transition-colors">
                                {props.children}
                            </div>
                        </li>
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="my-8 border-l-2 border-zinc-300 pl-6 italic text-zinc-700 bg-zinc-50/50 py-4 rounded-r-lg" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-7 rounded-xl border border-zinc-200 bg-white shadow-sm">
                            <table className="w-full border-collapse text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-zinc-50 border-b border-zinc-200" {...props} />,
                    th: ({ node, ...props }) => <th className="p-4 text-left font-bold text-zinc-950 uppercase tracking-widest text-[10px]" {...props} />,
                    td: ({ node, ...props }) => <td className="p-4 border-t border-zinc-100 text-zinc-600 font-medium" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
