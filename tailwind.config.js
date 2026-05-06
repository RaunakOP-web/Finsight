/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#051424',
          dim: '#051424',
          bright: '#2c3a4c',
          container: {
            lowest: '#010f1f',
            low: '#0d1c2d',
            DEFAULT: '#122131',
            high: '#1c2b3c',
            highest: '#273647',
          },
          variant: '#273647',
          tint: '#b4c5ff',
        },
        primary: {
          DEFAULT: '#2563eb', // Electric Blue accent
          container: '#2563eb',
          fixed: '#dbe1ff',
          'fixed-dim': '#b4c5ff',
        },
        secondary: {
          DEFAULT: '#4edea3', // Emerald Green
          container: '#00a572',
          fixed: '#6ffbbe',
          'fixed-dim': '#4edea3',
        },
        tertiary: {
          DEFAULT: '#ffb95f', // Soft Gold
          container: '#996100',
          fixed: '#ffddb8',
          'fixed-dim': '#ffb95f',
        },
        background: '#051424', // Deep Navy base
        'on-background': '#d4e4fa',
        outline: {
          DEFAULT: '#8d90a0',
          variant: '#434655',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'pill': '24px',
        'input': '8px',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(37, 99, 235, 0.5)',
        'glow-secondary': '0 0 15px rgba(78, 222, 163, 0.5)',
      }
    },
  },
  plugins: [],
}
