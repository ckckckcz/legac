// Profile Sync Utility
// Synchronizes GitHub OAuth data with database profile on first access
import { ProfileService } from './profile-service';
import { UserProfile } from '@/lib/types/profile';

interface GitHubUserData {
  id: string | number;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
}

export class ProfileSync {
  /**
   * Sync GitHub OAuth user data with database profile
   * Called on first profile access or login
   */
  static async syncGitHubProfile(
    githubId: string | number,
    githubData: GitHubUserData
  ): Promise<UserProfile> {
    try {
      // Check if profile already exists
      const exists = await ProfileService.profileExists(githubId);

      if (exists) {
        // Profile exists, return it
        console.log(`Profile already exists for GitHub ID: ${githubId}`);
        const profile = await ProfileService.getProfileByGithubId(githubId);
        return profile!;
      }

      // Profile doesn't exist, create it from GitHub data
      console.log(`Creating new profile for GitHub ID: ${githubId} from OAuth data`);
      const newProfile = await ProfileService.createProfile(githubId, {
        name: githubData.name || undefined,
        email: githubData.email || undefined,
      });

      // Update avatar URL from GitHub
      if (githubData.avatar_url) {
        await ProfileService.updateAvatarUrl(githubId, githubData.avatar_url, false);
      }

      return newProfile;
    } catch (error) {
      console.error('Error syncing GitHub profile:', error);
      throw error;
    }
  }

  /**
   * Check if profile data is in sync with GitHub data
   * Identifies mismatches that need manual resolution
   */
  static async checkProfileSync(
    githubId: string | number,
    githubData: GitHubUserData,
    dbProfile: UserProfile
  ): Promise<{ isSynced: boolean; mismatches: string[] }> {
    const mismatches: string[] = [];

    // Check name
    if (githubData.name && dbProfile.name !== githubData.name) {
      mismatches.push(`Name mismatch: DB="${dbProfile.name}", GitHub="${githubData.name}"`);
    }

    // Check email
    if (githubData.email && dbProfile.email !== githubData.email) {
      mismatches.push(`Email mismatch: DB="${dbProfile.email}", GitHub="${githubData.email}"`);
    }

    // Check avatar
    if (githubData.avatar_url && dbProfile.avatar_url !== githubData.avatar_url) {
      mismatches.push(`Avatar mismatch: DB="${dbProfile.avatar_url}", GitHub="${githubData.avatar_url}"`);
    }

    return {
      isSynced: mismatches.length === 0,
      mismatches,
    };
  }

  /**
   * Resync profile with GitHub data
   * Updates database profile with latest GitHub information
   */
  static async resyncProfile(
    githubId: string | number,
    githubData: GitHubUserData
  ): Promise<UserProfile> {
    try {
      console.log(`Resyncing profile for GitHub ID: ${githubId}`);

      const updated = await ProfileService.updateProfile(githubId, {
        name: githubData.name || undefined,
        email: githubData.email || undefined,
      });

      // Update avatar if provided and different
      if (githubData.avatar_url) {
        await ProfileService.updateAvatarUrl(githubId, githubData.avatar_url, false);
      }

      return updated;
    } catch (error) {
      console.error('Error resyncing profile:', error);
      throw error;
    }
  }

  /**
   * Log profile sync events for audit trail
   */
  static async logSyncEvent(
    githubId: string | number,
    action: 'created' | 'synced' | 'mismatch_detected' | 'resynced',
    details?: Record<string, any>
  ): Promise<void> {
    try {
      console.log(`Profile sync event - ${action} (GitHub ID: ${githubId})`, details);

      // TODO: Log to database for audit trail
      // await db.query(
      //   'INSERT INTO app.profile_sync_log (github_id, action, details, created_at) VALUES ($1, $2, $3, NOW())',
      //   [githubId, action, JSON.stringify(details)]
      // );
    } catch (error) {
      console.error('Error logging sync event:', error);
      // Don't throw - logging failures shouldn't break sync
    }
  }
}
