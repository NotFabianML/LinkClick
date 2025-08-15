module.exports = {
  darkMode: "class",
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx', // <-- Muy importante para tus componentes de React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}