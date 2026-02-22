'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useAuthSession } from '@/lib/use-auth-session'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { LogOut, User, Github, ArrowRight } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { session, isAuthenticated, user, isLoading } = useAuthSession()

  // Hide navbar on docs, profile, and user pages
  const hiddenPaths = ['/profile', '/user', '/login', '/cli-auth', '/docs']
  if (hiddenPaths.some(path => pathname?.startsWith(path))) {
    return null
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 no-underline hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Legac Logo" className="w-10 h-10 object-contain" />
          <span>Legacyver</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 font-medium">
          <li><Link href="/" className="text-sm text-brand-blue no-underline">Home</Link></li>
          <li><Link href="/docs/" className="text-sm text-gray-500 no-underline hover:text-brand-blue transition-colors font-semibold">Docs</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-9 w-[120px] rounded-full" />
          ) : !isAuthenticated ? (
            <Link
              href="/login"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#34558b] pl-5 pr-1.5 py-1.5 text-xs font-semibold text-white no-underline transition-all hover:bg-[#34558b] hover:shadow-xl active:scale-95 shadow-lg shadow-black/10"
            >
              <span className="tracking-wide">Get Started Free</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform  group-hover:-rotate-45">
                <ArrowRight className="h-4 w-4 text-[#0d041a]" />
              </div>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 border-2 border-brand-blue/10 hover:border-brand-blue/30 transition-colors cursor-pointer">
                  <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-brand-blue/5 text-brand-blue text-xs font-bold">
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/user/${user?.id}`} className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/user/${user?.id}/repository`} className="flex items-center gap-2 cursor-pointer">
                    <Github className="h-4 w-4" />
                    <span>Repository</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span className='text-red-500'>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
