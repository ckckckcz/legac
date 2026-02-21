# GitHub OAuth Implementation - Setup Guide

This guide provides comprehensive documentation for setting up and deploying the GitHub OAuth authentication system.

## Table of Contents

1. [GitHub OAuth App Configuration](#github-oauth-app-configuration)
2. [Environment Variables](#environment-variables)
3. [Local Development Setup](#local-development-setup)
4. [Production Deployment](#production-deployment)
5. [Session Storage Strategy](#session-storage-strategy)
6. [Security Considerations](#security-considerations)
7. [Troubleshooting](#troubleshooting)
8. [Deployment Checklist](#deployment-checklist)

---

## GitHub OAuth App Configuration

### Creating a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** in the sidebar
3. Click **"New OAuth App"** button
4. Fill in the form:
   - **Application name**: `Legac` (or your app name)
   - **Homepage URL**: `http://localhost:3000` (development), `https://yourdomain.com` (production)
   - **Application description**: (optional)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (development)
                                       `https://yourdomain.com/api/auth/callback/github` (production)

5. Click **"Register application"**
6. You'll see your **Client ID** and **Client Secret**
   - **⚠️ Important**: Never commit the Client Secret to version control
   - Store it in environment variables only

### Configuring Different Environments

You may need separate OAuth apps for:
- **Local Development**: `http://localhost:3000`
- **Staging**: `https://staging.yourdomain.com`
- **Production**: `https://yourdomain.com`

Use different apps with different Client ID/Secret for each environment.

---

## Environment Variables

### Required Variables

```bash
# GitHub OAuth Credentials (from GitHub OAuth App settings)
GITHUB_ID=Ov23li...          # Your GitHub OAuth App Client ID
GITHUB_SECRET=325f192...     # Your GitHub OAuth App Client Secret

# NextAuth Secret (for session encryption)
AUTH_SECRET=BCCxpMjwp...     # Generate with: openssl rand -base64 32

# Database Connection
DATABASE_URL=postgresql://...  # Your PostgreSQL connection string
```

### Optional Variables

```bash
# GitHub Personal Access Token (for GitHub API calls)
REACT_APP_GITHUB_TOKEN=github_pat_...  # Optional, for public API access
```

### Generating AUTH_SECRET

Generate a cryptographically secure random string for `AUTH_SECRET`:

**On macOS/Linux:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Local Development Setup

### 1. Create GitHub OAuth App

Follow the [GitHub OAuth App Configuration](#github-oauth-app-configuration) section above.

### 2. Set Environment Variables

Create `.env.local` file in project root:

```bash
# Copy .env.example
cp .env.example .env.local

# Edit .env.local and add your credentials
GITHUB_ID=your_client_id_here
GITHUB_SECRET=your_client_secret_here
AUTH_SECRET=your_generated_secret_here
DATABASE_URL=postgresql://user:pass@localhost:5432/legac
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

### 5. Test Login Flow

1. Open `http://localhost:3000/login`
2. Click "Log In with GitHub"
3. You should be redirected to GitHub to authorize the app
4. After authorization, you'll be redirected back to the dashboard
5. Check browser DevTools → Application → localStorage for session data

---

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. In Vercel dashboard, go to **Settings → Environment Variables**
4. Add production environment variables:
   ```
   GITHUB_ID=<your-production-client-id>
   GITHUB_SECRET=<your-production-client-secret>
   AUTH_SECRET=<your-production-secret>
   DATABASE_URL=<your-production-db-url>
   ```
5. Deploy

### Other Hosting (AWS, DigitalOcean, etc.)

1. Set environment variables in your hosting platform's dashboard
2. Update GitHub OAuth app callback URL to your production domain
3. Deploy the application
4. Verify OAuth flow works on production domain

### Key Production Requirements

- ✓ `GITHUB_SECRET` must be kept secret (use environment variables, not code)
- ✓ `AUTH_SECRET` must be a strong, random string
- ✓ HTTPS must be enabled (required for secure cookies)
- ✓ Same-site cookie policy should be set to "Lax" (already configured)
- ✓ GitHub OAuth app callback URL must match your production domain exactly
- ✓ Database URL should use secure connection (sslmode=require)

---

## Session Storage Strategy

### Multi-Layer Persistence

The application uses a three-layer session persistence strategy:

#### 1. **Server-Side: Secure HTTP-Only Cookies** (Primary)
- **Purpose**: Secure session storage for API requests
- **Security**: httpOnly, Secure (HTTPS only), SameSite=Lax
- **Pros**: Most secure, protected from XSS
- **Cons**: Not accessible to JavaScript

#### 2. **Client-Side: localStorage** (Secondary)
- **Purpose**: Fast session restore on page load
- **Data**: User info, session expiration, JWT token
- **Security**: Lower security, vulnerable to XSS
- **Pros**: Accessible to JavaScript, persists across reloads
- **Cons**: Accessible from JavaScript, can be cleared by user

#### 3. **Runtime: React Context** (Tertiary)
- **Purpose**: In-memory session state for components
- **Provider**: NextAuth's SessionProvider
- **Pros**: Fast access, automatic updates
- **Cons**: Lost on page reload

### Flow Diagram

```
User Login
    ↓
GitHub OAuth → NextAuth
    ↓
Server: Create Session (httpOnly cookie) + JWT
    ↓
Client: Extract user data → Store in localStorage
    ↓
React: Update SessionProvider context
    ↓
Components: Access session via useSession()
    ↓
Page Reload
    ↓
Fast Restore: localStorage → components show data immediately
    ↓
Server Validate: Check httpOnly cookie → sync if different
    ↓
Sync: If server session valid, keep both in sync
```

### Synchronization

- **On Login**: User data synced from server to localStorage
- **On Session Change**: Updates propagated from server to localStorage
- **On Logout**: Both server session and localStorage cleared
- **On Expiration**: Session cleared automatically
- **Cross-Tab**: Storage events detected and synchronized

---

## Security Considerations

### XSS Protection

localStorage is vulnerable to XSS attacks. Mitigation:

- ✓ Only store user info (not secrets)
- ✓ Implement Content Security Policy (CSP) headers
- ✓ Sanitize all user inputs
- ✓ Use framework escaping (React does this by default)
- ✓ Keep tokens short-lived (< 1 hour)
- ✓ Primary auth via httpOnly cookies (immune to XSS)

### CSRF Protection

- ✓ Same-site cookie policy (Lax) prevents CSRF
- ✓ NextAuth automatically handles CSRF tokens

### Token Expiration

- ✓ Tokens expire after 30 days (NextAuth default)
- ✓ Sessions refresh on each request
- ✓ Automatic re-authentication on token expiration

### Environment Variables

- ✓ Never commit `.env.local` to version control (add to `.gitignore`)
- ✓ Use `.env.example` as template with placeholder values
- ✓ Set production secrets in hosting platform only
- ✓ Rotate secrets regularly

### Cookie Security

- ✓ `httpOnly`: Cannot be accessed from JavaScript
- ✓ `Secure`: Only sent over HTTPS (production)
- ✓ `SameSite=Lax`: Prevents CSRF attacks
- ✓ `Path=/`: Only sent to API routes

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| GitHub OAuth redirect fails | Missing/incorrect credentials | Verify GITHUB_ID and GITHUB_SECRET in .env |
| Callback URL mismatch error | GitHub app callback URL doesn't match | Update GitHub app settings to match your domain |
| Session not persisting | localStorage blocked by browser | Check browser privacy settings, allow cookies |
| Token expired error | Session token expired | Automatic refresh handled by NextAuth |
| "Invalid state parameter" | CSRF validation failed | Ensure SameSite cookies enabled |
| Multiple OAuth tabs hang | NextAuth session conflicts | One OAuth per browser session maximum |

### Debug Logging

Enable NextAuth debug mode:

```bash
NODE_ENV=development
# Add to .env.local
```

NextAuth will log detailed information to browser console and server logs.

### Inspect Session

**Browser Console:**
```javascript
// Get session via NextAuth
const session = await fetch('/api/auth/session').then(r => r.json());
console.log(session);

// Get localStorage session
console.log(JSON.parse(localStorage.getItem('legac_session_data')));
```

**Server Logs:**
```bash
# Check NextAuth debug output
npm run dev
# Look for [next-auth] messages in console
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] GitHub OAuth app created
- [ ] Client ID and Secret obtained
- [ ] AUTH_SECRET generated (32+ character random string)
- [ ] Production domain determined
- [ ] GitHub app callback URL configured
- [ ] Environment variables validated locally
- [ ] All tests pass locally
- [ ] No credentials committed to git
- [ ] `.env.local` added to `.gitignore`
- [ ] `.env.example` updated with placeholder values

### Deployment

- [ ] Production environment variables set in hosting platform
- [ ] Database connection string configured
- [ ] HTTPS enabled on production domain
- [ ] Application deployed successfully
- [ ] OAuth callback endpoint accessible (`/api/auth/callback/github`)

### Post-Deployment

- [ ] Test OAuth login on production
- [ ] Verify session persists across page reloads
- [ ] Check localStorage contains session data
- [ ] Test logout clears session
- [ ] Monitor authentication errors (logs)
- [ ] Verify HTTPS certificate is valid
- [ ] Check secure cookies are being set
- [ ] Test on multiple browsers
- [ ] Monitor performance metrics

### Ongoing Maintenance

- [ ] Review authentication logs monthly
- [ ] Rotate AUTH_SECRET every 90 days
- [ ] Update GitHub OAuth app settings if domain changes
- [ ] Keep NextAuth updated (`npm update next-auth`)
- [ ] Monitor for security vulnerabilities
- [ ] Test OAuth flow quarterly
- [ ] Have rollback plan ready

---

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [OWASP Security Guidelines](https://owasp.org/)
- [Testing Guide](./TESTING_GUIDE.md)

---

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review [Testing Guide](./TESTING_GUIDE.md)
3. Check NextAuth [GitHub Issues](https://github.com/nextauthjs/next-auth/issues)
4. Check GitHub [Community Support](https://github.com/orgs/nextauthjs/discussions)
