import React, { useEffect, useState, useId } from 'react'

type Props = {
  placeholder?: string
  initial?: string
  onSearch: (query: string) => void
  delayMs?: number
}

export default function BlogSearch({
  placeholder = 'Søk i artikler...',
  initial = '',
  onSearch,
  delayMs = 300
}: Props) {
  const [query, setQuery] = useState<string>(initial)
  const id = useId()
  const inputId = `blog-search-${id}`

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(query.trim())
    }, delayMs)
    return () => clearTimeout(t)
  }, [query, delayMs, onSearch])

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="sr-only">
        Søk i artikler
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search posts"
        className="w-full px-3 py-2 border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
