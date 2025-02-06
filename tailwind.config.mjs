/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import { dark } from "daisyui/src/theming/themes";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			maxHeight: {
				"1/2dvh": "50dvh",
			},
			height: {
				"1/2dvh": "50dvh",
				"1/3dvh": "33dvh",
				"1/4dvh": "25dvh",
				"3/2dvh": "150dvh",
				"2dvh": "200dvh",
			},
		},
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
