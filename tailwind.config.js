/* eslint-disable quotes */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./src/assets/fundo-star-wars.svg')",
        circles: "url('./src/assets/grafismo-topo.svg')",
        logo: "url('./src/assets/logo-star-wars.svg')",
      },
    },
  },
  plugins: [],
};
