/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'switzer-medium': ['Switzer-Medium', 'mono'],
        'switzer-regular': ['Switzer-Regular', 'mono'],
        'switzer-bold': ['Switzer-bold', 'mono'],
        'switzer-black': ['Switzer-black', 'mono'],
        'switzer-light': ['Switzer-light', 'mono'],
        'comico-regular': ['Comico-Regular', 'mono']
      },
      textShadow: {
        default: '0 2px 5px rgba(0, 0, 0, 0.5)',
        lg: '0 2px 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
