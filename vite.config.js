import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';
import zipPack from 'vite-plugin-zip-pack';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            preact(),
            zipPack({
                outDir: 'dist-zip',
                outFileName: `${env.npm_package_name}-${env.npm_package_version}.zip`,
            }),
        ],
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
                    assetFileNames: 'assets/style.css',
                },
            },
        },
    };
});
