module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
   
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {
      backgroundImage: {
        'bg-2': "url('../src/assets/images/bg-2.png')",
        'bg-reset-psw': "url('../src/assets/images/reset-psw.png')",
        'bg-4': "url('../src/assets/images/bg-4.png')",
        'bg-for-rent': "url('../src/assets/images/for-rent.png')",
      },
      spacing: {
        '9/16': '56.25%',
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
    // fontSize: {
    //   xs: '11px',
    //   sm: '12px',
    //   base: '14px',
    //   lg: '16px',
    //   xl: '18px',
    //   '2xl': '20px',
    // },
  },
  variants: {},
  plugins: [],
  important: true,
};
