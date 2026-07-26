import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6E56',
          light: '#1D9E75',
        },
        accent: '#BA7517',
        'bg-light': '#F8F7F4',
        'bg-dark': '#111210',
        'surface-dark': '#1C1E1B',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui'],
        body: ['var(--font-dm-sans)', 'system-ui'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--foreground))',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
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
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
