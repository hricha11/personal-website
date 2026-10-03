import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/* The site's public address. index.html (canonical link, social previews)
   spells it out too, so change both if the site moves.
   robots.txt and sitemap.xml are written from it at build time. Pages are hash routes (/#/…), so
   the sitemap lists the one real URL. */
const SITE = 'https://personal-website-sepia-five-34.vercel.app'

function crawlerFiles(site: string): Plugin {
  return {
    name: 'crawler-files',
    apply: 'build',
    generateBundle() {
      const day = new Date().toISOString().slice(0, 10)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${day}</lastmod></url>\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), crawlerFiles(SITE)],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
