import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  Productivity: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Health: 'bg-green-500/10 text-green-400 border-green-500/20',
  Finance: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Education: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Creative: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export function Badge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        categoryColors[children] || 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        className,
      )}
    >
      {children}
    </span>
  );
}
