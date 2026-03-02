/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        os: {
          bg: 'var(--os-bg)',
          surface: 'var(--os-surface)',
          panel: 'var(--os-panel)',
          border: 'var(--os-border)',
          accent: 'var(--os-accent)',
          green: 'var(--os-green)',
          red: 'var(--os-red)',
          yellow: 'var(--os-yellow)',
          cyan: 'var(--os-cyan)',
          purple: 'var(--os-purple)',
          orange: 'var(--os-orange)',
          pink: 'var(--os-pink)',
          text: 'var(--os-text)',
          muted: 'var(--os-muted)',
          dim: 'var(--os-dim)',
          white: 'var(--os-white)',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'boot-line': 'bootLine 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        bootLine: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
