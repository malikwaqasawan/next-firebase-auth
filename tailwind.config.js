/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Adjust this if needed
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sarabun)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
      colors: {
        primary: '#027368',
        secondary: '#F1E634',
        'highlight-base': '#E3EDF4',
        'highlight-teal': '#0DCCB0',
        'highlight-pink': '#F2C2E5',
        'highlight-dark': '#DFDFDF',
        'highlight': '#464749',
        'base': '#5D5E5E',
        'dark': '#373A39',
        'black': '#142316',
        'color-light': '#F2EDE4',
        'label': '#517357',
        'disable': '#818E8D',
        'gray-300': '#B9BFC7',
        'danger': '#FF4D4F'
      },
      fontSize: {
        h1: '48px',
        h2: '36px',
        h3: '24px',
        h4: '20px',
        base: '16px',
        h6: '14px',
        sm: '12px',
        'lg-h1': '32px',
        'lg-h2': '24px',
        'lg-h3': '18px',
        'lg-h4': '14px',
        'lg-base': '14px',
        'lg-h6': '10px',
        'lg-sm': '8px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': { maxWidth: '540px' },
          '@screen md': { maxWidth: '720px' },
          '@screen lg': { maxWidth: '960px' },
          '@screen xl': { maxWidth: '1140px' },
          '@screen 2xl': { maxWidth: '1320px' },
        },
      });
    },
  ],
}
