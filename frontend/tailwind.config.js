/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#141217',
        'bg-secondary': '#1B191E',
        'bg-panel': '#1F1C22',
        'line': '#2E2A32',
        'line-bright': '#423C48',
        'fg-primary': '#F6F4F1',
        'fg-secondary': '#A79FA0',
        'fg-muted': '#6E6870',
        'accent': '#E8724C',
        'accent-dim': '#C15A38',
        'signal': '#4ADE80',
      },
      fontFamily: {
        display: ['var(--font-cabinet-grotesk)', 'Arial Black', 'sans-serif'],
        sans: ['var(--font-inter-tight)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '0.5rem',
        DEFAULT: '0.875rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.25rem',
        full: '9999px',
      },
      letterSpacing: {
        tightest: '-0.045em',
        data: '0.06em',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
