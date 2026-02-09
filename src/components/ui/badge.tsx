import { cn } from '@/lib/utils';
import React from 'react';

const categoryColors: Record<string, string> = {
  Monitors: 'bg-green-500/10 text-green-400 border-green-500/20',
  Workers: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Premium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  const colorKey = variant || (typeof children === 'string' ? children.split(' ')[0] : '');
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        categoryColors[colorKey] || 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        className,
      )}
    >
      {children}
    </span>
  );
}
