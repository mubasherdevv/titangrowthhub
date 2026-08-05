import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          900: '#7C2D12',
        },
        dark: {
          900: '#09090B',
          800: '#18181B',
          700: '#27272A',
          600: '#3F3F46',
        },
        sidebar: {
          bg: '#FFFFFF',
          active: '#FFF7ED',
          text: '#475569',
          activeText: '#EA580C',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(15, 23, 42, 0.04), 0 1px 3px -1px rgba(15, 23, 42, 0.02)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
