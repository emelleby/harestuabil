import type { AuthorContent } from '../lib/authors'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Props = {
  author: AuthorContent
  showAvatar?: boolean
}

export default function Author({ author, showAvatar = false }: Props) {
  if (showAvatar) {
    // Get initials from author name (first letter of first and last name)
    const getInitials = (name: string): string => {
      const parts = name.trim().split(' ')
      if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase()
      }
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    }

    // Use profile_picture from author data if available, otherwise fallback to slug-based path
    const avatarSrc = author.profile_picture || `/images/authors/${author.slug}.jpg`

    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={author.name} />
          <AvatarFallback className="text-sm font-medium">{getInitials(author.name)}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-foreground font-medium">{author.name}</span>
      </div>
    )
  }

  return <span className="text-muted-foreground">{author.name}</span>
}
