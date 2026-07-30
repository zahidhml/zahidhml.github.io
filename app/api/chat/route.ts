import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getSystemPrompt } from '@/lib/ai/system-prompt';

export const maxDuration = 30;

function createMockStreamResponse(userQuery: string) {
  const q = (userQuery || '').toLowerCase();
  let reply = "Muhammad Zahid Iqbal is a WordPress Developer and Technical SEO Specialist based in Chitral, Pakistan. He specializes in building fast, accessible, and SEO-optimized web experiences using WordPress, WooCommerce, React, and Next.js.";

  if (q.includes('hire') || q.includes('freelance') || q.includes('available') || q.includes('work') || q.includes('remote')) {
    reply = "Zahid is currently available for freelance projects, remote positions, and full-time opportunities! You can reach out directly via email at **mzahidiqbal129@gmail.com** or WhatsApp at **+92 348 6377723**.";
  } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('expertise')) {
    reply = "Zahid's core technical stack includes:\n- **CMS & E-Commerce**: WordPress, WooCommerce, Elementor\n- **Frontend**: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS\n- **Backend & Tools**: PHP, Git, GitHub, REST APIs\n- **SEO & Speed**: Technical SEO, Schema.org, Core Web Vitals, Google Lighthouse, DNS & Migration";
  } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('reach')) {
    reply = "You can contact Zahid directly:\n- **Email**: mzahidiqbal129@gmail.com\n- **Phone / WhatsApp**: +92 348 6377723\n- **GitHub**: [github.com/zahidhml](https://github.com/zahidhml)\n- **Portfolio**: [mzahid.is-a.dev](https://mzahid.is-a.dev)";
  } else if (q.includes('project') || q.includes('portfolio') || q.includes('build') || q.includes('experience')) {
    reply = "Zahid has engineered multiple client and personal projects, including:\n- **Upper Hand Organization** (Non-profit web platform)\n- **Chitrali Saughat** (E-commerce store)\n- **A One Patti Chitral** (Business website)\n- **Personal Portfolio** (Built with Next.js 15, Tailwind CSS, & AI Assistant)";
  }

  // Split into words for fast, natural typing effect
  const words = reply.split(/(\s+)/);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        await new Promise((r) => setTimeout(r, 6));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export async function POST(req: Request) {
  let userLastMessage = '';
  try {
    const { messages } = await req.json();
    if (Array.isArray(messages) && messages.length > 0) {
      userLastMessage = messages[messages.length - 1]?.content || '';
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here' || apiKey.trim() === '') {
      return createMockStreamResponse(userLastMessage);
    }

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: getSystemPrompt(),
      messages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI Chat Error (falling back to mock stream):', error);
    return createMockStreamResponse(userLastMessage);
  }
}
