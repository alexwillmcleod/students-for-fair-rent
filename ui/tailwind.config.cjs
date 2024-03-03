/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      display: ['Omnes', 'Omnes-Bold'],
      sans: ['Atkinson Hyperlegible'],
      strike: ['Bowlby One SC'],
      // strike: ['Fortnite'],
    },
    extend: {
      colors: {
        'ororke-blue': '#0090C4',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [require('daisyui')],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(ororke|grafton|waiparuru|towers|blue|green|red|slate)-(blue|green|red|orange|100|200|300|400|500|600|700|800)/,
    },
  ],
  daisyui: {
    themes: [
      {
        'sfr-light': {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#1B1B25',
          'base-200': '#39A8C1',
          'base-100': '#BFE5EE',
          accent: '#96CDA9',
          'ororke-blue': '#0090C4',
        },
      },
    ],
  },
};
