"use client";

import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import ConfettiAnimation from "@/components/confentti";

function CliAuthContent() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("Authenticating...");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const code = searchParams.get("code");
  const port = searchParams.get("port");

  useEffect(() => {
    if (!code || !port) {
      setMessage("Missing code or port parameter. Please try again from the CLI.");
      setError(true);
      return;
    }

    if (status === "loading") return;

    if (status === "unauthenticated") {
      // Redirect to GitHub OAuth, come back here after
      const callbackUrl = `/cli-auth?code=${encodeURIComponent(code)}&port=${encodeURIComponent(port)}`;
      signIn("github", { callbackUrl });
      return;
    }

    if (status === "authenticated" && !done) {
      // User is logged in — exchange code for CLI token
      (async () => {
        try {
          setMessage("Creating CLI session...");

          const res = await fetch("/api/auth/cli", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, port: parseInt(port, 10) }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || `Server error ${res.status}`);
          }

          const { token, username, email } = await res.json();

          // Redirect token to CLI's local HTTP server
          const callbackUrl = `http://localhost:${port}/callback?token=${encodeURIComponent(token)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`;

          setMessage(`Welcome, ${username}! Redirecting to CLI...`);
          setDone(true);

          // Small delay so user sees the message
          setTimeout(() => {
            window.location.href = callbackUrl;
          }, 1000);
        } catch (err: any) {
          setMessage(`Authentication failed: ${err.message}`);
          setError(true);
        }
      })();
    }
  }, [status, code, port, done, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full opacity-30 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-brand-blue/5 rounded-full opacity-20 blur-3xl -z-10" />

      <div className="text-center p-10 rounded-3xl bg-card border border-border max-w-md shadow-xl backdrop-blur-sm">
        {/* Icon/Logo area */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
            <Image src="/logo.png" alt="Legacyver Logo" width={40} height={32} className="object-contain" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">
          Legacyver CLI
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
          Authentication Terminal
        </p>

        <p className={`text-base font-semibold ${error ? "text-destructive" : "text-foreground"}`}>
          {message}
        </p>

        {!error && !done && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-primary/20 border-t-primary rounded-full"></div>
          </div>
        )}

        {done && (
          <>
            {/* Confetti animation on success */}
            <ConfettiAnimation />
            <div className="mt-8 p-5 bg-primary/5 border border-primary/10 rounded-2xl">
              <p className="text-primary text-sm font-bold">
                ✓ Authentication successful
              </p>
              <p className="text-muted-foreground text-xs mt-2">
                Your CLI is now linked. You can close this tab and return to your terminal.
              </p>
            </div>
          </>
        )}

        {error && (
          <div className="mt-8 p-5 bg-destructive/5 border border-destructive/10 rounded-2xl">
            <p className="text-destructive text-sm font-bold mb-2">
              Authentication failed
            </p>
            <p className="text-muted-foreground text-xs">
              Run <code className="bg-destructive/10 text-destructive px-2 py-1 rounded font-mono text-[10px]">legacyver login</code> to try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CliAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground text-sm font-medium">Preparing authentication...</p>
          </div>
        </div>
      }
    >
      <CliAuthContent />
    </Suspense>
  );
}
