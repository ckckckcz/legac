import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { UserProfileInput } from '@/lib/types/profile';
import { getPool } from '@/lib/db';
import { getOrCreateAppUser } from '@/lib/auth-db-user';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const appUser = await getOrCreateAppUser(session as any);
    if (!appUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const pool = getPool();
    let profileResult = await pool.query(
      `SELECT
         id,
         github_id::text AS github_id,
         name,
         email,
         bio,
         avatar_url,
         custom_avatar_url,
         created_at,
         updated_at
       FROM user_profiles
       WHERE user_id = $1`,
      [appUser.userId]
    );

    if (profileResult.rows.length === 0) {
      profileResult = await pool.query(
        `INSERT INTO user_profiles (user_id, github_id, name, email, bio, avatar_url, custom_avatar_url)
         VALUES ($1, $2, $3, $4, NULL, $5, NULL)
         RETURNING
           id,
           github_id::text AS github_id,
           name,
           email,
           bio,
           avatar_url,
           custom_avatar_url,
           created_at,
           updated_at`,
        [
          appUser.userId,
          appUser.githubId,
          session.user.name || null,
          session.user.email || null,
          session.user.image || null,
        ]
      );
    }

    return NextResponse.json(profileResult.rows[0]);
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: UserProfileInput = await request.json();

    // Validate input
    if (body.name && typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid name field' },
        { status: 400 }
      );
    }

    if (body.email && typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email field' },
        { status: 400 }
      );
    }

    if (body.bio && typeof body.bio !== 'string') {
      return NextResponse.json(
        { error: 'Invalid bio field' },
        { status: 400 }
      );
    }

    const appUser = await getOrCreateAppUser(session as any);
    if (!appUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO user_profiles (user_id, github_id, name, email, bio, avatar_url, custom_avatar_url)
       VALUES ($1, $2, $3, $4, $5, $6, NULL)
       ON CONFLICT (user_id)
       DO UPDATE SET
         name = COALESCE($3, user_profiles.name),
         email = COALESCE($4, user_profiles.email),
         bio = COALESCE($5, user_profiles.bio),
         avatar_url = COALESCE($6, user_profiles.avatar_url),
         updated_at = NOW()
       RETURNING
         id,
         github_id::text AS github_id,
         name,
         email,
         bio,
         avatar_url,
         custom_avatar_url,
         created_at,
         updated_at`,
      [
        appUser.userId,
        appUser.githubId,
        body.name ?? null,
        body.email ?? null,
        body.bio ?? null,
        session.user.image ?? null,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('PUT /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
