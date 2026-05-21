/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette Skop — interface (light theme, blanc dominant)
        skop: {
          black: '#000000',
          white: '#FFFFFF',
          // Roses
          pink: '#FFCBE0',        // rose pastel (couleur d'accent principale)
          'pink-soft': '#FFE5EF', // rose encore plus doux pour surfaces secondaires
          'pink-vivid': '#FE277E',// rose vif du logo (à utiliser ponctuellement)
          // Teal (à utiliser TRÈS peu — préférence utilisateur)
          teal: '#CCFCFF',
          'teal-vivid': '#47EAD0',
          // Neutres
          'gray-50': '#FAFAFA',
          'gray-100': '#F4F4F5',
          'gray-200': '#E4E4E7',
          'gray-300': '#D4D4D8',
          'gray-400': '#A1A1AA',
          'gray-500': '#71717A',
          'gray-700': '#3F3F46',
          'gray-900': '#18181B',
        },
      },
      fontFamily: {
        // Inter pour le corps de texte (défaut)
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Questrial pour le logo / wordmark Skop
        logo: ['Questrial', 'sans-serif'],
        // Plus Jakarta Sans en remplacement d'Open Sauce (non dispo Google Fonts)
        title: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'skop-card': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(0 0 0 / 0.06)',
        'skop-hover': '0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 24px -6px rgb(0 0 0 / 0.10)',
      },
      borderRadius: {
        'skop': '1rem',
      },
      keyframes: {
        toastIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        commandPaletteIn: {
          '0%': { transform: 'translateY(-8px) scale(0.98)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'toast-in': 'toastIn 250ms ease-out',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 220ms ease-out',
        'command-palette-in': 'commandPaletteIn 150ms ease-out',
      },
    },
  },
  plugins: [],
};
