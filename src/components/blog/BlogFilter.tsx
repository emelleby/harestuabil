import type { TagContent } from '../../lib/tags'

type Props = {
  tags: TagContent[]
  selected?: string | null
  onSelect: (slug: string | null) => void
}

export default function BlogFilter({ tags, selected = null, onSelect }: Props) {
  // Filter to show only Norwegian car mechanic categories first
  const norwegianCategories = ['vedlikehold', 'tips', 'nyheter', 'sesongguide']
  const priorityTags = tags.filter((tag) => norwegianCategories.includes(tag.slug))
  const otherTags = tags.filter((tag) => !norwegianCategories.includes(tag.slug))
  const sortedTags = [...priorityTags, ...otherTags]

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-foreground mb-3">Filtrer artikler:</h3>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Blogg kategorier">
        <button
          type="button"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === null
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
          aria-pressed={selected === null}
          onClick={() => onSelect(null)}
        >
          Alle artikler
        </button>

        {sortedTags.map((tag) => (
          <button
            key={tag.slug}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selected === tag.slug
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
            aria-pressed={selected === tag.slug}
            onClick={() => onSelect(tag.slug)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  )
}
