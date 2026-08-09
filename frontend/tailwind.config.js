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
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#121212',
        'bg-panel': '#141414',
        'line': '#2a2a2a',
        'line-bright': '#3d3d3d',
        'fg-primary': '#eaeaea',
        'fg-secondary': '#8a8a8a',
        'fg-muted': '#5c5c5c',
        'accent': '#5b7a8c',
        'accent-dim': '#46606f',
        'signal': '#4af626',
      },
      fontFamily: {
        display: ['var(--font-archivo-black)', 'Arial Black', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      boxShadow: {
        none: 'none',
      },
      letterSpacing: {
        tightest: '-0.06em',
        data: '0.08em',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '8%': { opacity: '0.4' },
          '10%': { opacity: '1' },
          '20%': { opacity: '0.7' },
          '22%': { opacity: '1' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      animation: {
        flicker: 'flicker 1.2s steps(1) 1',
        scan: 'scan 8s linear infinite',
      },
    },
  },
  plugins: [],
}
