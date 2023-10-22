/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      display: ['Omnes', 'Omnes-Bold'],
      sans: ['Omnes'],
    },
    extend: {
      colors: {
        'ororke-blue': '#0090C4'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  }, 
  plugins: [require('daisyui')],
  safelist: [
    {
      "pattern": /(bg|text|border)-(ororke|grafton|waiparuru|towers|blue|green|red)-(blue|green|red|orange|100|200|300|400|500|600|700)/
    }
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
