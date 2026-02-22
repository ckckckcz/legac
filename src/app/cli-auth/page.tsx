"use client";

import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center p-8 rounded-lg bg-gray-900 border border-gray-800 max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">
          Legacyver CLI Login
        </h1>
        <p className={`text-lg ${error ? "text-red-400" : "text-gray-300"}`}>
          {message}
        </p>
        {!error && !done && (
          <div className="mt-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
        {done && (
          <p className="text-green-400 mt-4 text-sm">
            You can close this tab after the CLI confirms login.
          </p>
        )}
        {error && (
          <p className="text-gray-500 mt-4 text-sm">
            Run <code className="bg-gray-800 px-2 py-1 rounded">legacyver login</code> to try again.
          </p>
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
