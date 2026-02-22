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
        <div className="flex min-h-screen bg-background font-sans overflow-hidden">

            {/* Left Side (Form) */}
            <div className="flex-[1.4] flex flex-col p-6 lg:p-12 relative z-10 bg-background/50 backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-primary/20">
                            <Image src="/logo.png" alt="Legacyver Logo" width={24} height={24} className="object-contain" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-foreground">Legacyver</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full px-4 lg:px-0">
                    <div className="mb-12 text-center lg:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Welcome Back</p>
                        <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-3 tracking-tighter">Get Started Now</h1>
                        <p className="text-muted-foreground text-base max-w-sm">Access your account to manage your legacy documentation seamlessly.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Error message display */}
                        {error && (
                            <div className="p-5 bg-destructive/5 border border-destructive/10 rounded-2xl text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="font-bold mb-1 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-destructive" />
                                    Authentication Error
                                </div>
                                <div className="text-xs opacity-80 mb-3">{error}</div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setError(null)}
                                    className="h-7 px-3 text-[10px] font-bold rounded-lg border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                >
                                    Dismiss
                                </Button>
                            </div>
                        )}

                        <Button
                            onClick={handleGitHubSignIn}
                            disabled={isLoading}
                            variant="outline"
                            className="h-14 w-full border-border bg-card hover:bg-accent/50 hover:border-primary/30 font-bold text-foreground transition-all flex items-center justify-center gap-4 rounded-2xl border cursor-pointer shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                            aria-label="Sign in with GitHub"
                        >
                            {isLoading ? (
                                <>
                                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                    <span className="text-sm">Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <div className="relative">
                                        <Image src="/github.png" alt="GitHub" width={24} height={24} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
                                        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-sm">Log In with GitHub</span>
                                </>
                            )}
                        </Button>

                        {session && (
                            <Button
                                onClick={handleSignOut}
                                disabled={isLoading}
                                variant="ghost"
                                className="h-14 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-bold transition-all flex items-center justify-center gap-3 rounded-2xl text-sm"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                                Sign Out Current Session
                            </Button>
                        )}
                    </div>

                    <div className="mt-16 text-center lg:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
                            © 2026 Legacyver Platform
                        </p>
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

