import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const distDirectory = 'dist'
const routes = ['baumanagement', 'facility-management', 'transport']

await Promise.all(
  routes.map(async (route) => {
    const routeDirectory = join(distDirectory, route)
    await mkdir(routeDirectory, { recursive: true })
    await copyFile(join(distDirectory, 'index.html'), join(routeDirectory, 'index.html'))
  }),
)
