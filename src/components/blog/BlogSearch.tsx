import { useEffect, useId, useState } from 'react'

type Props = {
  placeholder?: string
  initial?: string
  onSearch: (query: string) => void
  delayMs?: number
}

export default function BlogSearch({
  placeholder = 'Søk etter bilartikler, tips og råd...',
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

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <div className="mb-6">
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
        Søk i artikler
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Søk i bloggartikler"
          className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Tøm søk"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {query && (
        <p className="mt-2 text-sm text-muted-foreground">
          Søker etter: <span className="font-medium text-foreground">"{query}"</span>
        </p>
      )}
    </div>
  )
}
