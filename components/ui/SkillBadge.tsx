import { ReactNode } from 'react';

interface SkillBadgeProps {
  label: string;
}

/**
 * SkillBadge component
 * Renders individual skill/technology badge
 */
export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-medium border border-primary/20 dark:border-primary/30 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
      {label}
    </span>
  );
}
