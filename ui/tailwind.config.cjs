/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
      'sans': ['Atkinson Hyperlegible']
    },
	},
	plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        "sfr-light": {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#1B1B25",
          "base-100": "#C2C2D8",
          "base-200": "#9B9BC7",
          "accent": "#6C63FF"
        }
      }
    ]
  }
}
