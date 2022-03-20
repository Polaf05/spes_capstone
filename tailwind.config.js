module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Open Sans, sans-serif",
        poppins: "Poppins, sans-serif",
      },
      colors: {
        ocean: {
          100: "#DFF4FF",
          200: "#63C7FF",
          300: "#5DB4E5",
          400: "#4B94BD",
        },
        tallano_gold: {
          100: "#FCF9DD",
          200: "#FFF598",
          300: "#F9E852",
          400: "#CCB53B",
        },
        misc: {
          danger: "#F95252",
          warning: "#F98E52",
          okay: "#F9E852",
          good: "#65EF73",
          verygood: "#52BDF9",
        },
      },
      fontSize: {
        xs: ".512rem", //p-xs
        sm: ".64rem", //p-sm
        tiny: ".8rem", //p-reg
        base: "1rem", //p-lg
        lg: "1.25rem", //h6
        xl: "1.563rem", //h5
        "2xl": "1.953rem", //h4
        "3xl": "2.441rem", //h3
        "4xl": "3.052rem", //h2
        "5xl": "3.815rem", //h1
        "6xl": "4.209rem", //title
      },
    },
  },
  plugins: [],
};
