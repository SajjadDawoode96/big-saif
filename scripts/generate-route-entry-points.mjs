import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distDirectory = 'dist'
const routes = {
  baumanagement: {
    title: 'Baumanagement & Renovierung | BIG SAIF',
    description: 'BIG SAIF bietet Leistungen für Bau, Umbau und Renovierung von Gebäuden und Wohnobjekten in Deutschland.',
    canonical: 'https://www.bigsaif.de/baumanagement/',
  },
  'facility-management': {
    title: 'Facility Management & Gebäudepflege | BIG SAIF',
    description: 'BIG SAIF bietet Facility Management, Gebäudereinigung und Pflege für Büros, Gewerbe, Gastronomie, Außenbereiche und private Objekte.',
    canonical: 'https://www.bigsaif.de/facility-management/',
  },
  transport: {
    title: 'Transport & Lieferung in Deutschland | BIG SAIF',
    description: 'BIG SAIF bietet Transport- und Lieferleistungen zwischen Städten in Deutschland – zuverlässig, sicher und termingerecht.',
    canonical: 'https://www.bigsaif.de/transport/',
  },
}

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

function replaceHeadTag(head, pattern, replacement, label) {
  const matches = [...head.matchAll(pattern)]

  if (matches.length !== 1) {
    throw new Error(`Expected one ${label} tag in the built HTML head, found ${matches.length}.`)
  }

  return head.replace(pattern, replacement)
}

function withRouteMetadata(html, metadata) {
  const headStart = html.indexOf('<head>')
  const headEnd = html.indexOf('</head>', headStart)

  if (headStart === -1 || headEnd === -1) {
    throw new Error('Built HTML is missing a head element.')
  }

  const head = html.slice(headStart, headEnd + '</head>'.length)
  const title = `<title>${escapeHtml(metadata.title)}</title>`
  const description = `<meta name="description" content="${escapeHtml(metadata.description)}" />`
  const canonical = `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`
  const updatedHead = replaceHeadTag(
    replaceHeadTag(
      replaceHeadTag(head, /<title>[\s\S]*?<\/title>/g, title, 'title'),
      /<meta\s+name=["']description["'][^>]*>/gi,
      description,
      'description',
    ),
    /<link\s+rel=["']canonical["'][^>]*>/gi,
    canonical,
    'canonical',
  )

  return `${html.slice(0, headStart)}${updatedHead}${html.slice(headEnd + '</head>'.length)}`
}

const indexHtml = await readFile(join(distDirectory, 'index.html'), 'utf8')

await Promise.all(
  Object.entries(routes).map(async ([route, metadata]) => {
    const routeDirectory = join(distDirectory, route)
    await mkdir(routeDirectory, { recursive: true })
    await writeFile(join(routeDirectory, 'index.html'), withRouteMetadata(indexHtml, metadata), 'utf8')
  }),
)
