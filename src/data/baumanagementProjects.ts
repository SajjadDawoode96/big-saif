export type BaumanagementProjectComparison = {
  id: string
  beforeImage: string
  beforeFallbackImage: string
  afterImage: string
  afterFallbackImage: string
  title?: string
  description?: string
  altBefore: string
  altAfter: string
}

export type BaumanagementProjectGroup = {
  id: string
  projects: BaumanagementProjectComparison[]
}

const galleryImages = import.meta.glob('../assets/projects/baumanagement/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

type GalleryImageSources = { webp?: string; fallback?: string }

const projectsByNumber = new Map<number, Partial<Record<'before' | 'after', GalleryImageSources>>>()
const galleryFilePattern = /\/(\d+)-(before|after)\.(jpe?g|png|webp)$/i

for (const [path, imageUrl] of Object.entries(galleryImages)) {
  const match = path.match(galleryFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase() as 'before' | 'after'
  const extension = match[3].toLowerCase()
  const projectImages = projectsByNumber.get(projectNumber) ?? {}

  const imageSources = projectImages[imageType] ?? {}
  if (extension === 'webp') imageSources.webp = imageUrl
  else imageSources.fallback = imageUrl
  projectImages[imageType] = imageSources
  projectsByNumber.set(projectNumber, projectImages)
}

const completeProjects = [...projectsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')

    if (!images.before?.webp || !images.before.fallback || !images.after?.webp || !images.after.fallback) {
      if (import.meta.env.DEV) {
        console.warn(`Baumanagement gallery: project ${projectLabel} is missing a WebP or fallback image.`)
      }
      return []
    }

    const altTextByProject = {
      1: {
        before: 'Vorher: Innenraum mit teilweise gefliester Wand und offenen Anschlüssen',
        after: 'Nachher: Innenraum mit gefliester Wandfläche, Schutzfolie und offenen Anschlüssen',
      },
      2: {
        before: 'Vorher: Schmaler Innenraum mit grauem Fliesenboden',
        after: 'Nachher: Großformatige Bodenfliesen mit Abstandshaltern während der Verlegung',
      },
      3: {
        before: 'Vorher: Holztreppe mit Geländer und weißer Wand',
        after: 'Nachher: Treppenbereich mit bearbeiteter Wandfläche',
      },
      4: {
        before: 'Vorher: Treppenabsatz mit Türen und weißer Wandfläche',
        after: 'Nachher: Treppenabsatz mit bearbeiteten Wand- und Deckenflächen',
      },
      5: {
        before: 'Vorher: Heller Innenraum mit Bodenfliesen und teilweise gefliester Wand',
        after: 'Nachher: Innenraum während Arbeiten mit offener Decke und Leiter',
      },
      6: {
        before: 'Vorher: Raum mit Bodenfliesen, Wandfliesen und offenen Anschlüssen',
        after: 'Nachher: Arbeiten an einer gefliesten Wandfläche in einem Innenraum',
      },
      7: {
        before: 'Vorher: Weiße Wandfliesen mit offenen Steckdosenanschlüssen',
        after: 'Nachher: Innenraum mit teilweise abgedeckten Wandfliesen',
      },
      8: {
        before: 'Vorher: Innenraum mit Fenster, Tür, Heizkörper und Bodenfliesen',
        after: 'Nachher: Innenraum mit Deckenplatten und bearbeiteten Wänden',
      },
      9: {
        before: 'Vorher: Wandbereich mit weißen Fliesen und offenen Leitungen',
        after: 'Nachher: Nahaufnahme einer weißen gefliesten Wandfläche',
      },
      10: {
        before: 'Vorher: Decke mit verspachtelten Plattenstößen und offenem Kabel',
        after: 'Nachher: Decke mit großflächigen Platten und sichtbaren Fugen',
      },
    } as const
    const altText = altTextByProject[projectNumber as keyof typeof altTextByProject]

    return [{
      id: `project-${projectLabel}`,
      beforeImage: images.before.webp,
      beforeFallbackImage: images.before.fallback,
      afterImage: images.after.webp,
      afterFallbackImage: images.after.fallback,
      altBefore: altText.before,
      altAfter: altText.after,
    }]
  })

export const baumanagementProjectGroups: BaumanagementProjectGroup[] = completeProjects.reduce<BaumanagementProjectGroup[]>((groups, project, index) => {
  const groupIndex = Math.floor(index / 5)
  const group = groups[groupIndex] ?? { id: `project-group-${groupIndex + 1}`, projects: [] }

  group.projects.push(project)
  groups[groupIndex] = group

  return groups
}, [])
