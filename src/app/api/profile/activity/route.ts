import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { ActivityFilterOptions, PaginatedResponse, ActivityLog } from '@/lib/types/profile';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const eventType = searchParams.get('eventType') || undefined;
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;

    const filters: ActivityFilterOptions = {
      limit: Math.min(limit, 100), // Cap at 100
      offset,
      eventType,
      startDate,
      endDate,
    };

    // TODO: Implement database query for activity logs
    // const result = await db.query(
    //   'SELECT * FROM app.activity_logs WHERE user_id = (SELECT id FROM app.users WHERE github_id = $1) AND ...',
    //   [session.user.id]
    // );

    // Mock data
    const mockActivityLogs: ActivityLog[] = [
      {
        id: 1,
        user_id: 1,
        event_type: 'login',
        event_data: { ip: '192.168.1.1', user_agent: 'Mozilla/5.0' },
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: 2,
        user_id: 1,
        event_type: 'profile_update',
        event_data: { field: 'bio', old_value: null, new_value: 'Test bio' },
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];

    const response: PaginatedResponse<ActivityLog> = {
      data: mockActivityLogs,
      total: mockActivityLogs.length,
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
