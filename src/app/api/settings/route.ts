'use server';

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { UserSettingsInput } from '@/lib/types/profile';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Implement database query to fetch user settings
    // const settings = await db.query(
    //   'SELECT * FROM app.user_settings WHERE user_id = (SELECT id FROM app.users WHERE github_id = $1)',
    //   [session.user.id]
    // );

    // Mock data with default settings
    const mockSettings = {
      user_id: session.user.id,
      theme: 'auto' as const,
      notifications_enabled: true,
      email_notifications: true,
      profile_visibility: 'public' as const,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return NextResponse.json(mockSettings);
  } catch (error) {
    console.error('GET /api/settings error:', error);
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

    const body: UserSettingsInput = await request.json();

    // Validate input
    if (body.theme && !['light', 'dark', 'auto'].includes(body.theme)) {
      return NextResponse.json(
        { error: 'Invalid theme value' },
        { status: 400 }
      );
    }

    if (body.profile_visibility && !['public', 'private', 'friends'].includes(body.profile_visibility)) {
      return NextResponse.json(
        { error: 'Invalid profile_visibility value' },
        { status: 400 }
      );
    }

    // TODO: Implement database update
    // const result = await db.query(
    //   'UPDATE app.user_settings SET ... WHERE user_id = (SELECT id FROM app.users WHERE github_id = $1) RETURNING *',
    //   [...]
    // );

    // Mock response
    const updatedSettings = {
      user_id: session.user.id,
      theme: body.theme || 'auto',
      notifications_enabled: body.notifications_enabled ?? true,
      email_notifications: body.email_notifications ?? true,
      profile_visibility: body.profile_visibility || 'public',
      created_at: new Date(),
      updated_at: new Date(),
    };

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
