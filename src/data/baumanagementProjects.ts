export type BaumanagementProjectComparison = {
  id: string
  beforeImage: string
  afterImage: string
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

const projectsByNumber = new Map<number, Partial<Record<'before' | 'after', string>>>()
const galleryFilePattern = /\/(\d+)-(before|after)\.(?:jpe?g|png|webp)$/i

for (const [path, imageUrl] of Object.entries(galleryImages)) {
  const match = path.match(galleryFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase() as 'before' | 'after'
  const projectImages = projectsByNumber.get(projectNumber) ?? {}

  projectImages[imageType] = imageUrl
  projectsByNumber.set(projectNumber, projectImages)
}

const completeProjects = [...projectsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')

    if (!images.before || !images.after) {
      if (import.meta.env.DEV) {
        console.warn(`Baumanagement gallery: project ${projectLabel} is missing ${images.before ? 'after' : 'before'} image.`)
      }
      return []
    }

    return [{
      id: `project-${projectLabel}`,
      beforeImage: images.before,
      afterImage: images.after,
      altBefore: 'Temporäres Entwicklungsbild für einen Vorher-Vergleich',
      altAfter: 'Temporäres Entwicklungsbild für einen Nachher-Vergleich',
    }]
  })

export const baumanagementProjectGroups: BaumanagementProjectGroup[] = completeProjects.reduce<BaumanagementProjectGroup[]>((groups, project, index) => {
  const groupIndex = Math.floor(index / 5)
  const group = groups[groupIndex] ?? { id: `project-group-${groupIndex + 1}`, projects: [] }

  group.projects.push(project)
  groups[groupIndex] = group

  return groups
}, [])
