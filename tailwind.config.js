/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "hsl(259, 100%, 65%)",
        "primary-2": "hsl(0, 100%, 67%)",
        "neutral-1": "hsl(0, 0%, 94%)",
        "neutral-2": "hsl(0, 0%, 86%)",
        "neutral-3": "hsl(0, 1%, 44%)",
        "neutral-4": "hsl(0, 0%, 8%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
