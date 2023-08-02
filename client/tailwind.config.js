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
      colors: {
        "dark-pink": "#610023",
        "medium-pink": "#880031",
        "light-purple": "#CDB4DB",
        "light-pink": "#FFC8DD",
        "light-blue": "BDE0FE",
        "dark-blue": "A2D2FF"
      },
      backgroundColor: {
        'custom-gray': '#dfdfdf',
      },
      backgroundImage: {
        'custom-svg': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ea005d' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
