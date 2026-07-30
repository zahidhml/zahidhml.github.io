'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variant === 'default' && 'bg-[#7400B8] text-white hover:bg-[#6930C3]',
          variant === 'ghost' && 'hover:bg-white/10 text-white',
          variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
          size === 'icon' ? 'h-9 w-9 rounded-full' : 'px-4 py-2 text-sm rounded-xl',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
