'use client'

import { Facebook, Link2, Linkedin, Mail, Twitter } from 'lucide-react'
import { useState } from 'react'

type ShareButtonsProps = {
  url: string
  title: string
  description?: string
  layout?: 'horizontal' | 'vertical'
}

/**
 * Social sharing buttons for Norwegian blog posts
 * Includes Facebook, Twitter/X, LinkedIn, Email, and copy link
 */
export default function ShareButtons({ url, title, description = '', layout = 'horizontal' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${shareUrl}`)}`
  }

  const containerClass = layout === 'vertical' ? 'flex flex-col gap-2' : 'flex items-center gap-2'

  const buttonClass = 'flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors text-sm'

  return (
    <div className={containerClass} lang="nb">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Del på Facebook"
      >
        <Facebook className="w-5 h-5" />
        {layout === 'vertical' && <span>Facebook</span>}
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Del på Twitter/X"
      >
        <Twitter className="w-5 h-5" />
        {layout === 'vertical' && <span>Twitter/X</span>}
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Del på LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        {layout === 'vertical' && <span>LinkedIn</span>}
      </a>
      <a href={shareLinks.email} className={buttonClass} aria-label="Del via e-post">
        <Mail className="w-5 h-5" />
        {layout === 'vertical' && <span>E-post</span>}
      </a>
      <button type="button" onClick={handleCopyLink} className={`${buttonClass} relative`} aria-label="Kopier lenke">
        <Link2 className="w-5 h-5" />
        {layout === 'vertical' && <span>Kopier lenke</span>}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
            Kopiert!
          </span>
        )}
      </button>
    </div>
  )
}
