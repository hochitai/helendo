/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        screens: {
            sm: '480px',
            lm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            // '2xl': '1320px',
        },
        extend: {
            colors: {
                primary: 'var(--primary)',
            },
        },
    },
    plugins: [],
};
