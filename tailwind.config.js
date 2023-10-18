import tailWindScrollBar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{svelte,html,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [tailWindScrollBar],
}

