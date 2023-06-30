/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      backgroundColor: {
        skin:{
          fill: "var(--fill-bg-color)",
          fill_sidebar: "var(--fill-sidebar-color)",
          fill_search: "var( --fill-search-color)",
          fill_user_card: "var(--fill-user-card-color)",
          fill_input: "var(--fill-input)"
          
        }
      },
      textColor:{
        skin:{
          base: "var(--fill-sidebar-icon-color)",
          text_color: "var(--text-user-card-color)"
        }
      },
      gradientColorStops: {
        skin: {
          fill_user_card_hover: "var(--hover-card-from)",
          fill_hover_via: "var(--hover-via)",
          fill_hover_to: "var(--hover-to)"
        }
      },
      borderColor: {
        skin: {
         
        }
      },
      colors: {
        skin: {
          card_border_color: "var( --border)"
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

