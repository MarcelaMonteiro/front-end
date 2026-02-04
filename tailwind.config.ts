import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				logo: ["var(--font-dancing)"],
				title: ["var(--font-playfair)"],
				body: ["var(--font-inter)"],
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, transform: "translateY(12px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.9s ease-out both",
			},
		},
	},
	plugins: [],
};

export default config;
