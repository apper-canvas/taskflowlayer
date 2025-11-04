/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#10b981",
        surface: "#ffffff",
        background: "#f8fafc",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6"
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'checkbox-check': 'checkbox-check 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'task-complete': 'task-complete 0.2s ease-out forwards',
        'bounce-scale': 'bounce-scale 0.2s ease-out',
      },
      keyframes: {
        'checkbox-check': {
          '0%': { transform: 'scale(0) rotate(45deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        'task-complete': {
          '0%': { opacity: '1', textDecoration: 'none' },
          '100%': { opacity: '0.6', textDecoration: 'line-through' }
        },
        'bounce-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}