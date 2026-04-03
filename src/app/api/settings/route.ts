import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { UserSettingsInput } from '@/lib/types/profile';
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
    let result = await pool.query(
      `SELECT
         user_id,
         theme,
         notifications_enabled,
         email_notifications,
         profile_visibility,
         created_at,
         updated_at
       FROM user_settings
       WHERE user_id = $1`,
      [appUser.userId]
    );

    if (result.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO user_settings (
           user_id,
           theme,
           notifications_enabled,
           email_notifications,
           profile_visibility
         )
         VALUES ($1, 'auto', true, true, 'public')
         RETURNING
           user_id,
           theme,
           notifications_enabled,
           email_notifications,
           profile_visibility,
           created_at,
           updated_at`,
        [appUser.userId]
      );
    }

    return NextResponse.json(result.rows[0]);
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

    if (!session?.user) {
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

    if (body.notifications_enabled !== undefined && typeof body.notifications_enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid notifications_enabled value' },
        { status: 400 }
      );
    }

    if (body.email_notifications !== undefined && typeof body.email_notifications !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid email_notifications value' },
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
      `INSERT INTO user_settings (
         user_id,
         theme,
         notifications_enabled,
         email_notifications,
         profile_visibility
       )
       VALUES (
         $1,
         COALESCE($2, 'auto'),
         COALESCE($3, true),
         COALESCE($4, true),
         COALESCE($5, 'public')
       )
       ON CONFLICT (user_id)
       DO UPDATE SET
         theme = COALESCE($2, user_settings.theme),
         notifications_enabled = COALESCE($3, user_settings.notifications_enabled),
         email_notifications = COALESCE($4, user_settings.email_notifications),
         profile_visibility = COALESCE($5, user_settings.profile_visibility),
         updated_at = NOW()
       RETURNING
         user_id,
         theme,
         notifications_enabled,
         email_notifications,
         profile_visibility,
         created_at,
         updated_at`,
      [
        appUser.userId,
        body.theme ?? null,
        body.notifications_enabled ?? null,
        body.email_notifications ?? null,
        body.profile_visibility ?? null,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('PUT /api/settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
