const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      spacing: {
        'em-1': '1em',
      },
      colors: {
        primary: {
          '50': 'hsla(207, 77%, 97%, 1.0)',
          '100': 'hsla(207, 73%, 94%, 1.0)',
          '200': 'hsla(204, 73%, 87%, 1.0)',
          '300': 'hsla(203, 74%, 75%, 1.0)',
          '400': 'hsla(202, 72%, 62%, 1.0)',
          '500': 'hsla(204, 69%, 51%, 1.0)',
          '600': 'hsla(206, 73%, 43%, 1.0)',
          '700': 'hsla(207, 70%, 36%, 1.0)',
          '800': 'hsla(208, 66%, 31%, 1.0)',
          '900': 'hsla(208, 59%, 27%, 1.0)',
          '1000': 'hsla(210, 57%, 21%, 1.0)',
          '1100': 'hsla(211, 59%, 15%, 1.0)',
          '1200': 'hsla(212, 60%, 8%, 1.0)'
        },
        'blue-gray': colors.blueGray,
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
