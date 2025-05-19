/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				"primary-accent": "var(--color-primary-accent)",
				secondary: "var(--color-secondary)",
				"secondary-accent": "var(--color-secondary-accent)"
			}
		}
	},
	plugins: []
};
