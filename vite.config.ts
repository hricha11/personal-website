import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/* robots.txt and sitemap.xml, written at build time from VITE_SITE_URL (.env)
   so the site's address lives in one place. Pages are hash routes (/#/…), so
   the sitemap lists the one real URL. */
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
export default defineConfig(({ mode }) => {
  const site = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  if (!site) throw new Error('Set VITE_SITE_URL in .env (the site’s public address).')
  return {
    plugins: [react(), tailwindcss(), crawlerFiles(site)],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  }
})
