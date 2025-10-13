import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact()],
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                'content-script': resolve(__dirname, 'src/content-script.tsx'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/style.[ext]',
            },
        },
    },
});
