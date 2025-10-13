import React from 'react'
import { TagContent } from '../../lib/tags'

type Props = {
  tags: TagContent[]
  selected?: string | null
  onSelect: (slug: string | null) => void
}

export default function BlogFilter({ tags, selected = null, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="toolbar" aria-label="Blog filters">
      <button
        type="button"
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          selected === null ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
      >
        Alle
      </button>

      {tags.map((t) => (
        <button
          key={t.slug}
          type="button"
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            selected === t.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          aria-pressed={selected === t.slug}
          onClick={() => onSelect(t.slug)}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
