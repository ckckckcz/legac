This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

### Required Environment Variables

This application requires the following environment variables to be configured:

#### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string for the application database

#### GitHub OAuth Configuration
- `GITHUB_ID`: GitHub OAuth application ID
- `GITHUB_SECRET`: GitHub OAuth application secret
- `AUTH_SECRET`: NextAuth secret key for session encryption (use a secure random string)

#### Optional Configuration
- `REACT_APP_GITHUB_TOKEN`: GitHub personal access token for GitHub API calls (optional, used for public API access)

### Local Development Setup

1. Create a `.env.local` file in the project root
2. Add all required environment variables:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database"
   GITHUB_ID="your_github_oauth_app_id"
   GITHUB_SECRET="your_github_oauth_app_secret"
   AUTH_SECRET="generate_a_random_secure_string"
   REACT_APP_GITHUB_TOKEN="your_github_token_optional"
   ```

### GitHub OAuth Setup

To set up GitHub OAuth for this application:

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with the following:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:3000` (for local dev)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret and add them to your `.env.local` file as `GITHUB_ID` and `GITHUB_SECRET`

### Production Deployment

For production deployment, set environment variables through your hosting platform's environment configuration:
- Set `GITHUB_ID`, `GITHUB_SECRET`, and `AUTH_SECRET` in your production environment variables
- Update the GitHub OAuth app's callback URL to your production domain: `https://yourdomain.com/api/auth/callback/github`
- Use a strong, randomly-generated string for `AUTH_SECRET` in production

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
