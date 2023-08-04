/** @type {import('tailwindcss').Config} */
module.exports = {
  
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],

  theme: {
   
    screens: {
      'tablet': '880px',
      'laptop': '1251px',
      'desktop': '1550px',
    
    },
    colors:{
      'orange':'#FF9B5C',
      'white':"#FFFFFF",
      'red':'#FF0000',
      'yellow':"#FFDE59",
      'black':'#171810',
      'darkblue':'#004AAD',
      "primary":'#286181',
      'secondary':'#657179',
      'lightnavyblue':'#4C5270',
      'lightblue':"#F4F6FC",
      'lightgreen':'#02703B',
      'creamblue':'#6A7D93',
      'gray':'#F5F5F5'
    },
    fontFamily:{
      'main':'IBM Plex Sans Condensed, sans-serif',
      'roboto':'Roboto, sans-serif'
    },
    extend: {
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
      // skew:{
      //   '180':'180deg'
      // },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}

