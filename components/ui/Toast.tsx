'use client';

import { useEffect } from 'react';
import { Toaster } from 'sonner';

interface ToastProps {}

/**
 * Toast component
 * Provides toast notification system using Sonner
 */
export default function Toast({}: ToastProps) {
  return (
    <Toaster
      position="bottom-right"
      theme="system"
      richColors
      closeButton
      expand
    />
  );
}
