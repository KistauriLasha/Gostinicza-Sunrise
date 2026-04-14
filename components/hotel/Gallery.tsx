'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

const photos = [
  {
    src: '/images/1B0A1028.jpg',
    alt: 'Фасад гостевого дома в вечернее время',
  },
  {
    src: '/images/1B0A1043.jpg',
    alt: 'Вид на здание гостевого дома',
  },
  {
    src: '/images/1B0A1117.jpg',
    alt: 'Уютная зона ресепшн',
  },
  {
    src: '/images/1B0A1143.jpg',
    alt: 'Интерьер холла гостевого дома',
  },
  {
    src: '/images/1B0A1214.jpg',
    alt: 'Комфортабельный номер',
  },
  {
    src: '/images/1B0A1242.jpg',
    alt: 'Детали интерьера номера',
  },
  {
    src: '/images/1B0A1259.jpg',
    alt: 'Современная душевая комната',
  },
  {
    src: '/images/1B0A1316.jpg',
    alt: 'Зона отдыха для гостей',
  },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden group shadow-lg ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${i === 5 ? 'md:col-span-2' : ''}`}
              aria-label={photo.alt}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-[10px] tracking-[0.3em] uppercase border border-white/40 px-4 py-2 bg-black/20 backdrop-blur-sm">
                  Просмотр
                </span>
              </div>
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
