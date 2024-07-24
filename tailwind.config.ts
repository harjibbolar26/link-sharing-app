import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "var(--dark-grey)",
        primary: "var(--purple)",
        secondary: "var(--light-purple)",
        grey: "var(--grey)",
        error: "var(--error)",
        white: "var(--white)",
        hover: "var(--purple-hover)",
        border: "var(--borders)",
        lightGrey: "var(--light-grey)"
      },
      boxShadow: {
        'custom-focus': '0px 0px 32px 0px #633CFF40',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['focus-within'],
    },
  },
  plugins: [],
};
export default config;
