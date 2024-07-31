/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkblue: '#030306',
        lightblue: '#3f7bd4',
        grayblue: '#3A485E',
        grayblueT: 'rgba(58, 72, 94, 0.5)',
        secondaryText: '#8491A2'
      },
      fontFamily: {
        thin: 'Onest-Thin',
        extralight: 'Onest-ExtraLight',
        light: 'Onest-Light',
        regular: 'Onest-Regular',
        medium: 'Onest-Medium',
        semibold: 'Onest-SemiBold',
        bold: 'Onest-Bold',
        extrabold: 'Onest-ExtraBold',
        black: 'Onest-Black'
      },

      lineHeight: {
        18: '1.125rem'
      },
      boxShadow: {
        based: '0px 4px 6px #151D29'
      }
    }
  },
  plugins: []
}
