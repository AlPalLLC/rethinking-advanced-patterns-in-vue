const vue = require('@vitejs/plugin-vue')
const { resolve } = require('path')

module.exports = {
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'publish.js'),
      name: 'MyLib'
    },
    rollupOptions: {
      external: [
        'vue',
        'debounce',
        /@baleada/,
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'RethinkingAdvancedPatternsInVue'
        }
      }
    }
  }
}
