/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                markGrey: "#454545",
                lightGrey: "#c2c2c2",
            },
        },
    },
    plugins: [],
};
