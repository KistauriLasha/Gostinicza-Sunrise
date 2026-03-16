'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

const photos = [
  { src: '/images/2300477.jpg', alt: 'Фасад гостевого дома Sunrise' },
  { src: '/images/2300476.jpg', alt: 'Гостевой дом в вечернее время' },
  { src: '/images/2300484.jpg', alt: 'Вид на здание гостевого дома' },
  { src: '/images/2300478.jpg', alt: 'Территория гостевого дома' },
  { src: '/images/2300480.jpg', alt: 'Уютный номер для отдыха' },
  { src: '/images/1518916.jpg', alt: 'Интерьер номера' },
  { src: '/images/2300481.jpg', alt: 'Комфортабельный номер' },
  { src: '/images/2300482.jpg', alt: 'Современная ванная комната' },
  { src: '/images/2300483.jpg', alt: 'Летняя кухня для гостей' },
  { src: '/images/2300479.jpg', alt: 'Зона барбекю во дворе' },
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
              } aspect-square`}
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
      <Lightbox
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        images={photos}
        currentIndex={lightbox ?? 0}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
