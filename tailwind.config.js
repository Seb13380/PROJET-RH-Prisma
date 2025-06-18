/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,twig}"],
    theme: {
        extend: {
            colors: {
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    // ...autres teintes
                    900: '#1c1917',
                }
            }
        },
    },
    plugins: [],
}