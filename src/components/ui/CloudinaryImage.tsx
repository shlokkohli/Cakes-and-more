'use client'
import { CldImage } from 'next-cloudinary'

interface CloudinaryImageProps {
  src: string
  alt: string
  className?: string
  height?: number
  width?: number
  loading?: 'lazy' | 'eager'
}

export default function CloudinaryImage({
  src,
  alt,
  className,
  height,
  width,
  loading = 'lazy',
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      loading={loading}
    />
  )
}
