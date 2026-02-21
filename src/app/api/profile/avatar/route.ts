import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 5MB allowed' },
        { status: 400 }
      );
    }

    // TODO: Implement actual file storage
    // - Save file to public/avatars/ or CDN
    // - Optimize image (resize to 256x256, compress)
    // - Update database with custom_avatar_url
    // const buffer = await file.arrayBuffer();
    // const fileName = `${session.user.id}-${Date.now()}.${getExtension(file.type)}`;
    // await saveFile(fileName, buffer);

    // Mock response
    const mockUrl = `/public/avatars/${session.user.id}-${Date.now()}.jpg`;

    return NextResponse.json({
      url: mockUrl,
      size: file.size,
      uploadedAt: new Date(),
    });
  } catch (error) {
    console.error('POST /api/profile/avatar error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
