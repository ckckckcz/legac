// Profile Authorization Middleware
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Verifies that the authenticated user owns the profile data they're trying to access
 * Used to ensure users can only access and modify their own profile information
 */
export async function withProfileAuth(
  handler: (req: NextRequest, session: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const session = await auth();

      // Verify authentication
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: 'Unauthorized: Please sign in' },
          { status: 401 }
        );
      }

      // Optional: Verify user has profile ownership for specific routes
      // For GET /api/profile/[userId], verify userId matches session.user.id
      const pathSegments = req.nextUrl.pathname.split('/');
      const userId = pathSegments[pathSegments.length - 1];

      if (userId && userId !== 'avatar' && userId !== 'activity') {
        // For specific user profile endpoints
        const paramUserId = parseInt(userId, 10);
        if (isNaN(paramUserId) || paramUserId !== session.user.id) {
          return NextResponse.json(
            { error: 'Forbidden: Cannot access other users profiles' },
            { status: 403 }
          );
        }
      }

      // Call the handler with authenticated session
      return handler(req, session);
    } catch (error) {
      console.error('Authorization middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Middleware to check if user is authenticated and has necessary permissions
 */
export async function requireAuth(req: NextRequest): Promise<boolean> {
  const session = await auth();
  return !!session?.user?.id;
}

/**
 * Middleware to verify request belongs to authenticated user
 */
export async function verifyUserOwnership(
  req: NextRequest,
  targetUserId: number
): Promise<boolean> {
  const session = await auth();
  return session?.user?.id === targetUserId;
}
