/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        vibrantCoral: "#F05D5E",
        stormyTeal: "#0F7173",
        platinum: "#E7ECEF",
        shadowGrey: "#272932",
        lightBronze: "#D8A47F",
      },
    },
  },
  plugins: [],
}

