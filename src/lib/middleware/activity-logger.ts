// Activity Logging Middleware
import { auth } from '@/auth';
import { ActivityLogInput } from '@/lib/types/profile';

/**
 * Logs user activities to the activity_logs table
 * Tracks events like profile updates, avatar changes, login events, etc.
 */

export class ActivityLogger {
  /**
   * Log a user activity event
   */
  static async logEvent(userId: number, eventType: string, eventData?: Record<string, any>) {
    try {
      // TODO: Implement database insert
      // const result = await db.query(
      //   'INSERT INTO app.activity_logs (user_id, event_type, event_data, created_at) VALUES ($1, $2, $3, NOW())',
      //   [userId, eventType, eventData ? JSON.stringify(eventData) : null]
      // );
      
      console.log(`Activity logged: ${eventType} for user ${userId}`, eventData);
    } catch (error) {
      console.error('Failed to log activity:', error);
      // Don't throw - logging failures shouldn't break the main operation
    }
  }

  /**
   * Log profile update event
   */
  static async logProfileUpdate(userId: number, changes: Record<string, any>) {
    await this.logEvent(userId, 'profile_update', {
      timestamp: new Date(),
      changes,
    });
  }

  /**
   * Log avatar change event
   */
  static async logAvatarChange(userId: number, newAvatarUrl: string) {
    await this.logEvent(userId, 'avatar_change', {
      timestamp: new Date(),
      avatar_url: newAvatarUrl,
    });
  }

  /**
   * Log settings change event
   */
  static async logSettingsChange(userId: number, changes: Record<string, any>) {
    await this.logEvent(userId, 'settings_change', {
      timestamp: new Date(),
      changes,
    });
  }

  /**
   * Log login event
   */
  static async logLogin(userId: number, ipAddress?: string, userAgent?: string) {
    await this.logEvent(userId, 'login', {
      timestamp: new Date(),
      ip_address: ipAddress,
      user_agent: userAgent,
    });
  }

  /**
   * Log document upload event
   */
  static async logDocumentUpload(userId: number, documentName: string, documentSize: number) {
    await this.logEvent(userId, 'document_upload', {
      timestamp: new Date(),
      document_name: documentName,
      document_size: documentSize,
    });
  }

  /**
   * Log document download event
   */
  static async logDocumentDownload(userId: number, documentName: string) {
    await this.logEvent(userId, 'document_download', {
      timestamp: new Date(),
      document_name: documentName,
    });
  }
}

/**
 * Middleware to automatically log activities on API requests
 */
export async function logActivityMiddleware(
  handler: (req: any) => Promise<any>,
  eventType: string
) {
  return async (req: any) => {
    const session = await auth();
    
    try {
      const response = await handler(req);
      
      // Log the activity if request was successful
      if (session?.user?.id && response.status >= 200 && response.status < 300) {
        await ActivityLogger.logEvent(session.user.id, eventType, {
          method: req.method,
          path: req.nextUrl.pathname,
        });
      }
      
      return response;
    } catch (error) {
      console.error(`Error in ${eventType} handler:`, error);
      throw error;
    }
  };
}
