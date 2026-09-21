import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const baumanagementProjectsPath = '/src/assets/baumanagement/projects/'
const baumanagementGalleryDataPath = '/src/data/baumanagementProjects.ts'

function reloadBaumanagementGalleryOnAssetChange(): Plugin {
  return {
    name: 'reload-baumanagement-gallery-on-asset-change',
    async handleHotUpdate({ file, server, timestamp }) {
      if (!file.replaceAll('\\', '/').includes(baumanagementProjectsPath)) return

      const galleryDataModule = await server.moduleGraph.getModuleByUrl(baumanagementGalleryDataPath)
      if (galleryDataModule) server.moduleGraph.invalidateModule(galleryDataModule, new Set(), timestamp, true)

      server.ws.send({ type: 'full-reload', path: '*' })
      return []
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), reloadBaumanagementGalleryOnAssetChange()],
})
