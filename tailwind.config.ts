import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'fo4-dark': '#0a0e27',
				'fo4-green': '#00ff41',
				'fo4-green-dark': '#00cc33',
				'fo4-green-light': '#33ff66',
				'fo4-black': '#000000',
				'fo4-text': '#00ff41'
			},
			fontFamily: {
				'mono': ['Courier New', 'monospace']
			},
			textShadow: {
				'glow': '0 0 10px rgba(0, 255, 65, 0.5)',
				'glow-strong': '0 0 20px rgba(0, 255, 65, 0.8)'
			},
			boxShadow: {
				'glow': '0 0 20px rgba(0, 255, 65, 0.3)',
				'glow-strong': '0 0 30px rgba(0, 255, 65, 0.5)'
			}
		}
	},
	plugins: []
} satisfies Config;
