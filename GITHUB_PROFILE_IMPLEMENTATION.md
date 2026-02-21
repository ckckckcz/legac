<!-- GitHub Profile Page - Implementation Guide -->

# GitHub Profile Page Implementation

This document explains how to use and configure the GitHub profile page feature.

## Overview

The GitHub profile page displays GitHub user information including:
- User profile card (avatar, name, bio)
- GitHub statistics (repos, followers, following)
- Profile metadata (location, company, email, join date)
- Responsive design that works on all screen sizes
- Error handling and retry functionality

## Setup

### 1. Environment Variables

Configure your GitHub API token:

```bash
# .env.local
REACT_APP_GITHUB_TOKEN="your_github_token_here"
```

**Generate a token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `public_repo`, `user`
4. Copy the token and add it to `.env.local`

**Token Scopes Required:**
- `public_repo` - Access to public repositories
- `user` - Access to user profile data

### 2. Required Dependencies

The feature uses these dependencies (already included):
- `next` - React framework
- `@/components/ui` - shadcn/ui components
- `lucide-react` - Icons

Ensure shadcn/ui components are installed:
```bash
npx shadcn-ui@latest add card avatar badge skeleton button
```

## Usage

### Accessing the Profile Page

Navigate to `/profile` in your browser:
```
http://localhost:3000/profile
```

### Query Parameters

You can view a specific GitHub user's profile:
```
http://localhost:3000/profile?user=octocat
http://localhost:3000/profile?user=torvalds
```

### Component Usage

To embed the profile page in your own component:

```tsx
import { ProfilePage } from '@/components/profile/ProfilePage';

export function MyComponent() {
  return <ProfilePage username="octocat" />;
}
```

## Architecture

### File Structure

```
src/
├── app/
│   └── profile/
│       └── page.tsx                    # Main route page
├── components/
│   └── profile/
│       ├── ProfilePage.tsx             # Main container
│       ├── GitHubProfileCard.tsx       # Profile display
│       ├── GitHubStatsSection.tsx      # Statistics display
│       ├── ProfileMetadataSection.tsx  # Metadata display
│       ├── ProfileSkeleton.tsx         # Loading state
│       ├── ProfileError.tsx            # Error state
│       └── index.ts                    # Barrel export
└── lib/
    ├── services/
    │   └── github.ts                   # GitHub API service
    ├── hooks/
    │   └── useGitHubProfile.ts         # Data fetching hook
    ├── utils/
    │   └── cache.ts                    # Caching utility
    └── types/
        └── github-profile.ts           # TypeScript types
```

### Component Hierarchy

```
ProfilePage
├── GitHubProfileCard
├── GitHubStatsSection
└── ProfileMetadataSection

With loading/error states:
├── ProfileSkeleton (while loading)
└── ProfileError (on error)
```

## API Integration

### GitHub API Endpoints

The implementation uses these GitHub REST API endpoints:

```
GET /users/{username}
```

**Response includes:**
- User profile information
- Statistics (public repos, followers, following)
- Metadata (location, company, email, created_at)

### Rate Limiting

GitHub API rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

The implementation handles rate limiting with:
- Automatic retry with exponential backoff
- Client-side caching (5-10 minutes default)
- User-friendly error messages

## Performance

### Caching Strategy

- **Cache TTL**: 5 minutes (configurable)
- **Storage**: In-memory client-side cache
- **Bypass**: Use the refetch() method to force fresh data

```tsx
const { data, refetch } = useGitHubProfile('octocat');

// Force refresh bypassing cache
refetch();
```

### Optimization Tips

1. **Use the hook's caching**: Don't make multiple API calls for same user
2. **Adjust TTL for your needs**: More frequent updates use shorter TTL
3. **Monitor bundle size**: shadcn/ui components are tree-shakeable
4. **Lazy load components**: Use Next.js dynamic imports for code splitting

```tsx
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/components/profile/ProfilePage'), {
  loading: () => <ProfileSkeleton />,
});
```

## Error Handling

The implementation handles various error scenarios:

