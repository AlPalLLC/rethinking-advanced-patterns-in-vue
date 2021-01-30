const vue = require('@vitejs/plugin-vue')

module.exports = {
  optimizeDeps: {
    include: ['@baleada/vue-features/affordances']
  },
  plugins: [
    vue()
  ]
}
