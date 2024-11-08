const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'max': '290px'},
      'md': '769px',
      'lg': '1024px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    flowbite,
  ],
}


