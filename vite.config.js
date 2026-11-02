import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    // Les chemins relatifs fonctionnent aussi dans un dépôt GitHub Pages.
    base: "./",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(process.cwd(), "index.html"),
                projets: resolve(process.cwd(), "projets.html"),
            },
        },
    },
});
