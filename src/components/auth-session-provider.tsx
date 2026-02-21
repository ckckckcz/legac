"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SessionSync } from "@/components/SessionSync";

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionSync />
      {children}
    </SessionProvider>
  );
}
