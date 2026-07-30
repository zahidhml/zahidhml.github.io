import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary violet-to-aquamarine spectrum
        primary: {
          DEFAULT: '#7400B8',
          light: '#6930C3',
        },
        accent: '#5E60CE',
        'blue-energy': '#5390D9',
        'fresh-sky': '#4EA8DE',
        'sky-surge': '#48BFE3',
        'strong-cyan': '#56CFE1',
        'pearl-aqua': '#64DFDF',
        turquoise: '#72EFDD',
        aquamarine: '#80FFDB',

        // Dark backgrounds
        'bg-primary': '#050816',
        'bg-secondary': '#0B1021',
        'surface-dark': '#0F1629',
        'card-dark': 'rgba(255,255,255,0.05)',

        // Legacy aliases kept for any remaining references
        'bg-light': '#F8F7F4',
        'bg-dark': '#050816',
      },
      fontFamily: {
        display: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #7400B8, #5E60CE)',
        'gradient-cyan': 'linear-gradient(135deg, #48BFE3, #80FFDB)',
        'gradient-full':
          'linear-gradient(135deg, #7400B8, #6930C3, #5E60CE, #48BFE3, #80FFDB)',
        'gradient-hero':
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(116,0,184,0.3), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'border-shimmer': 'borderShimmer 3s linear infinite',
        'scroll-cue': 'scrollCue 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(116, 0, 184, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(116, 0, 184, 0.6)' },
        },
        borderShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        scrollCue: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(116, 0, 184, 0.4)',
        'glow-cyan': '0 0 30px rgba(128, 255, 219, 0.3)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(116, 0, 184, 0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
};

export default config;
