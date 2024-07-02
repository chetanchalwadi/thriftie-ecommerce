/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height:{
        140:"40rem",
        150:"50rem",
        136:"34rem"
      },
      screens:{
        'smx': { 'raw': '(max-width: 765px)' },
        'ssmx': { 'raw': '(max-width: 630px)' },
        'lmx':{'raw':'(max-width: 1025px)'}
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
