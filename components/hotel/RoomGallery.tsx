'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface RoomGalleryProps {
  images: string[]
  title: string
}

export default function RoomGallery({ images, title }: RoomGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % images.length : null))

  const formattedImages = images.map((img, index) => ({
    src: img,
    alt: `${title} - фото ${index + 1}`,
  }))

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
        Фотографии
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            className="relative aspect-[4/3] overflow-hidden group"
            onClick={() => setLightbox(index)}
          >
            <Image
              src={img}
              alt={`${title} - фото ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        images={formattedImages}
        currentIndex={lightbox ?? 0}
        onPrev={prev}
        onNext={next}
      />
    </div>
  )
}
