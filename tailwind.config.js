module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'current-pattern': "url('./src/assets/current.svg')"
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
          gray: '#f5f5f5',
          dark: '#1d1934',
          blue: '#1226aa',
          background: '#F8F8F8',
          orange: '#EBAC76'
        },
      },
    },
  },
  plugins: [],
}
