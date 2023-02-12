/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        container : '500px',
        navContainer : '1440px',
        mainContainer : '1180px',
      },
      colors: {
        'primary-btn': '#086FA4',
      },
    },
  },
  plugins: [],
}
