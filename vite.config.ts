import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 80,
        strictPort: true,
        hmr: {
            clientPort: 80,
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            fileName: "bundle",
        },
    },
});
