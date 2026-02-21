/**
 * Protected Route Wrapper Component
 * Checks session status and redirects unauthenticated users to login
 */

"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * Wrapper component that protects routes requiring authentication
 * Redirects unauthenticated users to login page
 * Shows fallback component while checking session status
 */
export function ProtectedRoute({
  children,
  fallback,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Get current pathname for post-login redirect
      const callbackUrl = typeof window !== "undefined" ? window.location.pathname : "/";
      
      // Redirect to login with callback URL
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [status, router, redirectTo]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return fallback || <LoadingFallback />;
  }

  // Only show content if authenticated
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Show fallback while redirecting
  return fallback || <LoadingFallback />;
}

/**
 * Default loading fallback component
 */
function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
