/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'SF Pro Display', '-apple-system', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        // Warm Earth — Foundation
        tan: {
          dark: '#A08050',
          DEFAULT: '#C8AD7E',
          light: '#DCC9A0',
        },
        sand: {
          DEFAULT: '#EDE2CC',
          light: '#F5EFE0',
          pale: '#FAF7F0',
        },
        cream: '#FDFCF8',

        // Living Green — Intelligence & Life
        emerald: {
          deep: '#0F4D35',
          DEFAULT: '#1A6B4A',
        },
        palm: '#2D8B55',
        canopy: '#40A865',
        leaf: {
          DEFAULT: '#7DD49A',
          pale: '#D4F0DC',
        },
        lagoon: '#0D6F60',
        water: {
          DEFAULT: '#298475',
          light: '#6BBFB0',
        },

        // Sky & Blue — Clarity & Refinement
        sky: {
          DEFAULT: '#5BA0D4',
          light: '#93C5E8',
          pale: '#D0E7F5',
        },
        silver: {
          DEFAULT: '#A8B0B8',
          light: '#C8CDD2',
        },

        // Text Colors — Warm-tinted
        brand: {
          text: '#2A1F38',
          'text-sec': '#4D4060',
          'text-muted': '#8A7DA0',
          'text-light': '#B8AED0',
        },

        // Night / Dark Mode
        night: {
          deep: '#0C0A18',
          surface: '#16122A',
          text: '#E4DFF0',
          muted: '#7A6E98',
        },

        // Legacy aliases for accent (green)
        accent: {
          DEFAULT: '#1A6B4A',
          hover: '#0F4D35',
        },
      },
      backdropBlur: {
        xs: '2px',
        glass: '24px',
      },
      borderRadius: {
        glass: '16px',
      },
      keyframes: {
        glow: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
