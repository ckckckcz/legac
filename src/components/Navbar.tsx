'use client'

import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  // Hide navbar on docs, profile, and user pages
  const hiddenPaths = ['/profile', '/user', '/login']
  if (hiddenPaths.some(path => pathname?.startsWith(path))) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-gray-900 no-underline hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-base">L</div>
          <span>Legac</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 font-medium">
          <li><a href="#" className="text-sm text-brand-blue no-underline">Home</a></li>
          <li><a href="#features" className="text-sm text-gray-500 no-underline hover:text-brand-blue transition-colors font-semibold">Features</a></li>
          <li><a href="#why-us" className="text-sm text-gray-500 no-underline hover:text-brand-blue transition-colors font-semibold">Why Us</a></li>
          <li><a href="#about" className="text-sm text-gray-500 no-underline hover:text-brand-blue transition-colors font-semibold">About Us</a></li>
        </ul>

        <a
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-lg shadow-brand-blue/20 hover:bg-brand-blue-hover transition-all hover:scale-105 active:scale-95"
        >
          Start for free
          <span className="text-lg">›</span>
        </a>
      </div>
    </nav>
  )
}
