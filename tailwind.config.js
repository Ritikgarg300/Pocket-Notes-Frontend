/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(35,34,57,1) 0%, rgba(37,33,69,1) 53%, rgba(38,32,79,1) 100%)',
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        
        'scrollbar-width': 'none',
        
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    });
  },],
};
