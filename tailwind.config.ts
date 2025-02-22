import type { Config } from "tailwindcss";
import daisyui from "daisyui"; // ✅ Use import instead of require

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        foreground: "var(--foreground)",
        inputBg: "#f9f9f9",
        gray: "#a4a4a4",
        darkGray: "#405B61",
      },
      backgroundImage: {
        darkerPrimary: "radial-gradient(50% 50% at 50% 50%, #00262f, #00262f)",
      },
    },
  },
  plugins: [daisyui], // ✅ Use the imported plugin directly
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root",
  },
};

export default config;
