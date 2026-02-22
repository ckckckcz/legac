import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Banner() {
    return (
        <section className="w-full py-8 text-black sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12" style={{ background: 'linear-gradient(135deg, #ffff 0%, #ffff 60%, rgba(52, 85, 139, 0.3) 100%)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Label */}
                <div className="inline-block mb-3 sm:mb-4 md:mb-6">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Work Showcase</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight max-w-3xl">
                    Ready to Take Your Business to the Next Level with Powerful IT Solutions?{' '}
                    <ArrowRight className="inline-block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-1 sm:ml-2 mb-1" />
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-base lg:text-lg text-black/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                    With years of hands-on experience in SaaS development, cloud architecture, and enterprise IT services, we empower businesses to adapt to changing technologies, scale operations seamlessly, and thrive in an increasingly competitive digital world.
                </p>

                {/* CTA Button */}
                <Button
                    variant="default"
                    size="sm"
                    className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm"
                >
                    Get a Free Consultation
                </Button>
            </div>
        </section>
    )
}
