/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./node_modules/expo-linear-gradient/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "kiku-dark-green" : {
          DEFAULT: "#154403",
          dark: "#fff",
        },
        "kiku-light-green" : {
          DEFAULT: "#80cc28"
        },
        "kiku-muted-green" : {
          DEFAULT: "#26973c"
        },
        background: '#fff',
        text: 'black',
        muted: '#57636c',
      }
    },
  },
  plugins: [],
}

