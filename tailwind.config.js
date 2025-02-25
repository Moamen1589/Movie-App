/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom': '650px'
      },
      maxWidths: {
       custom:'640px'
      }
    },
  },
  plugins: [],
};
