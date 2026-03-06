/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
    "./*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
    "./pages/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
