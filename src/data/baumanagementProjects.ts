export type BaumanagementGalleryProject = {
  id: string
  projectLabel: string
  coverImage: string
  coverFallbackImage: string
  title?: string
  location?: string
  description?: string
  coverAlt: string
  galleryImages: Array<{ image: string; fallbackImage: string; alt: string; label: string }>
}

// Add a project by creating `project-XX/` with cover.webp and image-01.webp, image-02.webp, etc.
// Legacy projects may use before.webp and after.webp instead; matching .jpeg files remain fallbacks when present.
const galleryImages = import.meta.glob('../assets/baumanagement/projects/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const projectInfoFiles = import.meta.glob('../assets/baumanagement/projects/*/project-info.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

type GalleryImageSources = { webp?: string; fallback?: string }
type ProjectImages = { cover?: GalleryImageSources; before?: GalleryImageSources; after?: GalleryImageSources; interior: Map<string, GalleryImageSources> }
type ProjectInfo = { title?: string; location?: string }

const projectsByNumber = new Map<number, ProjectImages>()
const projectInfoByNumber = new Map<number, ProjectInfo>()
const galleryFilePattern = /\/project-(\d+)\/(cover|before|after|image-\d+)\.(jpe?g|png|webp)$/i
const projectInfoPattern = /\/project-(\d+)\/project-info\.json$/i

for (const [path, imageUrl] of Object.entries(galleryImages)) {
  const match = path.match(galleryFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase()
  const extension = match[3].toLowerCase()
  const projectImages: ProjectImages = projectsByNumber.get(projectNumber) ?? { interior: new Map() }

  const imageSources = imageType === 'cover'
    ? projectImages.cover ?? {}
    : imageType === 'before'
      ? projectImages.before ?? {}
      : imageType === 'after'
        ? projectImages.after ?? {}
        : projectImages.interior.get(imageType) ?? {}
  if (extension === 'webp') imageSources.webp = imageUrl
  else imageSources.fallback = imageUrl
  if (imageType === 'cover') projectImages.cover = imageSources
  else if (imageType === 'before') projectImages.before = imageSources
  else if (imageType === 'after') projectImages.after = imageSources
  else projectImages.interior.set(imageType, imageSources)
  projectsByNumber.set(projectNumber, projectImages)
}

for (const [path, value] of Object.entries(projectInfoFiles)) {
  const match = path.match(projectInfoPattern)
  if (!match || !value || typeof value !== 'object') continue

  const { title, location } = value as ProjectInfo
  const info: ProjectInfo = {}
  if (typeof title === 'string' && title.trim()) info.title = title.trim()
  if (typeof location === 'string' && location.trim()) info.location = location.trim()
  projectInfoByNumber.set(Number(match[1]), info)
}

const getFallbackImage = (image: GalleryImageSources): string => image.fallback ?? image.webp ?? ''

export const baumanagementGalleryProjects = [...projectsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')
    const projectInfo = projectInfoByNumber.get(projectNumber)
    const cover = images.cover
    const before = images.before
    const after = images.after
    const interiorImages = [...images.interior.entries()]
      .sort(([firstName], [secondName]) => firstName.localeCompare(secondName))
      .flatMap(([name, source]) => source.webp
        ? [{ image: source.webp, fallbackImage: getFallbackImage(source), alt: `Bild aus Projekt ${projectLabel}`, label: name.toUpperCase() }]
        : [])

    const hasBeforeAfterPair = Boolean(before?.webp && after?.webp)

    if (!cover?.webp || (interiorImages.length === 0 && !hasBeforeAfterPair)) {
      const missingImages = !cover?.webp
        ? 'cover.webp'
        : 'image-XX.webp or both before.webp and after.webp'
      console.warn(`Baumanagement gallery: project-${projectLabel} was skipped because it is missing ${missingImages}.`)
      return []
    }

    const coverFallbackImage = getFallbackImage(cover)
    const galleryProjectImages = interiorImages.length > 0
      ? interiorImages
      : [
          { image: before!.webp!, fallbackImage: getFallbackImage(before!), alt: `Vorher: Projekt ${projectLabel}`, label: 'VORHER' },
          { image: after!.webp!, fallbackImage: getFallbackImage(after!), alt: `Nachher: Projekt ${projectLabel}`, label: 'NACHHER' },
        ]

    return [{
      id: `project-${projectLabel}`,
      projectLabel,
      coverImage: cover.webp,
      coverFallbackImage,
      title: projectInfo?.title,
      location: projectInfo?.location,
      coverAlt: `Projekt ${projectLabel}`,
      galleryImages: galleryProjectImages,
    }]
  })
