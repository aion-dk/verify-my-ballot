import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

export default function useBoardSlugLinkResolver() {
  const { boardSlug } = useParams<{ boardSlug: string }>()

  const linkResolver = useCallback(
    (href: string) => {
      return `/${boardSlug}${href}`
    },
    [boardSlug]
  )

  return linkResolver
}
