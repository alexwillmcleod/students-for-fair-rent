/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      display: ['Omnes', 'Omnes-Bold'],
      sans: ['Omnes'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'sfr-light': {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#1B1B25',
          'base-200': '#39A8C1',
          'base-100': '#BFE5EE',
          accent: '#96CDA9',
        },
      },
    ],
  },
};
