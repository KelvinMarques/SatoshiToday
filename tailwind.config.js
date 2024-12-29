/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita o modo escuro baseado em classes
  content: [
    './SatoshiToday/SatoshiTodayApp/templates/SatoshiTodayApp/base.html',
    './SatoshiToday/SatoshiTodayApp/templates/SatoshiTodayApp/static/**/*.js',
  ],
  theme: {
    extend: {
      mytheme: {          
        "primary": "#facc15",        
        "secondary": "#f3f4f6",        
        "accent": "#4b5563",         
        "neutral": "#0f010e",          
        "base-100": "#2e2e2e",         
        "info": "#f3f4f6",          
        "success": "#facc15",          
        "warning": "#ef4444",        
        "error": "#b91c1c",
        }
    },
  },
  plugins: [],
}
