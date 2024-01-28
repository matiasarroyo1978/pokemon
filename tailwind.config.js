/**
 * @format
 * @type {import('tailwindcss').Config}
 */

// module.exports = {
//   mode: "jit",
//   darkMode: 'class', // or 'media' or 'class'
//   purge: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",

//     // Or if using `src` directory:
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  mode: "jit",
  darkMode: 'class', // or 'media' or 'class'
  purge: {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
