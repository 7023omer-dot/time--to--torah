import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#A07830',
        },
        parchment: '#FDF6E3',
        ink: '#1A1208',
        stone: '#8B7355',
      },
      fontFamily: {
        heading: ['var(--font-frank-ruhl)', 'serif'],
        body: ['var(--font-heebo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
