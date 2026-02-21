'use server';

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { UserProfileInput } from '@/lib/types/profile';

// TODO: Replace with actual database client
// import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Implement database query to fetch user profile
    // const profile = await db.query(
    //   'SELECT * FROM app.user_profiles WHERE github_id = $1',
    //   [session.user.id]
    // );

    // For now, return mock data
    const mockProfile = {
      id: 1,
      github_id: session.user.id,
      name: session.user.name || null,
      email: session.user.email || null,
      bio: null,
      avatar_url: session.user.image || null,
      custom_avatar_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return NextResponse.json(mockProfile);
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

    if (!session?.user?.id) {
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

    // TODO: Implement database update
    // const result = await db.query(
    //   'UPDATE app.user_profiles SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio), updated_at = NOW() WHERE github_id = $4 RETURNING *',
    //   [body.name, body.email, body.bio, session.user.id]
    // );

    // Mock response
    const updatedProfile = {
      id: 1,
      github_id: session.user.id,
      name: body.name || session.user.name || null,
      email: body.email || session.user.email || null,
      bio: body.bio || null,
      avatar_url: session.user.image || null,
      custom_avatar_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('PUT /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
