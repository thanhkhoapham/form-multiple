/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      minHeight: {
        'min-h': '64rem',
      },
      maxHeight: {
        'max-h': '128rem',
      }
    }
  },
  plugins: [],
});
