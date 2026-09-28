import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true,
    },
    resolve: {
        alias: {
            '@api': path.resolve(import.meta.dirname, './src/api'),
            '@components': path.resolve(import.meta.dirname, './src/components'),
            '@constants': path.resolve(import.meta.dirname, './src/constants'),
            '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
            '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
            '@modules': path.resolve(import.meta.dirname, './src/modules'),
            '@router': path.resolve(import.meta.dirname, './src/router'),
            '@store': path.resolve(import.meta.dirname, './src/store'),
            '@types': path.resolve(import.meta.dirname, './src/types'),
            '@utils': path.resolve(import.meta.dirname, './src/utils'),
        },
    },
})
