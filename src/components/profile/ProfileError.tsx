/**
 * ProfileError Component
 * Shows error message with retry functionality
 */

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ProfileErrorProps {
  error: Error;
  onRetry: () => void;
  username: string;
}

export function ProfileError({ error, onRetry, username }: ProfileErrorProps) {
  const isRateLimit = error.message.includes('403');
  const isNotFound = error.message.includes('404');

  let errorTitle = 'Failed to Load Profile';
  let errorMessage = `We couldn't load the profile for @${username}. Please try again.`;

  if (isRateLimit) {
    errorTitle = 'Rate Limit Exceeded';
    errorMessage =
      'GitHub API rate limit exceeded. Please wait a few minutes and try again.';
  } else if (isNotFound) {
    errorTitle = 'Profile Not Found';
    errorMessage = `No GitHub profile found for @${username}. Please check the username and try again.`;
  }

  return (
    <div className="w-full space-y-4">
      {/* Error Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          GitHub Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          View GitHub profile information and statistics
        </p>
      </div>

      {/* Error Card */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            {/* Error Icon */}
            <div className="text-destructive flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>

            {/* Error Content */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {errorTitle}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {errorMessage}
                </p>
              </div>

              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-muted p-3 rounded text-xs font-mono text-muted-foreground">
                  <p className="font-semibold mb-1">Error Details:</p>
                  <p className="break-all">{error.message}</p>
                </div>
              )}

              {/* Retry Button */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={onRetry}
                  variant="default"
                  size="sm"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>

                {isNotFound && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = window.prompt(
                        'Enter a GitHub username:',
                        'octocat'
                      );
                      if (input) {
                        window.location.href = `/profile?user=${encodeURIComponent(input)}`;
                      }
                    }}
                  >
                    Try Different User
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="bg-muted/50 border rounded-lg p-4 space-y-2 text-sm">
        <p className="font-semibold text-foreground">Troubleshooting:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Verify the GitHub username is spelled correctly</li>
          <li>Check your internet connection</li>
          <li>If you're seeing rate limit errors, wait a few minutes and try again</li>
          {!process.env.REACT_APP_GITHUB_TOKEN && (
            <li>
              For better performance, configure a GitHub API token in your
              environment variables
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileError;
