'use client';

import dynamic from 'next/dynamic';

export const LazyChatWidget = dynamic(
  () => import('@/components/ui/floating-chat-widget-shadcnui').then(mod => mod.FloatingChatWidget),
  { ssr: false }
);
