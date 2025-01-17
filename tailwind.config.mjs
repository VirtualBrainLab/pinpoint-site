/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import { dark } from "daisyui/src/theming/themes";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyui],

	daisyui: {
		themes: [
			{
				dark: {
					...dark,
					primary: "#0FBBBB",
					"base-100": "#000000",
					"base-content": "#ffffff",
				},
			},
		],
	},
};
