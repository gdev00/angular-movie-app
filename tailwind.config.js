/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily : {
        nunitosanserif: ['Nunito', 'sans-serif'],
        dosissansserif: ['Dosis', 'sans-serif'],
      },
      backgroundColor: {
        base: '#141414'
      },
      colors: {
        cs_anchor: '#dc4666',
        cs_gray: '#abb7c4',
      }
    },
  },
  plugins: [],
}

