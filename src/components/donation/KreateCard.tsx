'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Coffee } from 'lucide-react'

const username = process.env.NEXT_PUBLIC_KREATE_USERNAME || 'ckckckcz'

export function KreateCard() {
    return (
        <Card className="group overflow-hidden border-border/50 bg-background/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-colors group-hover:bg-primary/20">
                        <img src="/kreate.png" alt="Kreate" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold tracking-tight">Kreate.gg</span>
                        <span className="text-xs font-normal text-muted-foreground">Global Support</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Support the development via Kreate.gg. Perfect for international supporters and creators.
                </p>
                <Button
                    asChild
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold h-11"
                >
                    <a
                        href={`https://kreate.gg/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Coffee className="w-4 h-4 mr-2" />
                        Support on Kreate.gg
                        <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50" />
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}
