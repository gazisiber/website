import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { writeFileSync, mkdirSync, readFileSync } from 'fs'

// Plugin to copy index.html to 404.html and v3/index.html for GitHub Pages SPA support
function githubPagesSPA() {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

      // Create 404.html (GitHub Pages serves this for unknown routes)
      writeFileSync(resolve(distDir, '404.html'), indexHtml)

      // Create v3/index.html so /v3 loads directly
      mkdirSync(resolve(distDir, 'v3'), { recursive: true })
      writeFileSync(resolve(distDir, 'v3', 'index.html'), indexHtml)
    }
  }
}

export default defineConfig({
  plugins: [react(), githubPagesSPA()],
})
