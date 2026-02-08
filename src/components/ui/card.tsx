import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300',
        className,
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
export { Card };
