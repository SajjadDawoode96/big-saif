export type FacilityProjectComparison = {
  id: string
  beforeImage: string
  beforeFallbackImage: string
  afterImage: string
  afterFallbackImage: string
  altBefore: string
  altAfter: string
}

export type FacilityProjectGroup = FacilityProjectComparison[]

const galleryImages = import.meta.glob('../assets/projects/facility/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

type GalleryImageSources = { webp?: string; fallback?: string }
type ProjectImages = Record<'before' | 'after', GalleryImageSources>

const projectsByNumber = new Map<number, ProjectImages>()
const galleryFilePattern = /\/(\d+)-(before|after)\.(jpe?g|png|webp)$/i

for (const [path, imageUrl] of Object.entries(galleryImages)) {
  const match = path.match(galleryFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase() as 'before' | 'after'
  const extension = match[3].toLowerCase()
  const projectImages = projectsByNumber.get(projectNumber) ?? { before: {}, after: {} }

  if (extension === 'webp') projectImages[imageType].webp = imageUrl
  else projectImages[imageType].fallback = imageUrl
  projectsByNumber.set(projectNumber, projectImages)
}

const completeProjects = [...projectsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')
    const missingImage = !images.before.webp || !images.before.fallback
      ? 'before'
      : !images.after.webp || !images.after.fallback
        ? 'after'
        : null

    if (missingImage) {
      if (import.meta.env.DEV) {
        console.warn(`Facility gallery: project ${projectLabel} is missing ${missingImage} image sources.`)
      }
      return []
    }

    return [{
      id: `facility-project-${projectLabel}`,
      // Facility assets intentionally use "after" for the dirty source and "before" for the clean result.
      beforeImage: images.after.webp!,
      beforeFallbackImage: images.after.fallback!,
      afterImage: images.before.webp!,
      afterFallbackImage: images.before.fallback!,
      altBefore: 'Vorher: Verschmutzter gefliester Eingangsbereich mit Fußspuren und Laub',
      altAfter: 'Nachher: Sauberer gefliester Eingangsbereich mit Aufzug und Treppe',
    }]
  })

export const facilityProjectGroups: FacilityProjectGroup[] = completeProjects.reduce<FacilityProjectGroup[]>((groups, project, index) => {
  const groupIndex = Math.floor(index / 5)
  const group = groups[groupIndex] ?? []

  group.push(project)
  groups[groupIndex] = group

  return groups
}, [])
