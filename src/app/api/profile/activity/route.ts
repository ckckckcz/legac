import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { ActivityFilterOptions, PaginatedResponse, ActivityLog } from '@/lib/types/profile';
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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10);
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10);
    const eventType = searchParams.get('eventType') || undefined;
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;

    const limit = Number.isNaN(rawLimit) ? 20 : Math.min(Math.max(rawLimit, 0), 100);
    const offset = Number.isNaN(rawOffset) ? 0 : Math.max(rawOffset, 0);

    const filters: ActivityFilterOptions = {
      limit,
      offset,
      eventType,
      startDate,
      endDate,
    };

    const pool = getPool();
    const params: Array<string | Date | number> = [appUser.userId];
    const whereClauses = ['user_id = $1'];

    if (filters.eventType) {
      params.push(filters.eventType);
      whereClauses.push(`event_type = $${params.length}`);
    }

    if (filters.startDate && !Number.isNaN(filters.startDate.getTime())) {
      params.push(filters.startDate);
      whereClauses.push(`created_at >= $${params.length}`);
    }

    if (filters.endDate && !Number.isNaN(filters.endDate.getTime())) {
      params.push(filters.endDate);
      whereClauses.push(`created_at <= $${params.length}`);
    }

    const whereSql = whereClauses.join(' AND ');

    const countResult = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM activity_logs
       WHERE ${whereSql}`,
      params
    );

    const dataParams = [...params, filters.limit!, filters.offset!];
    const dataResult = await pool.query(
      `SELECT
         id,
         user_id,
         event_type,
         event_data,
         created_at
       FROM activity_logs
       WHERE ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${params.length + 1}
       OFFSET $${params.length + 2}`,
      dataParams
    );

    const activityLogs: ActivityLog[] = dataResult.rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      event_type: row.event_type,
      event_data: row.event_data,
      created_at: row.created_at,
    }));

    const response: PaginatedResponse<ActivityLog> = {
      data: activityLogs,
      total: countResult.rows[0]?.total || 0,
      limit: filters.limit!,
      offset: filters.offset!,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/profile/activity error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
