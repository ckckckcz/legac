import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// NextAuth configuration for GitHub OAuth authentication
// See design document for security and persistence strategy
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // GitHub OAuth callback URL must match the URL configured in GitHub OAuth app settings
      // Default: /api/auth/callback/github (handled automatically by NextAuth)
    }),
  ],
  callbacks: {
    // JWT callback: Called when JWT is created or updated
    // Used to add custom data to the JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
      }
      // profile is the raw GitHub OAuth profile — only present on first sign-in.
      // This is the correct source for the GitHub login handle.
      if (profile) {
        token.username = (profile as any).login;
      }
      // Add account data (OAuth provider info) if available
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      return token;
    },
    // Session callback: Called when session is retrieved
    // Used to enrich session with additional user data
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        // Add GitHub username to session
        (session.user as any).username = token.username as string;
      }
      // Expose access token to session for client-side use
      // Note: In production, consider if you want tokens accessible to JavaScript
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      // Note: Access tokens should not be stored in session for security
      // They are stored in JWT and encrypted in the session cookie
      return session;
    },
    // Redirect callback: Called when redirecting after sign-in
    // Ensures secure redirects and prevents open redirect vulnerabilities
    async redirect({ url, baseUrl }) {
      // Only allow redirects to same origin (prevent open redirect)
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If url is on same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Default fallback
      return baseUrl + "/user/dashboard";
    },
    // SignIn callback: Called when user signs in
    // Can be used to deny access based on conditions
    async signIn({ user, account, profile }) {
      // Allow all GitHub sign-ins
      return true;
    },
  },
  pages: {
    // Custom sign-in page
    signIn: "/login",
    // Optional: custom error page
    error: "/login",
  },
  // Session configuration for security
  session: {
    // Use JWT strategy for session management
    strategy: "jwt",
    // Session expiration time (in seconds) - 30 days
    maxAge: 30 * 24 * 60 * 60,
    // Update session token periodically
    updateAge: 24 * 60 * 60,
  },
  // Cookies configuration for security
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        // Secure: only sent over HTTPS in production
        httpOnly: true,
        // Secure: only in production (HTTPS)
        secure: process.env.NODE_ENV === "production",
        // Same-site: prevent CSRF attacks
        sameSite: "lax" as const,
        // Path: only sent to /api/auth routes by default
        path: "/",
      },
    },
  },
  // NextAuth secret for encrypting tokens and session data
  // Must be a strong, random string of at least 32 characters
  secret: process.env.AUTH_SECRET,
  // Enable debug logging in development
  debug: process.env.NODE_ENV === "development",
});