### Network Errors
- Shows user-friendly error message
- Provides retry button
- Logs error to console in development

### 404 Errors (User Not Found)
- Displays specific error message
- Suggests checking username
- Allows searching for different user

### 403 Errors (Rate Limited)
- Shows rate limit message with wait time
- Automatically retries with backoff
- Suggests using authenticated token

### Network Timeout
- Shows timeout error
- Provides retry option
- Doesn't retry automatically

## Customization

### Styling

All components use shadcn/ui and Tailwind CSS. Customize by:

1. **Theme colors**: Update `globals.css` CSS variables
2. **Component styling**: Modify className attributes
3. **Layout**: Adjust responsive breakpoints (sm, md, lg)

### Custom Hook Options

```tsx
const { data, error, loading, retry } = useGitHubProfile('octocat', {
  cacheTtl: 10 * 60 * 1000,  // 10 minutes
  maxRetries: 5,              // More retry attempts
});
```

### Component Props

Each component accepts specific props:

```tsx
// ProfilePage
<ProfilePage username="octocat" />

// GitHubProfileCard
<GitHubProfileCard user={userData} />

// GitHubStatsSection
<GitHubStatsSection username="octocat" stats={statsData} />

// ProfileMetadataSection
<ProfileMetadataSection 
  location="San Francisco"
  company="GitHub"
  email="user@example.com"
  createdAt="2011-01-25T18:44:36Z"
/>
```

## Testing

### Running Tests

```bash
npm test
# or
pnpm test
```

### Test Coverage

- Unit tests for `useGitHubProfile` hook
- Integration tests for ProfilePage component
- Mock GitHub API responses
- Error state testing
- Caching behavior testing

### Manual Testing Checklist

- [ ] Load profile with valid username
- [ ] Load profile with invalid username (404)
- [ ] Test rate limiting by removing token
- [ ] Test caching by refreshing page
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Test error retry functionality
- [ ] Test with slow network simulation
- [ ] Test sidebar navigation on mobile

## Deployment

### Environment Variables

Production deployment requires:

```bash
# Required for production
REACT_APP_GITHUB_TOKEN="production_token"
```

### Build Verification

```bash
npm run build
# Verify no warnings or errors
npm run lint
# Check code quality
```

### Pre-deployment Checklist

- [ ] GitHub token configured in production environment
- [ ] Token has correct scopes (public_repo, user)
- [ ] Test profile page loads in production
- [ ] Verify error handling works
- [ ] Check responsive design on all screen sizes
- [ ] Monitor API error rates
- [ ] Have rollback plan ready

### Staging Environment

Test in staging before production:

```bash
# Deploy to staging
git push staging main

# Test at https://staging.example.com/profile

# Verify:
# - Profile loads correctly
# - API calls work
# - Error handling functions
# - Performance is acceptable
```

## Troubleshooting

### "Profile not found" error

- Verify GitHub username spelling
- Check internet connection
- Try accessing the profile directly on github.com

### Rate limit errors

- Add/verify GitHub API token in `.env.local`
- Wait for rate limit window to reset (typically 1 hour)
- Use authenticated endpoint for higher rate limits

### Styles not loading

- Ensure shadcn/ui components are installed
- Check Tailwind CSS configuration
- Clear Next.js build cache: `rm -rf .next`

### Cache not working

- Check browser local storage is enabled
- Verify session hasn't expired
- Try clearing cache manually: Use refetch() method

## Future Improvements

Potential enhancements:

1. **GitHub GraphQL API**: For more efficient data fetching
2. **Multi-user comparison**: Compare stats between users
3. **Repository listing**: Show user's recent repositories
4. **Activity feed**: Display user's recent GitHub activity
5. **Search history**: Remember previously viewed profiles
6. **Data export**: Export profile data as PDF/JSON
7. **Dark mode toggle**: Additional theme support
8. **Real-time updates**: WebSocket integration for live stats

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub API documentation: https://docs.github.com/en/rest
3. Open an issue in the repository
4. Check recent commits for breaking changes

## References

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
