const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    // TODO: add branding colors as default
    // colors: {
    //   blue: '#1e11ff',
    //   pink: '#ff227a',
    // },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
  plugins: [],
};
