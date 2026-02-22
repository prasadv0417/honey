/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fde9ab',
          300: '#fpd97a',
          400: '#f9c546',
          500: '#f4b400', // Primary Golden Yellow
          600: '#d99200',
          700: '#b46e00',
          800: '#925605',
          900: '#7a470b',
          950: '#462502',
        },
        brown: {
          50: '#f6f5f4',
          100: '#ebe8e5',
          200: '#d7d0cb',
          300: '#bbb0a7',
          400: '#9b8b7f',
          500: '#827164',
          600: '#69594f',
          700: '#554840', // Primary Dark Brown
          800: '#473d37',
          900: '#3e3530',
          950: '#211c19',
        }
      },
      backgroundImage: {
        'honeycomb': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18l-2.16-1.25-2.17 1.25v2.5l2.17 1.25L20 20.5zm0-20.5l10 5.77v11.55l-10 5.77-10-5.77V5.77L20 0zm0 18v2.5l10-5.77v-11.55l-10-5.77v2.5l7.84 4.52v9.06L20 18zm-10-5.77L2.16 7.71v9.06L10 21.29v-2.5l-5.68-3.27V9.06L10 12.23z' fill='%23f4b400' fill-opacity='0.05' fill-rule='evenodd'/%3E\")",
      }
    },
  },
  plugins: [],
}
