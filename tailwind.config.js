/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pink": "#e84393",
        "red": "#c0392b",
        "orange": "#f39c12",
        "black": "#333",
        "white": "#fff",
        "light-color": "#666",
        "light-white": "#ccc",
        "light-bg": "#f5f5f5",
      },
      boxShadow: {
        "custom": "0 .5rem 1rem rgba(0,0,0,.1)"
      }
    },
  },
  plugins: [],
};
