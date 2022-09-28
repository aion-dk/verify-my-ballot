const config = require('./src/config/config.json')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'current-pattern': "url('./src/assets/current.svg')",
      },
      fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        base: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
        '5xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1536px',
        'sm-h': {
          raw: '(min-height: 650px)',
        },
      },
      fontFamily: {
        calibri: ['Calibri', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          ...config.colors,
        },
      },
    },
  },
  plugins: [],
}
