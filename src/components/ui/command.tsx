"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react";

type PackageManager = "npm" | "pnpm"

export default function InstallCommand() {
    const [packageManager, setPackageManager] = useState<PackageManager>("pnpm")
    const [copied, setCopied] = useState(false)

    const commands: Record<PackageManager, string> = {
        npm: "npm install legac",
        pnpm: "pnpm add legac",
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(commands[packageManager])
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <div className="mt-6 w-full max-w-2xl">
            {/* Command Box */}
            <div className="rounded-lg border border-border bg-card">
                {/* Package Manager Selector */}
                <div className="flex items-center gap-2 border-b border-border/50 p-2">
                    <div className="flex items-center justify-center w-6 h-6 text-muted-foreground">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    {(["pnpm", "npm"] as PackageManager[]).map((pm) => (
                        <button
                            key={pm}
                            onClick={() => setPackageManager(pm)}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${packageManager === pm
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {pm}
                        </button>
                    ))}
                    <button
                        onClick={handleCopy}
                        className="ml-auto flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </button>
                </div>

                {/* Command Text */}
                <code className="block text-sm text-start font-mono text-foreground select-all p-3">
                    {commands[packageManager]}
                </code>
            </div>
        </div>
    )
}
