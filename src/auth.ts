import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// NextAuth configuration for GitHub OAuth authentication
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email repo',
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        // user.id from GitHub provider = GitHub numeric user ID as string
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
      }
      if (profile) {
        token.username = (profile as any).login;
        // Store GitHub numeric ID explicitly from profile (most reliable source)
        token.githubId = String((profile as any).id);
      }
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Prefer githubId from profile, fall back to token.id, then token.sub
        session.user.id = (token.githubId as string) || (token.id as string) || (token.sub as string);
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        (session.user as any).username = token.username as string;
      }
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      // Allow redirects back to CLI auth page after OAuth
      else if (url.includes("/cli-auth")) return url;
      return baseUrl + "/user/dashboard";
    },
    async signIn({ user, account, profile }) {
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
