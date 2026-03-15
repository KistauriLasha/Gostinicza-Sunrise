'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/images/placeholder.svg', alt: 'Гостиница Sunrise' },
  { src: '/images/placeholder.svg', alt: 'Пляж в Пицунде' },
  { src: '/images/placeholder.svg', alt: 'Номер люкс' },
  { src: '/images/placeholder.svg', alt: 'Стандартный номер' },
  { src: '/images/placeholder.svg', alt: 'Вид на море' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null))
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null))

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            Впечатления
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
            Галерея
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden group ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${i === 0 ? 'aspect-square' : 'aspect-square'}`}
              aria-label={photo.alt}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Предыдущее фото"
          >
            <ChevronLeft size={40} />
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[80vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[80vh]"
            />
            <p className="text-center text-white/60 text-sm mt-4">
              {photos[lightbox].alt}
            </p>
          </div>
          <button
            className="absolute right-4 text-white/70 hover:text-white"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Следующее фото"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  )
}
