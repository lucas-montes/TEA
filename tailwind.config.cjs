/** @type {import('tailwindcss').Config} */



module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx, html}",
    ],
    darkMode: 'class', // class, 'media' or boolean
    variants: {
        extend: {
            border: ['focus'],
        }
    },
    theme: {
        container: {
            center: true,
        },
        extend: {
        },
    },
    plugins: [],
};
