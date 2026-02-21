// Avatar Storage and Retrieval Module
import { promises as fs } from 'fs';
import path from 'path';

const AVATARS_DIR = 'public/avatars';
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

export class AvatarStorage {
  /**
   * Save uploaded avatar file locally
   */
  static async saveAvatarLocally(file: Buffer, userId: string | number, extension: string): Promise<string> {
    try {
      // Ensure avatars directory exists
      const dir = path.join(process.cwd(), AVATARS_DIR);
      await fs.mkdir(dir, { recursive: true });

      // Generate filename
      const timestamp = Date.now();
      const filename = `${userId}-${timestamp}.${extension}`;
      const filePath = path.join(dir, filename);

      // Save file
      await fs.writeFile(filePath, file);

      // Return public URL path
      return `/avatars/${filename}`;
    } catch (error) {
      console.error('Error saving avatar locally:', error);
      throw error;
    }
  }

  /**
   * Delete avatar file
   */
  static async deleteAvatar(avatarUrl: string): Promise<boolean> {
    try {
      // Extract filename from URL
      const filename = avatarUrl.split('/').pop();
      if (!filename) return false;

      const filePath = path.join(process.cwd(), AVATARS_DIR, filename);

      // Check if file exists before deleting
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        return true;
      } catch (error) {
        // File doesn't exist, return true anyway
        return true;
      }
    } catch (error) {
      console.error('Error deleting avatar:', error);
      return false;
    }
  }

  /**
   * Get avatar URL (GitHub or custom)
   */
  static getAvatarUrl(githubAvatarUrl: string | null, customAvatarUrl: string | null): string {
    // Prefer custom avatar if set, fall back to GitHub avatar
    return customAvatarUrl || githubAvatarUrl || '/avatars/default-avatar.png';
  }

  /**
   * Validate avatar file
   */
  static validateAvatar(file: File | null): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }

    // Check file size
    if (file.size > MAX_AVATAR_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum ${MAX_AVATAR_SIZE / 1024 / 1024}MB allowed`,
      };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Allowed: JPG, PNG, WebP',
      };
    }

    return { valid: true };
  }

  /**
   * Get file extension from MIME type
   */
  static getExtensionFromMimeType(mimeType: string): string {
    const mimeMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };
    return mimeMap[mimeType] || 'jpg';
  }

  /**
   * Get avatar URL for CDN (for future scaling)
   */
  static getCdnAvatarUrl(filename: string): string {
    // TODO: Replace with actual CDN URL when implemented
    // const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
    // return `${CDN_BASE_URL}${filename}`;

    return `/avatars/${filename}`;
  }
}
