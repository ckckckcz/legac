'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Heart } from 'lucide-react'

const username = process.env.NEXT_PUBLIC_SAWERIA_USERNAME || 'ckckckcz'

export function SaweriaCard() {
    return (
        <Card className="group overflow-hidden border-border/50 bg-background/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faad14]/10 border border-[#faad14]/20 transition-colors group-hover:bg-[#faad14]/20">
                        <img src="/saweria.png" alt="Saweria" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold tracking-tight">Saweria</span>
                        <span className="text-xs font-normal text-muted-foreground">Local Payment Methods</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Support the development via Saweria. Supports QRIS, GoPay, OVO, Dana, and LinkAja.
                </p>
                <Button
                    asChild
                    className="w-full bg-[#faad14] hover:bg-[#faad14]/90 text-white font-bold h-11"
                >
                    <a
                        href={`https://saweria.co/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        Donate via Saweria
                        <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}
