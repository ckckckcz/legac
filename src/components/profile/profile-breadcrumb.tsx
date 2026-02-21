'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Breadcrumb {
  label: string;
  href: string;
  current: boolean;
}

export function ProfileBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', href: '/', current: false },
    { label: 'Profile', href: '/profile', current: pathname === '/profile' },
  ];

  // Add sub-page breadcrumbs
  if (pathname.startsWith('/profile/edit')) {
    breadcrumbs.push({ label: 'Edit', href: '/profile/edit', current: true });
  } else if (pathname.startsWith('/profile/settings')) {
    breadcrumbs.push({ label: 'Settings', href: '/profile/settings', current: true });
  } else if (pathname.startsWith('/profile/activity')) {
    breadcrumbs.push({ label: 'Activity', href: '/profile/activity', current: true });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {breadcrumb.current ? (
            <span className="text-gray-600 font-medium">{breadcrumb.label}</span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
