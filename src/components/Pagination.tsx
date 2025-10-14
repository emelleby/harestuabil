import Link from 'next/link'

import { generatePagination } from '../lib/pagination'

type Props = {
  current: number
  pages: number
  link: {
    href: (page: number) => string
    as: (page: number) => string | null
  }
}

export default function Pagination({ current, pages, link }: Props) {
  const pagination = generatePagination(current, pages)

  if (pages <= 1) {
    return null
  }

  return (
    <nav className="mt-12" aria-label="Paginering">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          {current > 1 && (
            <Link
              href={link.href(current - 1)}
              as={link.as(current - 1)}
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Forrige side"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Forrige
            </Link>
          )}

          {/* Page numbers */}
          <ul className="flex items-center space-x-1">
            {pagination.map((item, i) => (
              <li key={item.excerpt ? `excerpt-${i}` : `page-${item.page}`}>
                {item.excerpt ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : item.page ? (
                  <Link
                    href={link.href(item.page)}
                    as={link.as(item.page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.page === current
                        ? '!bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    aria-label={`Side ${item.page}`}
                    aria-current={item.page === current ? 'page' : undefined}
                  >
                    {item.page}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>

          {/* Next button */}
          {current < pages && (
            <Link
              href={link.href(current + 1)}
              as={link.as(current + 1)}
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Neste side"
            >
              Neste
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Page info - properly positioned below */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Side {current} av {pages}
        </p>
      </div>
    </nav>
  )
}
