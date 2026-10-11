/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E8F5EC',
          100: '#D0EAD8',
          200: '#A8D5B4',
          300: '#7AC090',
          400: '#4CAB6C',
          500: '#008653',
          600: '#007848',
          700: '#006B43',
          800: '#005838',
          900: '#004530',
        },
      },
    },
  },
  plugins: [],
};
