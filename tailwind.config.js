export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#DC2626', // or whatever red you want
      },
      fontFamily: {
        'heading': ['YourFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}