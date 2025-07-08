import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: ['black']
	},

	// @ts-expect-error "import" doesn't work here
	// The appropriate fix would be a Vite specific tailwind config.
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [typography, require('daisyui')]
} satisfies Config;
