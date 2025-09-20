import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import * as React from 'react'

import { cn } from '@/lib/utils'
import type { ProductsSearchParamsSchema } from '@/lib/validations/params'

import { Button } from '@/components/ui/button'

interface PaginationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  pageCount: number
  page?: number
  per_page?: number
  sort?: string
  siblingCount?: number
  onSetFilters: (newFilters: ProductsSearchParamsSchema) => void
}

export function PaginationButton({
  pageCount,
  page,
  per_page,
  sort,
  siblingCount = 1,
  onSetFilters,
  className,
  ...props
}: PaginationButtonProps) {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const pathname = routerState.location.pathname
  const searchParams = useSearch({
    strict: false,
  }) as Record<string, string>
  const [isPending, startTransition] = React.useTransition()

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams()

      // Add existing search params
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          newSearchParams.set(key, String(value))
        }
      })

      // Add/update new params
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams],
  )

  const paginationRange = React.useMemo(() => {
    const delta = siblingCount + 2

    const range = []
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i)
    }

    if (Number(page) - delta > 2) {
      range.unshift('...')
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push('...')
    }

    range.unshift(1)
    if (pageCount !== 1) {
      range.push(pageCount)
    }

    return range
  }, [pageCount, page, siblingCount])

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        variant="outline"
        size="icon"
        className="hidden size-8 lg:flex"
        onClick={() => {
          startTransition(() => {
            const queryString = createQueryString({
              page: 1,
              per_page: per_page ?? null,
              sort: sort ?? null,
            })
            navigate({
              to: `${pathname}${queryString ? `?${queryString}` : ''}`,
            })
          })
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to previous page"
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          onSetFilters({
            page: Number(page) - 1,
            per_page: per_page ?? 10,
            sort: sort ?? 'created_at',
            active: 'true',
          })
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === '...' ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="icon"
            className="size-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={Number(page) === pageNumber ? 'default' : 'outline'}
            size="icon"
            className="size-8"
            onClick={() => {
              onSetFilters({
                page: Number(pageNumber),
                per_page: per_page ?? 10,
                sort: sort ?? 'created_at',
                active: 'true',
              })
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        ),
      )}
      <Button
        aria-label="Go to next page"
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          onSetFilters({
            page: Number(page) + 1,
            per_page: per_page ?? 10,
            sort: sort ?? 'created_at',
            active: 'true',
          })
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to last page"
        variant="outline"
        size="icon"
        className="hidden size-8 lg:flex"
        onClick={() => {
          onSetFilters({
            page: pageCount ?? 10,
            per_page: per_page ?? 10,
            sort: sort ?? 'created_at',
            active: 'true',
          })
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
      </Button>
    </div>
  )
}
