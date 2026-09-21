export type BaumanagementBeforeAfterProject = {
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

export type BaumanagementBeforeAfterGroup = {
  id: string
  projects: BaumanagementBeforeAfterProject[]
}

const comparisonImages = import.meta.glob('../assets/baumanagement/before-after/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const comparisonsByNumber = new Map<number, Partial<Record<'before' | 'after', string>>>()
const comparisonFilePattern = /\/(\d+)-(before|after)\.webp$/i

for (const [path, imageUrl] of Object.entries(comparisonImages)) {
  const match = path.match(comparisonFilePattern)
  if (!match) continue

  const projectNumber = Number(match[1])
  const imageType = match[2].toLowerCase() as 'before' | 'after'
  const sources = comparisonsByNumber.get(projectNumber) ?? {}
  sources[imageType] = imageUrl
  comparisonsByNumber.set(projectNumber, sources)
}

export const baumanagementBeforeAfterGroups = [...comparisonsByNumber.entries()]
  .sort(([firstNumber], [secondNumber]) => firstNumber - secondNumber)
  .flatMap(([projectNumber, images]) => {
    const projectLabel = String(projectNumber).padStart(2, '0')
    const before = images.before
    const after = images.after

    if (!before || !after) {
      const missingImages = [!before && 'before.webp', !after && 'after.webp'].filter(Boolean)
      console.warn(`Baumanagement before/after: ${projectLabel} was skipped because it is missing ${missingImages.join(', ')}.`)
      return []
    }

    return [{
      id: `before-after-${projectLabel}`,
      beforeImage: before,
      beforeFallbackImage: before,
      afterImage: after,
      afterFallbackImage: after,
      altBefore: `Vorher: Projekt ${projectLabel}`,
      altAfter: `Nachher: Projekt ${projectLabel}`,
    }]
  })
  .reduce<BaumanagementBeforeAfterGroup[]>((groups, project, index) => {
    const groupIndex = Math.floor(index / 5)
    const group = groups[groupIndex] ?? { id: `before-after-group-${groupIndex + 1}`, projects: [] }

    group.projects.push(project)
    groups[groupIndex] = group
    return groups
  }, [])
