'use client';

import { useEffect, useRef } from 'react';

interface Snippet {
  text: string;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  opacity: number;
  fontSize: number;
  driftAngle: number;
  driftSpeed: number;
}

const CODE_SNIPPETS = [
  `<section class="hero">\n  <h1>Hello World</h1>\n  <p>WordPress Dev</p>\n</section>`,
  `const seo = {\n  title: "Zahid Iqbal",\n  keywords: ["WordPress",\n  "WooCommerce", "SEO"]\n};`,
  `@media (max-width: 768px) {\n  .container {\n    padding: 1rem;\n    flex-direction: column;\n  }\n}`,
  `git commit -m "feat: add\nWooCommerce payment\ngateway integration"`,
  `{\n  "@type": "Product",\n  "name": "Chitrali Shawl",\n  "price": "2500 PKR"\n}`,
  `npm run build\n✓ Compiled successfully\n✓ Lighthouse: 98\n✓ SEO: 100`,
  `add_filter('wp_head',\n  function() {\n    // Custom SEO meta\n    echo get_schema();\n  }\n);`,
  `import { useState,\n  useEffect } from 'react';\n\nexport function Hero() {\n  return <main />\n}`,
  `body {\n  font-family: 'Inter Tight';\n  background: #050816;\n  color: #FFFFFF;\n}`,
  `SELECT p.post_title,\n  m.meta_value AS price\nFROM wp_posts p\nWHERE post_status='publish'`,
  `// Lighthouse Score\nPerformance:  98 ✓\nSEO:         100 ✓\nAccessible:   95 ✓\nBest Pract:   96 ✓`,
  `woocommerce_add_to_cart(\n  $product_id,\n  $quantity = 1,\n  $variation_id\n);`,
  `ssl_certificate /etc/letsencrypt/\nlive/example.com/cert.pem;\nssl_protocols TLSv1.3;`,
  `const router = useRouter();\nconst { scrollTo } = useLenis();\n\nscrollTo('#contact', {\n  offset: -80\n});`,
  `wp_enqueue_script(\n  'custom-js',\n  get_template_dir() . '/js/main.js',\n  ['jquery'], '1.0', true\n);`,
];

const REPEL_DIST    = 180;
const REPEL_FORCE   = 1.6;
const SPRING        = 0.035;
const DAMPING       = 0.78;

/**
 * FloatingCodeBg — canvas rendering of slowly drifting code snippets.
 * Mouse repulsion: snippets spring away from the cursor and smoothly return.
 * Opacity 4–7% so they never reduce readability.
 */
export default function FloatingCodeBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Scatter snippets across the full canvas
    const snippets: Snippet[] = CODE_SNIPPETS.map((text) => {
      const bx = 60 + Math.random() * (canvas.width  - 140);
      const by = 60 + Math.random() * (canvas.height - 120);
      return {
        text,
        baseX: bx, baseY: by,
        x: bx, y: by,
        vx: 0, vy: 0,
        speed: 0.06 + Math.random() * 0.08,
        opacity: 0.04 + Math.random() * 0.03,
        fontSize: 10 + Math.random() * 2.5,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.004 + Math.random() * 0.004,
      };
    });

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let rafId: number;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (paused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `10px 'JetBrains Mono', 'Fira Code', monospace`;

      for (const s of snippets) {
        // Slow circular drift of the base position
        s.driftAngle += s.driftSpeed;
        s.baseX += Math.cos(s.driftAngle) * s.speed * 0.12;
        s.baseY += Math.sin(s.driftAngle) * s.speed * 0.10;

        // Wrap vertically — float upward and re-enter at bottom
        s.baseY -= s.speed;
        if (s.baseY < -200) {
          s.baseY = canvas.height + 80;
          s.baseX = 60 + Math.random() * (canvas.width - 140);
          s.x = s.baseX;
          s.y = s.baseY;
        }

        // Mouse repulsion (spring physics)
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_DIST && dist > 0) {
          const force = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_FORCE;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }

        // Spring return
        s.vx += (s.baseX - s.x) * SPRING;
        s.vy += (s.baseY - s.y) * SPRING;

        // Damping
        s.vx *= DAMPING;
        s.vy *= DAMPING;

        s.x += s.vx;
        s.y += s.vy;

        // Draw
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.font = `${s.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
        ctx.fillStyle = '#80FFDB';

        const lines = s.text.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, s.x, s.y + i * (s.fontSize + 3.5));
        });
        ctx.restore();
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}
