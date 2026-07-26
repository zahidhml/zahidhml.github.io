import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'outline' | 'ghost';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  primary:
    'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light',
  accent:
    'bg-accent/10 dark:bg-accent/20 text-accent dark:text-amber-400',
  outline:
    'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300',
  ghost:
    'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

/**
 * Badge — versatile tag/label component used throughout the portfolio.
 */
export default function Badge({
  label,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
}
