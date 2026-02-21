export function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <a href="#" className="flex items-center gap-2 text-lg font-semibold text-gray-900 no-underline">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#wwwwwwwwww" />
          <path
            d="M7 20V8h4.5c1.2 0 2.2.35 2.9 1.05.7.7 1.05 1.6 1.05 2.7 0 1.1-.35 2-.05 2.7-.7.7-1.7 1.05-2.9 1.05H9.5V20H7zm2.5-6.5h1.8c.6 0 1.05-.15 1.35-.45.3-.3.45-.7.45-1.25s-.15-.95-.45-1.25c-.3-.3-.75-.45-1.35-.45H9.5v3.4z"
            fill="white"
          />
          <rect x="17" y="8" width="4" height="12" rx="2" fill="white" opacity="0.7" />
        </svg>
        Legac
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        <li><a href="#" className="text-sm font-medium text-gray-900 no-underline hover:text-green-700">Home</a></li>
        <li><a href="#features" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Features</a></li>
        <li><a href="#testimonial" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Testimonial</a></li>
        <li><a href="#blogs" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Blogs</a></li>
        <li><a href="#about" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">About Us</a></li>
      </ul>

      <a
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#34558b] to-[#2a4a36] border border-[rgba(120,180,140,0.4)] px-6 py-2.5 text-sm font-medium text-white no-underline shadow-[0_0_15px_rgba(61,107,79,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:opacity-90 transition"
      >
        Start for free
        <span className="text-lg font-light">›</span>
      </a>
    </nav>
  )
}
