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
                outFileName: `${env.npm_package_name || 'etis-extension'}-${env.npm_package_version || '3.0.0'}.zip`,
            }),
        ],
        resolve: {
            alias: {
                'react': 'preact/compat',
                'react-dom': 'preact/compat',
            },
        },
        build: {
            outDir: resolve(__dirname, 'dist'),
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    'content-script': resolve(__dirname, 'src/content-script.tsx'),
                    'theme-loader': resolve(__dirname, 'src/theme-loader.ts'),
                    'popup': resolve(__dirname, 'src/popup.ts'),
                    'offline-viewer': resolve(__dirname, 'src/offline-viewer.ts'),
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