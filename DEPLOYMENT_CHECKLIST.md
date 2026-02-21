# GitHub OAuth Deployment Checklist

Use this checklist when deploying the GitHub OAuth authentication system to production.

## Pre-Deployment Phase (Local Development)

### Environment & Credentials
- [ ] GitHub OAuth app created at https://github.com/settings/developers
- [ ] GitHub Client ID obtained and verified
- [ ] GitHub Client Secret obtained and kept confidential
- [ ] AUTH_SECRET generated using: `openssl rand -base64 32`
- [ ] All environment variables added to `.env.local`
  - [ ] `GITHUB_ID` - verified format
  - [ ] `GITHUB_SECRET` - verified format
  - [ ] `AUTH_SECRET` - verified minimum 32 characters
  - [ ] `DATABASE_URL` - verified connection
- [ ] `.env.local` is in `.gitignore` (no credentials in git)
- [ ] `.env.example` updated with placeholder values

### GitHub OAuth App Configuration
- [ ] GitHub app name is set
- [ ] Application homepage URL configured
- [ ] Authorization callback URL set to: `http://localhost:3000/api/auth/callback/github`
- [ ] OAuth scopes reviewed (if needed)

### Code & Testing
- [ ] All code changes reviewed
- [ ] No hardcoded credentials in codebase
- [ ] No sensitive data in comments
- [ ] Unit tests pass: `npm run test`
- [ ] OAuth login flow tested locally
- [ ] Session persistence tested locally
- [ ] localStorage sync tested across tabs
- [ ] Error scenarios tested (invalid credentials, network failures)
- [ ] All TypeScript types check: `npm run type-check`
- [ ] Linting passes: `npm run lint`

### Documentation
- [ ] GITHUB_OAUTH_SETUP.md created with setup instructions
- [ ] TESTING_GUIDE.md created with test procedures
- [ ] README.md updated with auth setup section
- [ ] Code comments added explaining localStorage sync and JWT handling
- [ ] Troubleshooting guide documented

### Build Verification
- [ ] Production build succeeds: `npm run build`
- [ ] No build warnings or errors
- [ ] Production bundle size reasonable
- [ ] Source maps excluded from production build

---

## Staging Deployment Phase (Optional)

If you have a staging environment:

### Staging Setup
- [ ] Staging environment created (separate from production)
- [ ] Staging database provisioned
- [ ] Staging domain determined
- [ ] Staging GitHub OAuth app created (if using separate app)

### Staging Environment Variables
- [ ] `GITHUB_ID` set to staging app credentials
- [ ] `GITHUB_SECRET` set to staging app credentials
- [ ] `AUTH_SECRET` set (different from production)
- [ ] `DATABASE_URL` set to staging database
- [ ] `NODE_ENV=production` set

### Staging Deployment
- [ ] Application deployed to staging
- [ ] GitHub OAuth app callback URL configured for staging
- [ ] Callback URL: `https://staging.yourdomain.com/api/auth/callback/github`
- [ ] All environment variables set correctly

### Staging Testing
- [ ] OAuth login tested on staging domain
- [ ] Session persists across page reloads on staging
- [ ] localStorage working correctly on staging
- [ ] Error handling tested on staging
- [ ] Performance acceptable on staging
- [ ] No console errors on staging
- [ ] HTTPS certificate valid on staging

---

## Production Deployment Phase

### Pre-Production Validation
- [ ] Backup of current production environment completed
- [ ] Rollback plan prepared (previous version accessible)
- [ ] Production domain verified
- [ ] Production SSL certificate valid
- [ ] Production database accessible

### Production Environment Setup
- [ ] Production hosting platform chosen and configured
  - [ ] Vercel, AWS, DigitalOcean, or other
- [ ] GitHub OAuth app for production created
- [ ] Production Client ID obtained
- [ ] Production Client Secret obtained
- [ ] Production AUTH_SECRET generated: `openssl rand -base64 32`

### Production Environment Variables
Set these in your hosting platform (NOT in .env files):
- [ ] `GITHUB_ID` = production client ID
- [ ] `GITHUB_SECRET` = production client secret
- [ ] `AUTH_SECRET` = production secret (different from staging/local)
- [ ] `DATABASE_URL` = production database URL with HTTPS/SSL
- [ ] `NODE_ENV` = "production"

