// @ts-ignore
import { defineConfig, mergeConfig } from 'vite';
// @ts-ignore
import baseConfig from './vite.config.ts';

export default mergeConfig(
    baseConfig,
    defineConfig({
        base: './',
        build: {
            outDir: 'dist-electron',
            sourcemap: true,
        },
    })
);