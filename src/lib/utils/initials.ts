'use client';

/**
 * Generate user initials from name or username
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param username - User's GitHub username (fallback)
 * @returns Two-character initials string (uppercase)
 */
export function generateInitials(
  firstName?: string,
  lastName?: string,
  username?: string
): string {
  // If we have first and last name, use first letter of each
  if (firstName && lastName) {
    return (firstName[0] + lastName[0]).toUpperCase();
  }

  // If we have first name and username, combine first letters
  if (firstName && username) {
    return (firstName[0] + username[0]).toUpperCase();
  }

  // If we only have first name, use first two letters or pad with first letter
  if (firstName) {
    return (firstName[0] + (firstName[1] || firstName[0])).toUpperCase();
  }

  // If we only have last name, use first two letters or pad
  if (lastName) {
    return (lastName[0] + (lastName[1] || lastName[0])).toUpperCase();
  }

  // If we only have username, use first two letters or pad
  if (username) {
    return (username[0] + (username[1] || username[0])).toUpperCase();
  }

  // Default fallback
  return 'U';
}

/**
 * Generate a consistent background color based on username/identifier
 * Uses a hash to ensure same user always gets same color
 * @param identifier - Username or unique identifier
 * @returns Background color class name
 */
export function getInitialsBgColor(identifier?: string): string {
  if (!identifier) return 'bg-slate-200 text-slate-700';

  // Simple hash function to convert identifier to number
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Color palette - consistent, accessible combinations
  const colors = [
    'bg-red-200 text-red-700',
    'bg-orange-200 text-orange-700',
    'bg-amber-200 text-amber-700',
    'bg-yellow-200 text-yellow-700',
    'bg-lime-200 text-lime-700',
    'bg-green-200 text-green-700',
    'bg-emerald-200 text-emerald-700',
    'bg-teal-200 text-teal-700',
    'bg-cyan-200 text-cyan-700',
    'bg-blue-200 text-blue-700',
    'bg-indigo-200 text-indigo-700',
    'bg-purple-200 text-purple-700',
    'bg-fuchsia-200 text-fuchsia-700',
    'bg-pink-200 text-pink-700',
    'bg-rose-200 text-rose-700',
  ];

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
