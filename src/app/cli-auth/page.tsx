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
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-slate-100 rounded-full opacity-30 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-slate-100 rounded-full opacity-20 blur-3xl -z-10" />

      <div className="text-center p-8 rounded-lg bg-white border border-slate-200 max-w-md shadow-lg">
        {/* Icon/Logo area */}
        <div className="mb-6 flex justify-center">
          <div className="w-12 h-12  flex items-center justify-center">
            <Image src="/logo.png" alt="Legacyver Logo" width={40} height={32} className="object-contain" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Legacyver CLI
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Authentication
        </p>

        <p className={`text-base font-medium ${error ? "text-red-600" : "text-slate-700"}`}>
          {message}
        </p>

        {!error && !done && (
          <div className="mt-6 flex justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-slate-300 border-t-slate-900 rounded-full"></div>
          </div>
        )}

        {done && (
          <>
            {/* Confetti animation on success */}
            <ConfettiAnimation />
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">
                ✓ Authentication successful
              </p>
              <p className="text-green-600 text-xs mt-2">
                You can close this tab after the CLI confirms login.
              </p>
            </div>
          </>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium mb-2">
              Authentication failed
            </p>
            <p className="text-red-600 text-xs">
              Run <code className="bg-red-100 px-2 py-1 rounded font-mono">legacyver login</code> to try again.
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
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <CliAuthContent />
    </Suspense>
  );
}
