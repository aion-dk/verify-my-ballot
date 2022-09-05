import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { FALLBACK_BOARD_SLUG } from '../constants'

export default function useBoardSlugLinkResolver() {
  const { boardSlug } = useParams<{ boardSlug: string }>()

  const linkResolver = useCallback(
    (href: string) => {
      return `/${boardSlug || FALLBACK_BOARD_SLUG}${href}`
    },
    [boardSlug]
  )

  return linkResolver
}
