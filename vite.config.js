import { defineConfig } from "vite";

export default defineConfig({
    // Les chemins relatifs fonctionnent aussi dans un dépôt GitHub Pages.
    base: "./",
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
