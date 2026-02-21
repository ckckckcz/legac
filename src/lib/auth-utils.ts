import { auth } from "@/auth";

/**
 * Get the current session in server components
 * @returns The current session or null if not authenticated
 */
export async function getServerSession() {
  return await auth();
}

/**
 * Get the current user from the session in server components
 * @returns The current user or null if not authenticated
 */
export async function getServerUser() {
  const session = await auth();
  return session?.user || null;
}