### Production GitHub OAuth Configuration
- [ ] GitHub OAuth app callback URL set to: `https://yourdomain.com/api/auth/callback/github`
- [ ] Callback URL exactly matches production domain
- [ ] GitHub app security settings reviewed
- [ ] OAuth scopes appropriate for use case

### Production Deployment
- [ ] Code deployed to production
- [ ] Environment variables verified in hosting platform
- [ ] All deployments completed without errors
- [ ] No warnings in deployment logs
- [ ] Application accessible at production domain

---

## Post-Deployment Verification

### Immediate Post-Deployment (First Hour)

#### Application Health
- [ ] Application loads at production domain
- [ ] No 500 errors in logs
- [ ] No database connection errors
- [ ] API endpoints responding normally

#### OAuth Flow
- [ ] GitHub login button appears on login page
- [ ] Clicking login redirects to GitHub OAuth
- [ ] GitHub authorization dialog appears
- [ ] After authorization, redirected back to application
- [ ] User authenticated successfully
- [ ] Redirect to dashboard successful
- [ ] Session data in useSession() hook is correct

#### Session Management
- [ ] User session persists after page reload
- [ ] localStorage contains session data
- [ ] User remains logged in during navigation
- [ ] Session expiration handled correctly

#### Error Handling
- [ ] Clear error messages displayed for auth failures
- [ ] Network errors handled gracefully
- [ ] No exposed sensitive information in errors
- [ ] Error logging working (if using external service)

### Extended Post-Deployment (First 24 Hours)

#### Security
- [ ] HTTPS only (no HTTP)
- [ ] Secure cookies being set (httpOnly, Secure, SameSite)
- [ ] No sensitive data in localStorage
- [ ] No credentials in logs
- [ ] No security warnings in browser console

#### Functionality
- [ ] Multiple users can log in
- [ ] Logout works correctly
- [ ] Session clears from localStorage on logout
- [ ] Multi-tab logout synchronization works
- [ ] Protected routes require authentication
- [ ] Unauthenticated users redirected to login

#### Performance
- [ ] OAuth login completes < 5 seconds
- [ ] Page load with session < 2 seconds
- [ ] No significant performance degradation
- [ ] Database queries performant
- [ ] API response times acceptable

#### Browser Compatibility
- [ ] Chrome working
- [ ] Firefox working
- [ ] Safari working
- [ ] Edge working
- [ ] Mobile browsers working

#### Monitoring
- [ ] Error logs being collected
- [ ] Authentication errors being monitored
- [ ] Database performance monitored
- [ ] API latency monitored
- [ ] Alerts configured for issues

---

## Rollback Plan

If issues occur and rollback is needed:

### Rollback Steps
1. [ ] Identify issue (check logs)
2. [ ] Document issue details
3. [ ] Notify team/stakeholders
4. [ ] Deploy previous working version
5. [ ] Verify rollback successful
6. [ ] Document timeline and resolution

### Rollback Preparation
- [ ] Previous version tag created in git: `git tag v1.0.0-rollback`
- [ ] Previous version deployed to staging first: test rollback process
- [ ] Rollback deployment documented
- [ ] Team trained on rollback procedure

---

## Ongoing Maintenance

After successful deployment:

### Weekly
- [ ] Check error logs for OAuth issues
- [ ] Monitor authentication failure rate
- [ ] Verify HTTPS certificate valid
- [ ] Spot check user sessions

### Monthly
- [ ] Review authentication logs
- [ ] Check performance metrics
- [ ] Update dependencies if needed
- [ ] Review security advisories

### Quarterly
- [ ] Test OAuth flow end-to-end
- [ ] Rotate AUTH_SECRET (if applicable)
- [ ] Security audit
- [ ] Performance profiling
- [ ] Backup verification

### As Needed
- [ ] Update GitHub OAuth app if changing domains
- [ ] Update AUTH_SECRET if compromised
- [ ] Patch security vulnerabilities
- [ ] Update Next.js and NextAuth versions

---

## Sign-Off

Deployment completed by: _________________ Date: _________

Verified by: _________________ Date: _________

All checklist items completed: [ ] Yes [ ] No

If "No", document exceptions:
_________________________________________________________
_________________________________________________________
_________________________________________________________

---

## Contact & Support

For deployment issues:
- Check GITHUB_OAUTH_SETUP.md for configuration details
- Check TESTING_GUIDE.md for verification procedures
- Review logs for detailed error information
- Contact NextAuth support: https://github.com/nextauthjs/next-auth/issues
