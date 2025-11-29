/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19",
        fg: "#e6edf3",
        muted: "#9aa4af",
        accent: "#7c3aed"
      }
    },
  },
  plugins: [],
};
