'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} className={cn('aspect-square h-full w-full object-cover', className)} {...props} />
  );
}

export function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white', className)} {...props}>
      {children}
    </div>
  );
}
