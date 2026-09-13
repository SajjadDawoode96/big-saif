import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distDirectory = 'dist'
const routes = {
  baumanagement: {
    title: 'Baumanagement & Renovierung | BIG SAIF',
    description: 'BIG SAIF bietet Leistungen für Bau, Umbau und Renovierung von Gebäuden und Wohnobjekten in Deutschland.',
    canonical: 'https://www.bigsaif.de/baumanagement/',
    image: 'https://www.bigsaif.de/baumanagement-hero-bg.png',
    imageWidth: '1675',
    imageHeight: '939',
    imageAlt: 'Illustration eines modernen Gebäudes für BIG SAIF Baumanagement',
  },
  'facility-management': {
    title: 'Facility Management & Gebäudepflege | BIG SAIF',
    description: 'BIG SAIF bietet Facility Management, Gebäudereinigung und Pflege für Büros, Gewerbe, Gastronomie, Außenbereiche und private Objekte.',
    canonical: 'https://www.bigsaif.de/facility-management/',
    image: 'https://www.bigsaif.de/facility-management-hero-bg.png',
    imageWidth: '1678',
    imageHeight: '937',
    imageAlt: 'Mitarbeiter bei der Reinigung einer Glasfassade',
  },
  transport: {
    title: 'Transport & Lieferung in Deutschland | BIG SAIF',
    description: 'BIG SAIF bietet Transport- und Lieferleistungen zwischen Städten in Deutschland – zuverlässig, sicher und termingerecht.',
    canonical: 'https://www.bigsaif.de/transport/',
    image: 'https://www.bigsaif.de/transport-hero-bg.png',
    imageWidth: '1672',
    imageHeight: '941',
    imageAlt: 'Karte einer Transportstrecke durch Deutschland',
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
  const socialMetadata = [
    ['og:title', metadata.title],
    ['og:description', metadata.description],
    ['og:url', metadata.canonical],
    ['og:type', 'website'],
    ['og:image', metadata.image],
    ['og:image:width', metadata.imageWidth],
    ['og:image:height', metadata.imageHeight],
    ['og:image:alt', metadata.imageAlt],
    ['og:site_name', 'BIG SAIF'],
    ['og:locale', 'de_DE'],
  ]
  const twitterMetadata = [
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', metadata.title],
    ['twitter:description', metadata.description],
    ['twitter:image', metadata.image],
    ['twitter:image:alt', metadata.imageAlt],
  ]
  const coreMetadata = replaceHeadTag(
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
  const updatedHead = twitterMetadata.reduce(
    (currentHead, [name, value]) => replaceHeadTag(
      currentHead,
      new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'gi'),
      `<meta name="${name}" content="${escapeHtml(value)}" />`,
      name,
    ),
    socialMetadata.reduce(
      (currentHead, [property, value]) => replaceHeadTag(
        currentHead,
        new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'gi'),
        `<meta property="${property}" content="${escapeHtml(value)}" />`,
        property,
      ),
      coreMetadata,
    ),
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
