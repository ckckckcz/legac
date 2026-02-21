"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Logo = () => (
    <div className="flex items-center gap-2">
        <div className="bg-brand-blue rounded-lg p-1.5 size-10 flex items-center justify-center shadow-lg shadow-brand-blue/20">

        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">Legic</span>
    </div>
);

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
                    <Logo />
                    <p className="text-sm font-medium text-gray-500">
                        Ada Masalah Dengan Login?{" "}
                        <Link href="/signup" className="text-brand-blue font-bold hover:underline">
                            Tanya
                        </Link>
                    </p>
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
            <div className="hidden lg:flex flex-1 bg-brand-blue p-8 lg:p-16 relative overflow-hidden items-center justify-center">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl opacity-50" />

                <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight text-center max-w-lg drop-shadow-md">
                        The easiest way to take care of your patient
                    </h2>

                    {/* Dashboard Mockup Card with Enhanced Perspective */}
                    <div className="w-full mt-20 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-8 relative ml-36 transform rotate-[6deg] border-[14px] border-white/20 backdrop-blur-md scale-110 origin-bottom-left">
                        <div className="flex gap-8 text-left">
                            {/* Sidebar Mockup */}
                            <div className="w-48 border-r border-gray-100 pr-6 space-y-8">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="bg-brand-blue rounded-lg p-1.5 size-7 flex items-center justify-center shadow-lg shadow-brand-blue/20">
                                        <div className="size-full border-2 border-white/40 rounded-sm" />
                                    </div>
                                    <span className="font-bold text-sm text-gray-900 tracking-tight">Xenityhealth</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-11 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center px-4 gap-3 shadow-sm shadow-brand-blue/5">
                                        <div className="size-5 rounded-full bg-brand-blue/40" />
                                        <div className="h-2 w-16 bg-brand-blue/60 rounded-full" />
                                    </div>
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="h-11 flex items-center px-4 gap-3 opacity-30">
                                            <div className="size-5 rounded-full bg-gray-300" />
                                            <div className="h-2 w-20 bg-gray-200 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Mockup */}
                            <div className="flex-1 space-y-8 pt-4">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-7 w-32 bg-gray-900 rounded-xl" />
                                    <div className="flex gap-3">
                                        <div className="h-8 w-20 bg-brand-blue shadow-lg shadow-brand-blue/20 rounded-full flex items-center justify-center">
                                            <div className="h-1.5 w-10 bg-white/80 rounded-full" />
                                        </div>
                                        <div className="h-8 w-20 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center">
                                            <div className="h-1.5 w-10 bg-gray-300 rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="p-5 rounded-3xl border border-gray-50 space-y-4 bg-white shadow-xl shadow-gray-100/50">
                                        <div className="h-2 w-12 bg-gray-300 rounded-full" />
                                        <div className="h-8 w-20 bg-gray-900 rounded-xl" />
                                        <div className="h-2 w-24 bg-brand-blue/20 rounded-full" />
                                    </div>
                                    <div className="p-5 rounded-3xl border border-gray-50 space-y-4 bg-white shadow-xl shadow-gray-100/50 relative overflow-hidden">
                                        <div className="h-2 w-12 bg-gray-300 rounded-full" />
                                        <div className="h-8 w-20 bg-gray-900 rounded-xl" />
                                        <div className="h-12 w-20 absolute bottom-0 right-0 flex items-end gap-1 px-4 mb-2">
                                            <div className="flex-1 h-[40%] bg-brand-blue/10 rounded-t-sm" />
                                            <div className="flex-1 h-[90%] bg-brand-blue/40 rounded-t-sm" />
                                            <div className="flex-1 h-[60%] bg-brand-blue/20 rounded-t-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[2.5rem] border border-gray-50 space-y-6 bg-white shadow-xl shadow-gray-100/50">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-28 bg-gray-900 rounded-full" />
                                        <div className="h-2 w-20 bg-gray-100 rounded-full" />
                                    </div>
                                    <div className="h-40 w-full bg-gray-50/50 rounded-3xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
                                        {[...Array(14)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 rounded-t-md transition-all duration-500 hover:opacity-100"
                                                style={{
                                                    height: `${10 + Math.random() * 80}%`,
                                                    backgroundColor: i % 4 === 0 ? 'var(--color-brand-blue)' : '#e5e7eb',
                                                    opacity: i % 4 === 0 ? 0.7 : 0.8
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

