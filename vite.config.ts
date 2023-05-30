// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [dts({ outputDir: "./lib" })],
	build: {
		lib: {
			// 打包的入口文件
			entry: resolve(__dirname, "src/utils/graph.ts"),
			name: "graph",
			// 打包模式，默认是es和umd都打
			formats: ["es", "umd"],
			// fileName: (format) => `lazy-pictures.${format}.js`,
		},
		rollupOptions: {},
		outDir: "lib", // 打包后存放的目录文件
	},
});
