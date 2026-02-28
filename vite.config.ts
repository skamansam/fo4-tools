import path from "node:path";
import devtoolsJson from "vite-plugin-devtools-json";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			twintrinsic: path.resolve(dirname, "../twintrinsic/src/lib/index.ts"),
			"$lib": path.resolve(dirname, "../twintrinsic/src/lib"),
		},
	},
	server: {
		watch: {
			// Ignore everything by default, except specified paths
			ignored: [
				"!**", // Ignore all files
				"!**/src/**", // But don't ignore files in the 'src' directory
				"!**/vite.config.js", // Or the config file
				// Add your external directory here (adjust 'external-dir' and path depth as needed)
				// "!" + path.resolve(__dirname, "..", "twintrinsic") + "/**",
				"!**/../twintrinsic/**",
				"!../twintrinsic/**",
			],
		},
		fs: {
			allow: [path.resolve(dirname, "../twintrinsic")],
		},
	},
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
});
