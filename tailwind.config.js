/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f59347',
          500: '#f2751f',
          600: '#e35d14',
          700: '#bc4513',
          800: '#963817',
          900: '#7a3018',
          950: '#42160a',
        },
        secondary: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7a8c7a',
          500: '#5f715f',
          600: '#4a5a4a',
          700: '#3d483d',
          800: '#333b33',
          900: '#2c322c',
          950: '#161a16',
        },
        clay: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f59347',
          500: '#f2751f',
          600: '#e35d14',
          700: '#bc4513',
          800: '#963817',
          900: '#7a3018',
          950: '#42160a',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7a8c7a',
          500: '#5f715f',
          600: '#4a5a4a',
          700: '#3d483d',
          800: '#333b33',
          900: '#2c322c',
          950: '#161a16',
        },
        earth: {
          50: '#faf6f1',
          100: '#f2e8d9',
          200: '#e4d0b3',
          300: '#d1b285',
          400: '#bb8f5a',
          500: '#a67c45',
          600: '#8f6639',
          700: '#745131',
          800: '#5f4330',
          900: '#4f392a',
          950: '#2a1e15',
        },
      },
      fontFamily: {
        sans: ["'Inter Variable'", ...defaultTheme.fontFamily.sans],
        serif: ["'Playfair Display'", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        'clay-gradient': 'linear-gradient(135deg, #f2751f 0%, #bc4513 100%)',
        'sage-gradient': 'linear-gradient(135deg, #5f715f 0%, #3d483d 100%)',
        'earth-gradient': 'linear-gradient(135deg, #a67c45 0%, #745131 100%)',
        'pottery-texture': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f2751f\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
  darkMode: "class",
};
