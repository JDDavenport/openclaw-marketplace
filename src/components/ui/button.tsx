import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'default' && 'bg-white text-gray-950 hover:bg-gray-200',
          variant === 'outline' && 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white',
          variant === 'ghost' && 'text-gray-400 hover:text-white hover:bg-gray-800',
          variant === 'gradient' && 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-5 py-2.5 text-sm',
          size === 'lg' && 'px-8 py-3.5 text-base',
          className,
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
