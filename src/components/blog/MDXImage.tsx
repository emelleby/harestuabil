import Image from 'next/image'

type MDXImageProps = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

/**
 * Custom MDX Image component with caption support
 * Optimized for Norwegian blog posts with proper alt text handling
 */
export default function MDXImage({ src, alt, caption, width = 800, height = 600 }: MDXImageProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg shadow-md">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

