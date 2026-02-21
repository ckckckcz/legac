# GitHub OAuth Authentication - Testing Guide

This guide provides step-by-step instructions for testing the GitHub OAuth authentication implementation.

## Prerequisites

- GitHub OAuth App configured with correct Client ID and Secret
- Environment variables set: `GITHUB_ID`, `GITHUB_SECRET`, `AUTH_SECRET`
- Application running locally on `http://localhost:3000`
- Browser DevTools available for inspection

## Test Suite

### 1. GitHub OAuth Login Flow End-to-End (11.1)

**Steps:**
1. Start the application: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Click "Log In with GitHub" button
4. You should be redirected to GitHub OAuth login page
5. Log in with your GitHub account
6. You should be redirected back to the application to `/user/dashboard`

**Expected Results:**
- ✓ Login page appears with GitHub login button
- ✓ Clicking button redirects to GitHub's OAuth page
- ✓ After GitHub login, you're redirected back to app
- ✓ User is authenticated in the application
- ✓ Session is available via `useSession()` hook

**Troubleshooting:**
- If GitHub redirect fails, verify `GITHUB_ID` and `GITHUB_SECRET` are correct
- Check GitHub OAuth app settings - callback URL must be `http://localhost:3000/api/auth/callback/github`

---

### 2. JWT Token Storage in localStorage (11.2)

**Steps:**
1. Complete login as per test 11.1
2. Open browser DevTools (F12 or Cmd+Option+I)
3. Go to Application → localStorage
4. Look for `legac_session_data` and `legac_auth_token` keys

**Expected Results:**
- ✓ `legac_session_data` contains JSON with user info
- ✓ `legac_auth_token` contains token with expiration
- ✓ Session user data includes: id, name, email, image, username
- ✓ Token has valid expiration time (expiresAt > current time)

**Sample localStorage data structure:**
```json
{
  "legac_session_data": {
    "user": {
      "id": "123456",
      "name": "Your Name",
      "email": "user@example.com",
      "image": "https://avatars.githubusercontent.com/...",
      "username": "your-github-username"
    },
    "expires": "2026-03-23T12:34:56.789Z"
  },
  "legac_auth_token": {
    "value": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "expiresAt": 1745472896789
  }
}
```

---

### 3. Session Persistence After Page Reload (11.3)

**Steps:**
1. Log in successfully (test 11.1)
2. Note the page URL (should be `/user/dashboard`)
3. Refresh the page (Ctrl+R or Cmd+R)
4. Wait for page to reload completely

**Expected Results:**
- ✓ Page reloads without logout
- ✓ User session is restored from localStorage
- ✓ User data is still available immediately
- ✓ No redirect to login page
- ✓ Session is validated with server on reload

---

### 4. Session Persistence During Browser Navigation (11.4)

**Steps:**
1. Log in successfully (test 11.1)
2. Navigate to another page: `/profile`
3. Use browser back button to go back
4. Use browser forward button to go forward again

**Expected Results:**
- ✓ User remains logged in during navigation
- ✓ Session is available on all pages
- ✓ No unexpected redirects to login
- ✓ Session data persists across back/forward navigation
- ✓ Protected routes remain accessible

---

### 5. Logout Clears Both Session and localStorage (11.5)

**Steps:**
1. Log in successfully (test 11.1)
2. Find logout button and click it
3. Verify you're redirected to home page (`/`)
4. Open DevTools → Application → localStorage
5. Check if session data keys are cleared

**Expected Results:**
- ✓ User is logged out
- ✓ Redirected to home page
- ✓ `legac_session_data` is removed from localStorage
- ✓ `legac_auth_token` is removed from localStorage
- ✓ Attempting to access protected routes redirects to login
- ✓ `useSession()` returns `status: "unauthenticated"`

---

### 6. Error Handling for Invalid Credentials (11.6)

**Steps:**
1. Navigate to login page
2. Test scenarios:
   - Missing GitHub ID: Temporarily rename `GITHUB_ID` in .env
   - Missing GitHub Secret: Temporarily rename `GITHUB_SECRET` in .env
   - Invalid callback URL: Change callback URL in GitHub app settings
3. Try to login and observe error handling

**Expected Results:**
- ✓ Clear error message is displayed to user
- ✓ Error doesn't crash the application
- ✓ User can attempt to login again (retry mechanism)
- ✓ Errors are logged for debugging
- ✓ Network failures show user-friendly messages

---

### 7. Session Restoration from localStorage Before Server Validation (11.7)

**Steps:**
1. Log in successfully (test 11.1)
2. Open DevTools → Network tab
3. Set network throttling to "Slow 3G" to simulate slow connection
4. Refresh the page
5. Immediately check page content before network requests complete

**Expected Results:**
- ✓ User data appears immediately from localStorage (fast)
- ✓ Page doesn't show "loading..." for a long time
- ✓ Server session validation happens in background
- ✓ Page content is visible before server responds
- ✓ No jarring loading states or flickering

---

### 8. Multi-Tab Logout Synchronization (11.8)

**Steps:**
1. Log in successfully in one tab
2. Open application in a second tab
3. In first tab, click logout button
4. Switch to second tab and look for immediate effect

**Expected Results:**
- ✓ First tab redirects to home page after logout
- ✓ Second tab detects logout via storage events
- ✓ Second tab automatically logs out user (without page reload)
- ✓ Attempting to access protected routes in second tab redirects to login
- ✓ Session is cleared in localStorage in both tabs
- ✓ If manual page reload in second tab, user is logged out

---

## Automated Testing

For CI/CD pipelines, consider adding Playwright tests:

```bash
npm run test:e2e
```

Test files should cover:
- OAuth login flow
- Session persistence
- localStorage synchronization
- Error scenarios
- Protected route access

---

## Manual Verification Checklist

- [ ] Login with GitHub works
- [ ] localStorage contains session data after login
- [ ] Session persists after page reload
- [ ] Session persists during browser navigation
- [ ] Logout clears localStorage and session
- [ ] Errors display user-friendly messages
- [ ] Session loads fast from localStorage
- [ ] Logout in one tab logs out all tabs
- [ ] Protected routes require authentication
- [ ] No console errors during normal usage

---

## Debugging

### Enable NextAuth Debug Logging

Set environment variable:
```
NODE_ENV=development
```

NextAuth will log detailed information to console.

### Inspect Session in Browser Console

```javascript
// Get current session (client-side)
const session = await fetch('/api/auth/session').then(r => r.json());
console.log(session);

// Get stored session data
console.log(JSON.parse(localStorage.getItem('legac_session_data')));

// Get stored token
console.log(JSON.parse(localStorage.getItem('legac_auth_token')));
```

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Callback URL mismatch | Verify callback URL in GitHub OAuth app matches `http://localhost:3000/api/auth/callback/github` |
| Session not persisting | Check browser allows localStorage and cookies are not blocked |
| Logout doesn't clear localStorage | Ensure `clearSessionData()` is called in logout handler |
| Multi-tab sync not working | Verify localStorage events are not disabled by browser extensions |
| Fast page load shows unauth state | This is expected due to async session validation - wait for component to stabilize |

---

## Performance Benchmarks

Ideal performance targets:
- OAuth redirect: < 2 seconds
- Page load with existing session: < 1 second
- localStorage restore: < 100ms
- Session validation (server): < 500ms
