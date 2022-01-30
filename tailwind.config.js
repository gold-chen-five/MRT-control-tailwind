module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh'
      }
    },
    screens: {
      '2xl': {'max': '1536px'},
      'xl': {'max': '1440px'},      
      'lg': {'max': '1024px'},     
      'md': {'max': '768px'},    
      'sm': {'max': '426px'}
    }
  },
  plugins: [],
}
