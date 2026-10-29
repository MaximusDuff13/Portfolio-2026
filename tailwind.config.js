/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Every colour reads a token from globals.css (--c-*), so palettes swap in one place.
      colors: {
        body: 'oklch(var(--c-body) / <alpha-value>)',
        foundation: {
          100: 'oklch(var(--c-f100) / <alpha-value>)',
          200: 'oklch(var(--c-f200) / <alpha-value>)',
          300: 'oklch(var(--c-f300) / <alpha-value>)',
          400: 'oklch(var(--c-f400) / <alpha-value>)',
          500: 'oklch(var(--c-f500) / <alpha-value>)',
          600: 'oklch(var(--c-f600) / <alpha-value>)',
          700: 'oklch(var(--c-f700) / <alpha-value>)',
          800: 'oklch(var(--c-f800) / <alpha-value>)',
          900: 'oklch(var(--c-f900) / <alpha-value>)',
        },
        border:        'oklch(var(--c-f200) / <alpha-value>)',
        'btn-border':  'oklch(var(--c-f300) / <alpha-value>)',
        accent: {
          warm:   'oklch(var(--c-accent) / <alpha-value>)',
          subtle: 'oklch(var(--c-accent-subtle) / <alpha-value>)',
        },
        // Showcase backgrounds for case studies (globals.css --c-stage-*): bg-stage-sage, bg-stage-sage-strong…
        stage: Object.fromEntries(
          ['sage', 'sky', 'harbour', 'straw', 'ginger', 'mist'].flatMap((n) => [
            [n, `oklch(var(--c-stage-${n}) / <alpha-value>)`],
            [`${n}-strong`, `oklch(var(--c-stage-${n}-strong) / <alpha-value>)`],
          ]),
        ),
        success: { fill: '#f0f4ee', border: '#c2d4bc', text: '#3a5c35' },
        warning: { fill: '#fdf6ec', border: '#e8d5b4', text: '#7c5a2a' },
        error:   { fill: '#fef2f2', border: '#fecaca', text: '#991b1b' },
      },
      fontFamily: {
        // Two faces. Display (Fraunces) is for headings, titles and stats only; body
        // (Instrument Sans) is for running text and all interface text, labels included.
        display: ['var(--font-display)', 'serif'],
        sans:    ['var(--font-body)', 'sans-serif'],
        // Handwriting, for notes (Caveat).
        hand:    ['var(--font-hand)', 'cursive'],
      },
      // The type scale. Display sizes are set in font-display; label, nav-tab, link,
      // ui-chrome, body, body-sm and caption in font-sans. Fraunces tracks its own
      // optical size, so display tracking stays close to zero.
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-xl': ['52px', { lineHeight: '1.06', letterSpacing: '-0.015em', fontWeight: '500' }],
        'heading-xl': ['36px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-l':  ['32px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading-m':  ['24px', { lineHeight: '1.20', letterSpacing: '-0.01em', fontWeight: '500' }],
        stat:         ['48px', { lineHeight: '1.00', letterSpacing: '-0.01em', fontWeight: '500' }],
        label:        ['12px', { lineHeight: '1.00', letterSpacing: '0.08em',  fontWeight: '600' }],
        'nav-tab':    ['14px', { lineHeight: '1.00', fontWeight: '500' }],
        body:         ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm':    ['14px', { lineHeight: '1.65', fontWeight: '400' }],
        'caption':    ['13px', { lineHeight: '1.4',  fontWeight: '400' }],
        link:         ['13px', { lineHeight: '1.00', fontWeight: '500' }],
        'ui-chrome':  ['13px', { lineHeight: '1.00', fontWeight: '400' }],
      },
      spacing: {
        section: '80px',
      },
      // NEW — the one soft shadow, for cards that lift (contents wall tiles, stacked
      // screens, the resume stamp). foundation-900 (#1c1917) at 18%.
      boxShadow: {
        lift: '0 12px 24px -12px rgb(28 25 23 / 0.18)',
      },
    },
  },
  plugins: [],
}
