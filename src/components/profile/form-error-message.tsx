'use client';

interface FormErrorMessageProps {
  message?: string;
  visible?: boolean;
}

export function FormErrorMessage({ message, visible = true }: FormErrorMessageProps) {
  if (!visible || !message) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start gap-3">
      <span className="text-xl mt-0.5">⚠️</span>
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
