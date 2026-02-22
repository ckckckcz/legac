"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";


// Allowed redirect URLs to prevent open redirect vulnerabilities
const ALLOWED_REDIRECT_URLS = [
    "/user/dashboard",
    "/profile",
    "/home",
    "/",
];

function isAllowedRedirectUrl(url: string): boolean {
    // Only allow relative URLs that start with /
    if (!url.startsWith("/")) return false;

    // Check against whitelist
    return ALLOWED_REDIRECT_URLS.some(allowed => url.startsWith(allowed));
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callbackUrl = searchParams.get("callbackUrl") || "/user/dashboard";
    const oauthError = searchParams.get("error");

    // Redirect authenticated users away from login page
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            // Validate and redirect to callback URL
            const redirectUrl = isAllowedRedirectUrl(callbackUrl) ? callbackUrl : "/user/dashboard";
            router.push(redirectUrl);
        }
    }, [status, session, callbackUrl, router]);

    // Display OAuth error if present
    useEffect(() => {
        if (oauthError) {
            setError(getErrorMessage(oauthError));
        }
    }, [oauthError]);

    const handleGitHubSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Validate callback URL for security
            const validCallbackUrl = isAllowedRedirectUrl(callbackUrl) ? callbackUrl : "/user/dashboard";

            await signIn("github", {
                redirect: true,
                callbackUrl: validCallbackUrl
            });
        } catch (err) {
            setIsLoading(false);
            setError("Failed to redirect to GitHub. Please try again.");
            console.error("GitHub sign-in error:", err);
        }
    };

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut({ redirect: true, callbackUrl: "/" });
        } catch (err) {
            setIsLoading(false);
            setError("Failed to sign out. Please try again.");
            console.error("Sign-out error:", err);
        }
    };

    // Show loading state while checking session status
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect loading state during OAuth redirect
    if (isLoading && !error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
                    <p className="mt-4 text-gray-600">Redirecting to GitHub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden">

            {/* Left Side (Form) */}
            <div className="flex-[1.4] flex flex-col p-6 lg:p-12 relative z-10 bg-white">
                <div className="flex justify-between items-center mb-16">
                    <Image src="/logo.png" alt="Legacyver Logo" width={60} height={40} className="object-contain" />
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full px-4 lg:px-0">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Get Started Now</h1>
                        <p className="text-gray-500 text-base">Please enter your information to access your account.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Error message display */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                                <div className="font-semibold mb-1">Authentication Error</div>
                                <div>{error}</div>
                                <button
                                    onClick={() => setError(null)}
                                    className="mt-2 text-red-700 hover:text-red-900 font-medium text-xs"
                                >
                                    Dismiss
                                </button>
                            </div>
                        )}

                        <Button
                            onClick={handleGitHubSignIn}
                            disabled={isLoading}
                            variant="outline"
                            className="h-12 w-full border-gray-200 hover:bg-gray-50 font-semibold text-gray-700 transition-all flex items-center justify-center gap-3 rounded-xl border cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Sign in with GitHub"
                        >
                            {isLoading ? (
                                <>
                                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Image src="/github.png" alt="GitHub" width={20} height={20} className="w-5 h-5 object-contain" />
                                    Log In with GitHub
                                </>
                            )}
                        </Button>
                        {session && (
                            <Button
                                onClick={handleSignOut}
                                disabled={isLoading}
                                variant="outline"
                                className="h-12 w-full border-gray-200 hover:bg-gray-50 font-semibold text-gray-700 transition-all flex items-center justify-center gap-3 rounded-xl border cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sign Out
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side (Image/Mockup) */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-blue/80 to-blue-400 p-0 lg:p-0 relative overflow-hidden items-center justify-center">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl opacity-40" />
                <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-white/10 rounded-full -ml-32 -mb-32 blur-2xl opacity-40" />

                <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight text-center max-w-lg">
                        Welcome To Legacyver!
                    </h2>

                    {/* Ganti dengan gambar dashboard */}
                    <Image
                        src="/login.png"
                        alt="Dashboard Mockup"
                        width={1080}
                        height={1080}
                        className="rounded-3xl shadow-xl mt-50 ml-36 rotate-[6deg] backdrop-blur-md scale-150 origin-bottom-left"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

// Helper function to get user-friendly error messages
function getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        "OAuthSignin": "Failed to sign in with GitHub. Please check your GitHub OAuth app configuration.",
        "OAuthCallback": "Failed to process GitHub OAuth response. Please try again.",
        "OAuthCreateAccount": "Failed to create account from GitHub data. Please try again.",
        "EmailCreateAccount": "Unable to sign in with this email.",
        "Callback": "The sign-in callback returned an error. Please try again.",
        "OAuthAccountNotLinked": "This GitHub account is not linked to your account.",
        "EmailSignInError": "Check your email address.",
        "CredentialsSignin": "Sign in failed. Check the details you provided are correct.",
        "default": "An authentication error occurred. Please try again."
    };
    return errorMessages[errorCode] || errorMessages["default"];
}

