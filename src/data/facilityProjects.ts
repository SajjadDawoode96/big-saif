export type FacilityProjectComparison = {
  id: string
  beforeImage: string
  afterImage: string
  altBefore: string
  altAfter: string
}

export type FacilityProjectGroup = FacilityProjectComparison[]

const galleryImages = import.meta.glob('../assets/projects/facility/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

type ProjectImages = Record<'before' | 'after', string[]>

const projectsByNumber = new Map<number, ProjectImages>()
const galleryFilePattern = /\/(\d+)-(before|after)\.(?:jpe?g|png|webp)$/i

for (const [path, imageUrl] of Object.entries(galleryImages)) {
  const match = path.match(galleryFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase() as 'before' | 'after'
  const projectImages = projectsByNumber.get(projectNumber) ?? { before: [], after: [] }

  projectImages[imageType].push(imageUrl)
  projectsByNumber.set(projectNumber, projectImages)
}

const completeProjects = [...projectsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')
    const hasDuplicate = images.before.length > 1 || images.after.length > 1
    const missingImage = !images.before.length ? 'before' : !images.after.length ? 'after' : null

    if (hasDuplicate || missingImage) {
      if (import.meta.env.DEV) {
        const issue = hasDuplicate
          ? `has duplicate ${images.before.length > 1 ? 'before' : 'after'} images`
          : `is missing ${missingImage} image`
        console.warn(`Facility gallery: project ${projectLabel} ${issue}.`)
      }
      return []
    }

    return [{
      id: `facility-project-${projectLabel}`,
      // Facility assets intentionally use "after" for the dirty source and "before" for the clean result.
      beforeImage: images.after[0],
      afterImage: images.before[0],
      altBefore: 'Vorher: Reinigungsbereich',
      altAfter: 'Nachher: gereinigter Bereich',
    }]
  })

export const facilityProjectGroups: FacilityProjectGroup[] = completeProjects.reduce<FacilityProjectGroup[]>((groups, project, index) => {
  const groupIndex = Math.floor(index / 5)
  const group = groups[groupIndex] ?? []

  group.push(project)
  groups[groupIndex] = group

  return groups
}, [])
