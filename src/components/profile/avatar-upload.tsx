'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { AvatarDisplay } from './avatar-display';
import { UserProfile } from '@/lib/types/profile';
import { ImageValidator } from '@/lib/utils/image-validator';

interface AvatarUploadProps {
  profile: UserProfile;
  onUpload: (file: File) => Promise<string>;
  isLoading?: boolean;
}

export function AvatarUpload({ profile, onUpload, isLoading = false }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploadProgress(0);

    // Validate file
    const validation = ImageValidator.validateImage(file);
    if (!validation.valid) {
      setError(validation.errors[0]);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError('Please select a file first');
      return;
    }

    const file = fileInputRef.current.files[0];

    try {
      setUploadProgress(50);
      await onUpload(file);
      setUploadProgress(100);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload avatar');
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setError('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Avatar</h2>

      <div className="space-y-6">
        {/* Current Avatar */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Current Avatar</p>
          <AvatarDisplay profile={profile} size="lg" />
        </div>

        {/* Preview */}
        {preview && (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Preview</p>
            <img
              src={preview}
              alt="Avatar preview"
              className="w-24 h-24 rounded-full mx-auto border-2 border-blue-500 object-cover"
            />
          </div>
        )}

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Choose New Avatar</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={isLoading || uploadProgress > 0}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, or WebP (Max 5MB)</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {preview && (
            <>
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
              >
                {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
