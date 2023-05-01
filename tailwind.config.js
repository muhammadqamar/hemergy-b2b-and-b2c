/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue100: "#D6DBFF",
      blue200: "#B0BBFF",
      blue300: "#92A0FF",
      blue400: "#6B7EFD",
      blue600: "#3D50D9",
      blue700: "#2B3FCC",
      blue800: "#192CB1",
      blue900: "#10219C",
      textcolor: "#4E62EE",
      white: "#ffffff",
      textblack: "#0B0D13",
      herotext: "rgba(255, 255, 255, 0.8)",
      cardbg: "#EFF1FF",
      garbg: "#F4F4FA",
      btncolor: "#F9705A",
      red600: "#EC5942",
      gray800: "#6B6D88",
      gray900: "#595C77",
      green400: "#6BDB9E",
      green500: "#3CCD87",
      white500: "#D6DBFF",
    },

    boxShadow: {
      mainshadow: "37px 49px 0px rgba(0, 17, 141, 0.1)",
      smallshadow: "11px 12px 0px rgba(0, 17, 141, 0.1)",
      lgshadow: "0px 44px 44px rgba(35, 37, 55, 0.2)",
      mdshadow: "23px 27px 0px rgba(0, 17, 141, 0.1)",
      smshadow: "0 10px 7px -3px rgb(0, 0, 0 ,0.1), 0 4px 6px 7px rgb(0, 0, 0 , 0.1)",
      xsmshadow: "5px 0px 0px rgba(0, 17, 141, 0.2)",
      xsshadow: "6px 9px 0px rgba(0, 17, 141, 0.1)",
    },

    fontFamily: {
      Inter: "Inter, sans-serif",
      Poppins: "Poppins, sans-serif",
    },
    screens: {
      sm: "499px",
      md: "768px",
      // => @media (min-width: 640px) { ... }

      lg: "992px",
      // => @media (min-width: 1024px) { ... }

      laptop: "1190px",

      xl: "1315px",

      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
