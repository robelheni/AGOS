import type { Config } from 'tailwindcss'

// In Tailwind v4, theme tokens are defined in globals.css via @theme.
// This config only needs content paths.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
}

export default config
