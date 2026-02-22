import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import SplitText from '@/components/ui/split-text'

export default function Banner() {
    return (
        <section className="w-full py-8 text-black sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12" style={{ background: 'linear-gradient(135deg, #ffff 0%, #ffff 60%, rgba(52, 85, 139, 0.3) 100%)' }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 leading-tight max-w-3xl">
                    <SplitText
                        text="Stop guessing. Start understanding your legacy codebases today."
                        delay={40}
                        duration={1}
                        splitType="words"
                        textAlign="left"
                    />
                </h1>

                {/* Description */}
                <div className="mb-4 sm:mb-6 max-w-2xl">
                    <SplitText
                        text="Legac automatically scans your existing projects to generate comprehensive technical documentation, dependency maps, and architectural insights, helping your team move faster with less risk."
                        className="text-sm sm:text-base md:text-base lg:text-lg text-black/90 leading-relaxed"
                        delay={15}
                        duration={1.2}
                        splitType="words"
                        textAlign="left"
                    />
                </div>

                {/* CTA Button */}
                <Link href="/docs/installation">
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-black text-white hover:bg-zinc-800 font-semibold px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm"
                    >
                        Read Docs
                    </Button>
                </Link>
            </div>
        </section>
    )
}
