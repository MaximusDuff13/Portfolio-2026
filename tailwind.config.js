/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        body: '#fdfbf7',
        foundation: {
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          800: '#292524',
          900: '#1c1917',
        },
        border:        '#e7e5e4',
        'btn-border':  '#d6d3d1',
        'icon-accent': '#2563eb',
        success: { fill: '#f0f4ee', border: '#c2d4bc', text: '#3a5c35' },
        warning: { fill: '#fdf6ec', border: '#e8d5b4', text: '#7c5a2a' },
        error:   { fill: '#fef2f2', border: '#fecaca', text: '#991b1b' },
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.08', letterSpacing: '-0.04em', fontWeight: '500' }],
        'display-xl': ['52px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '500' }],
        'heading-l':  ['36px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-xl': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-m':  ['24px', { lineHeight: '1.20', letterSpacing: '-0.02em', fontWeight: '500' }],
        stat:         ['48px', { lineHeight: '1.00', letterSpacing: '-0.02em', fontWeight: '600' }],
        label:        ['11px', { lineHeight: '1.00', letterSpacing: '0.09em',  fontWeight: '700' }],
        'nav-tab':    ['14px', { lineHeight: '1.00', fontWeight: '500' }],
        body:         ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm':    ['14px', { lineHeight: '1.65', fontWeight: '400' }],
        link:         ['13px', { lineHeight: '1.00', fontWeight: '500' }],
        'ui-chrome':  ['13px', { lineHeight: '1.00', fontWeight: '400' }],
      },
      spacing: {
        section: '80px',
      },
    },
  },
  plugins: [],
}
